// GW FINS — reservation form handling.
// Submits to a Zapier "Catch Hook" webhook, which drives the rest of the
// reservation workflow (notifications, calendar entry, etc.) on Zapier's side.

const ZAPIER_RESERVATION_WEBHOOK = "https://hooks.zapier.com/hooks/catch/28835810/4dt50kb/";

function submitReservation(formData) {
  // This is a static site with no backend, so the browser posts straight to
  // Zapier. Zapier's catch-hook endpoint doesn't reliably return CORS
  // headers for browser fetches, so `no-cors` is used to guarantee the
  // request isn't blocked by the browser. Tradeoff: the response comes back
  // opaque and its status can't be read — a resolved promise here means
  // "the request left the browser without a network error," not "Zapier
  // confirmed receipt." Confirm actual delivery via the Zap's run history.
  return fetch(ZAPIER_RESERVATION_WEBHOOK, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams(formData)
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservation-form");
  if (!form) return;

  const success = document.getElementById("reservation-success");
  const dateInput = form.querySelector("#res-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll("[data-required]").forEach((field) => {
      const wrapper = field.closest(".field");
      const filled = field.value && field.value.trim() !== "";
      wrapper.classList.toggle("has-error", !filled);
      if (!filled) valid = false;
    });

    const email = form.querySelector("#res-email");
    if (email && email.value) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
      email.closest(".field").classList.toggle("has-error", !emailOk);
      if (!emailOk) valid = false;
    }

    if (!valid) {
      const firstError = form.querySelector(".has-error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const partySize = parseInt(form.querySelector("#res-party").value, 10);
    const submitBtn = form.querySelector("button[type=submit]");
    const errorBanner = document.getElementById("reservation-error");
    errorBanner?.setAttribute("hidden", "");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    submitReservation(Object.fromEntries(new FormData(form)))
      .then(() => {
        form.hidden = true;
        document.getElementById("large-party-note-standalone")?.setAttribute("hidden", "");
        if (success) {
          success.classList.add("is-visible");
          const summary = document.getElementById("reservation-summary");
          if (summary) {
            const date = new Date(form.querySelector("#res-date").value + "T00:00:00");
            const dateStr = date.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric"
            });
            summary.textContent = `${dateStr} at ${form.querySelector("#res-time").value} — party of ${partySize}`;
          }
        }
        if (partySize > 10) {
          document.getElementById("large-party-followup")?.removeAttribute("hidden");
        }
      })
      .catch(() => {
        // Only a real network-level failure (offline, DNS, timeout) reaches
        // here — see the note on `mode: "no-cors"` in submitReservation().
        errorBanner?.removeAttribute("hidden");
        errorBanner?.scrollIntoView({ behavior: "smooth", block: "center" });
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Request Reservation";
      });
  });

  const partySelect = form.querySelector("#res-party");
  const largePartyNote = document.getElementById("large-party-note-standalone");
  if (partySelect && largePartyNote) {
    partySelect.addEventListener("change", () => {
      const size = parseInt(partySelect.value, 10);
      largePartyNote.toggleAttribute("hidden", !(size > 10));
    });
  }
});

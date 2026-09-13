// GW FINS — shared site behavior (header, mobile nav, scroll reveal)

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");

  const updateHeader = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add("is-solid");
    else if (!header.classList.contains("is-inner")) header.classList.remove("is-solid");
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("is-open");
      drawer.classList.toggle("is-open");
      document.body.style.overflow = drawer.classList.contains("is-open") ? "hidden" : "";
    });
    drawer.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("is-open");
        drawer.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }

  // scroll-reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});

// GW FINS — gallery filter + lightbox

document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".gallery-filter");
  const items = document.querySelectorAll("#gallery-grid figure");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const category = btn.dataset.filter;
      items.forEach((fig) => {
        const match = category === "all" || fig.dataset.category === category;
        fig.style.display = match ? "" : "none";
      });
    });
  });

  items.forEach((fig) => {
    fig.addEventListener("click", () => {
      const img = fig.querySelector("img");
      if (!lightbox || !lightboxImg || !img) return;
      lightboxImg.src = img.src.replace(/w=\d+/, "w=1600");
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
    });
  });

  lightboxClose?.addEventListener("click", () => lightbox.classList.remove("is-open"));
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("is-open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox) lightbox.classList.remove("is-open");
  });
});

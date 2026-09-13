// GW FINS — renders MENU_DATA (js/menu-data.js) into the menu page.
// Edit menu content in js/menu-data.js, not here.

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : str;
  return div.innerHTML;
}

function renderItem(item) {
  return `
    <div class="menu-item">
      <div>
        <div class="menu-item-name">
          ${escapeHTML(item.name)}
          ${item.tag ? `<span class="menu-item-tag">${escapeHTML(item.tag)}</span>` : ""}
        </div>
        ${item.desc ? `<p class="menu-item-desc">${escapeHTML(item.desc)}</p>` : ""}
      </div>
      <div class="menu-item-price">${escapeHTML(item.price)}</div>
    </div>
  `;
}

function renderCategory(cat) {
  return `
    <div class="menu-category" id="${escapeHTML(cat.id)}">
      <div class="menu-category-head">
        <h2>${escapeHTML(cat.label)}</h2>
      </div>
      ${cat.note ? `<p class="menu-category-note">${escapeHTML(cat.note)}</p>` : ""}
      <div class="menu-item-list">
        ${cat.items.map(renderItem).join("")}
      </div>
    </div>
  `;
}

let activeSection = "dinner";
let categoryObserver = null;

function renderSectionSwitch() {
  const switchRoot = document.getElementById("menu-section-switch");
  if (!switchRoot) return;
  const sections = [
    { key: "dinner", label: MENU_DATA.dinner.label },
    { key: "bar", label: MENU_DATA.bar.label }
  ];
  switchRoot.innerHTML = sections
    .map(
      (s) =>
        `<button type="button" class="menu-section-tab${s.key === activeSection ? " is-active" : ""}" data-section="${s.key}">${escapeHTML(
          s.label
        )}</button>`
    )
    .join("");
  switchRoot.querySelectorAll(".menu-section-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.section === activeSection) return;
      activeSection = btn.dataset.section;
      renderSectionSwitch();
      renderActiveSection();
    });
  });
}

function renderActiveSection() {
  const root = document.getElementById("menu-root");
  const tabsRoot = document.getElementById("menu-tabs-root");
  const updatedNote = document.getElementById("menu-updated-note");
  if (!root) return;

  const section = MENU_DATA[activeSection];
  const categories = section.categories;

  if (updatedNote) {
    if (activeSection === "dinner") {
      updatedNote.hidden = false;
      updatedNote.textContent = MENU_DATA.dinnerNote;
    } else {
      updatedNote.hidden = true;
    }
  }

  if (tabsRoot) {
    tabsRoot.innerHTML = categories
      .map(
        (cat, i) =>
          `<a href="#${escapeHTML(cat.id)}" class="menu-tab${i === 0 ? " is-active" : ""}" data-target="${escapeHTML(
            cat.id
          )}">${escapeHTML(cat.label)}</a>`
      )
      .join("");
  }

  root.innerHTML = categories.map(renderCategory).join("");

  if (categoryObserver) categoryObserver.disconnect();

  const tabs = document.querySelectorAll(".menu-tab");
  const sectionEls = document.querySelectorAll(".menu-category");
  if ("IntersectionObserver" in window && tabs.length) {
    categoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tabs.forEach((t) => t.classList.remove("is-active"));
            const active = document.querySelector(`.menu-tab[data-target="${entry.target.id}"]`);
            if (active) active.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sectionEls.forEach((s) => categoryObserver.observe(s));
  }
}

function renderMenu() {
  if (typeof MENU_DATA === "undefined") return;
  renderSectionSwitch();
  renderActiveSection();
}

document.addEventListener("DOMContentLoaded", renderMenu);

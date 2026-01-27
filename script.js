fetch("data.json")
  .then(res => res.json())
  .then(data => {
    buildFilters(data.categories);
    buildTreatments(data.categories);
  });

function buildFilters(categories) {
  const filters = document.getElementById("filters");

  categories.forEach((cat, index) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.textContent = cat.name;

    if (index === 0) btn.classList.add("active");

    btn.onclick = () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterCategories(cat.id);
    };

    filters.appendChild(btn);
  });
}

function buildTreatments(categories) {
  const container = document.getElementById("treatments");

  categories.forEach(cat => {
    const section = document.createElement("section");
    section.className = "category";
    section.dataset.category = cat.id;

    const header = document.createElement("button");
    header.className = "category-header";
    header.innerHTML = `<span>${cat.name}</span><span>+</span>`;
    header.onclick = () => section.classList.toggle("open");

    const content = document.createElement("div");
    content.className = "category-content";

    cat.treatments.forEach(t => {
      const div = document.createElement("div");
      div.className = "treatment";

      div.innerHTML = `
        <div class="treatment-header">
          <strong>${t.name}</strong>
          <span>${t.price}</span>
        </div>
        ${t.duration ? `<div class="duration">${t.duration}</div>` : ""}
        ${t.description ? `<div class="description">${t.description}</div>` : ""}
      `;

      content.appendChild(div);
    });

    section.appendChild(header);
    section.appendChild(content);
    container.appendChild(section);
  });
}

function filterCategories(categoryId) {
  document.querySelectorAll(".category").forEach(cat => {
    cat.style.display =
      cat.dataset.category === categoryId ? "block" : "none";
  });
}

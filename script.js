fetch("treatments.json")
  .then(res => res.json())
  .then(data => {
    buildFilters(data.categories);
    buildTreatments(data.categories);
  });

function buildFilters(categories) {
  const filters = document.getElementById("filters");
  filters.innerHTML = "";

  categories.forEach((cat, index) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";

    if (cat.icon) {
      const img = document.createElement("img");
      img.src = cat.icon; // es: "icons/unghia.svg" o "icons/viso.svg"
      img.alt = cat.name;
      btn.appendChild(img);
    }

    const span = document.createElement("span");
    span.textContent = cat.label || cat.name;
    btn.appendChild(span);

    if (index === 0) btn.classList.add("active");

    btn.onclick = () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterCategories(cat.id);
    };

    filters.appendChild(btn);
  });
}

function buildTreatments(categories) {
  const container = document.getElementById("treatments");
  container.innerHTML = "";

  categories.forEach(cat => {
    cat.sections.forEach(section => {
      const sectionEl = document.createElement("section");
      sectionEl.className = "category";
      sectionEl.dataset.category = cat.id;

      // Header della sezione con "Da ...€" a destra del nome
      const header = document.createElement("button");
      header.className = "category-header";
      header.innerHTML = `
        <span>${section.title}${section.fromPrice ? ` <span class="section-price">(${section.fromPrice}€)</span>` : ""}</span>
        <span>+</span>
      `;
      header.onclick = () => sectionEl.classList.toggle("open");

      const content = document.createElement("div");
      content.className = "category-content";

      section.treatments.forEach(t => {
        const div = document.createElement("div");
        div.className = "treatment";

        div.innerHTML = `
          <div class="treatment-header">
            <strong>${t.name}</strong>
            <span>${t.price}€</span>
          </div>
          ${t.duration ? `<div class="duration">${t.duration}</div>` : ""}
          ${t.description ? `<div class="description">${t.description}</div>` : ""}
        `;

        content.appendChild(div);
      });

      sectionEl.appendChild(header);
      sectionEl.appendChild(content);
      container.appendChild(sectionEl);
    });
  });
}

function filterCategories(categoryId) {
  document.querySelectorAll(".category").forEach(cat => {
    cat.style.display = cat.dataset.category === categoryId ? "block" : "none";
  });
}

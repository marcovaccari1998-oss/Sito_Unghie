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

    // icona filtro
    if (cat.icon) {
      const img = document.createElement("img");
      img.src = cat.icon; // es: "icons/unghia.svg" o "icons/viso.svg"
      img.alt = cat.label || cat.id;
      btn.appendChild(img);
    }

    // testo filtro
    const span = document.createElement("span");
    span.textContent = cat.label || cat.id;
    btn.appendChild(span);

    // primo filtro attivo
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

      // HEADER della sezione
      const header = document.createElement("button");
      header.className = "category-header";

      // span titolo
      const titleSpan = document.createElement("span");
      titleSpan.textContent = section.title;

      // span prezzo "Da ...€" tra parentesi, opaco
      const priceSpan = document.createElement("span");
      priceSpan.className = "section-price";
      if (section.fromPrice) priceSpan.textContent = `(${section.fromPrice}€)`;

      // span "+" per accordion
      const plusSpan = document.createElement("span");
      plusSpan.textContent = "+";

      // append
      header.appendChild(titleSpan);
      header.appendChild(priceSpan);
      header.appendChild(plusSpan);

      header.onclick = () => sectionEl.classList.toggle("open");

      // contenuto trattamenti
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

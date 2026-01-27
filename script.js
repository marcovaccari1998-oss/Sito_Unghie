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

    // forza layout verticale
    btn.style.display = "flex";
    btn.style.flexDirection = "column";
    btn.style.alignItems = "center";
    btn.style.gap = "6px";

    // testo filtro sopra
    const span = document.createElement("span");
    span.textContent = cat.label || cat.id;
    btn.appendChild(span);

    // icona filtro sotto
    if (cat.icon) {
      const img = document.createElement("img");
      img.src = cat.icon;
      img.alt = cat.label || cat.id;
      img.style.margin = "0"; // niente margin-right
      img.style.width = "70px";
      img.style.height = "70px";
      btn.appendChild(img);
    }

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

      // titolo
      const titleSpan = document.createElement("span");
      titleSpan.textContent = section.title;

      // prezzo "da ...€" tra parentesi, opaco
      const priceSpan = document.createElement("span");
      priceSpan.className = "section-price";
      if (section.fromPrice) priceSpan.textContent = `(da ${section.fromPrice}€)`; // parola "da" inclusa

      // wrapper titolo + prezzo
      const leftWrapper = document.createElement("div");
      leftWrapper.style.display = "flex";
      leftWrapper.style.alignItems = "center";
      leftWrapper.style.gap = "6px";
      leftWrapper.appendChild(titleSpan);
      leftWrapper.appendChild(priceSpan);

      // "+"
      const plusSpan = document.createElement("span");
      plusSpan.textContent = "+";

      header.appendChild(leftWrapper);
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

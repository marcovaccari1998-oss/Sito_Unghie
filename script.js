fetch("treatments.json")
  .then(res => res.json())
  .then(data => {
    buildFilters(data.categories);
    buildTreatments(data.categories);
    filterCategories("all");
  });

function buildFilters(categories) {
  const filters = document.getElementById("filters");
  filters.innerHTML = "";

  // 🔹 FILTRO "TUTTI"
  const allBtn = document.createElement("button");
  allBtn.className = "filter-btn active";
  allBtn.innerHTML = `<span>Tutti</span>`;
  allBtn.onclick = () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    allBtn.classList.add("active");
    filterCategories("all");
  };
  filters.appendChild(allBtn);

  // 🔹 FILTRI CATEGORIE
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";

    btn.innerHTML = `
      <span>${cat.label}</span>
      ${cat.icon ? `<img src="${cat.icon}" alt="">` : ""}
    `;

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
      const card = document.createElement("section");
      card.className = "category";
      card.dataset.category = cat.id;

      const header = document.createElement("button");
      header.className = "category-header";

      header.innerHTML = `
        <div class="left">
          <span>${section.title}</span>
          ${section.fromPrice ? `<span class="section-price">(da ${section.fromPrice}€)</span>` : ""}
        </div>
        <span class="toggle">+</span>
      `;

      header.onclick = () => {
        document.querySelectorAll(".category.open").forEach(openCard => {
          if (openCard !== card) {
            openCard.classList.remove("open");
          }
        });
        card.classList.toggle("open");
      };


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
        `;
        content.appendChild(div);
      });

      if (section.note) {
        const note = document.createElement("div");
        note.className = "section-note";
        note.textContent = section.note;
        content.appendChild(note);
      }


      card.appendChild(header);
      card.appendChild(content);
      container.appendChild(card);
    });
  });
}

function filterCategories(id) {
  document.querySelectorAll(".category").forEach(cat => {
    cat.classList.remove("open");

    if (id === "all") {
      cat.style.display = "block";
    } else {
      cat.style.display = cat.dataset.category === id ? "block" : "none";
    }
  });
}

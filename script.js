fetch('treatments.json')
  .then(response => response.json())
  .then(data => {
    buildFilters(data.categories);
    buildTreatments(data.categories);
  });

/* ===== FILTRI ===== */
function buildFilters(categories) {
  const filters = document.getElementById('filters');

  filters.innerHTML = `
    <button class="filter-btn active" data-filter="all">Tutti</button>
  `;

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = cat.id;
    btn.textContent = cat.label;
    filters.appendChild(btn);
  });

  filters.addEventListener('click', e => {
    if (!e.target.classList.contains('filter-btn')) return;

    document.querySelectorAll('.filter-btn')
      .forEach(b => b.classList.remove('active'));

    e.target.classList.add('active');

    const filter = e.target.dataset.filter;

    document.querySelectorAll('.category').forEach(cat => {
      cat.style.display =
        filter === 'all' || cat.dataset.category === filter
          ? 'block'
          : 'none';
    });
  });
}

/* ===== TRATTAMENTI ===== */
function buildTreatments(categories) {
  const container = document.getElementById('treatments');
  container.innerHTML = '';

  categories.forEach(category => {
    category.sections.forEach(section => {

      const catEl = document.createElement('div');
      catEl.className = 'category';
      catEl.dataset.category = category.id;

      catEl.innerHTML = `
        <button class="category-header">
          ${section.title}
          <span>da €${section.fromPrice}</span>
        </button>
        <div class="category-content"></div>
      `;

      const content = catEl.querySelector('.category-content');

      section.treatments.forEach(treatment => {
        const treatmentEl = document.createElement('div');
        treatmentEl.className = 'treatment';

        treatmentEl.innerHTML = `
          <div class="treatment-header">
            <h4>${treatment.name} – €${treatment.price}</h4>
            <span class="duration">${treatment.duration}</span>
          </div>
          ${treatment.description ? `<p class="description">${treatment.description}</p>` : ''}
        `;

        if (treatment.variants) {
          const ul = document.createElement('ul');
          ul.className = 'variants';

          treatment.variants.forEach(v => {
            const li = document.createElement('li');
            li.textContent = v.label;
            ul.appendChild(li);
          });

          treatmentEl.appendChild(ul);
        }

        content.appendChild(treatmentEl);
      });

      catEl.querySelector('.category-header')
        .addEventListener('click', () => {
          catEl.classList.toggle('open');
        });

      container.appendChild(catEl);
    });
  });
}

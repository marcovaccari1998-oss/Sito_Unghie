fetch('treatments.json')
  .then(res => res.json())
  .then(data => {
    buildFilters(data.categories);
    buildTreatments(data.categories);
  });

function buildTreatments(categories) {
  const container = document.getElementById('treatments-container');
  container.innerHTML = '';

  categories.forEach(cat => {
    container.appendChild(buildCategory(cat));
  });
}

function buildCategory(category) {
  const card = document.createElement('div');
  card.className = 'category';

  category.sections.forEach(section => {
    card.appendChild(buildSection(section));
  });

  return card;
}

function buildSection(section) {
  const wrapper = document.createElement('div');

  const header = document.createElement('div');
  header.className = 'section-header';
  header.textContent = section.title;

  const list = document.createElement('div');
  list.style.display = 'none';

  header.onclick = () => {
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
  };

  section.treatments.forEach(t => {
    list.appendChild(buildTreatment(t));
  });

  wrapper.appendChild(header);
  wrapper.appendChild(list);
  return wrapper;
}

function buildTreatment(t) {
  const div = document.createElement('div');
  div.className = 'treatment';

  div.innerHTML = `
    <div class="treatment-header">
      <span class="treatment-name">
        ${t.name}
        <span class="open-icon">›</span>
      </span>
      <span class="price">${t.price}€</span>
    </div>
  `;

  div.onclick = () => openTreatmentModal(t);
  return div;
}

function openTreatmentModal(t) {
  document.getElementById('modal-title').textContent = t.name;
  document.getElementById('modal-duration').textContent = t.duration;
  document.getElementById('modal-description').textContent = t.description;
  document.getElementById('modal-image').src = t.image;

  document.getElementById('treatment-modal').classList.remove('hidden');
}

document.querySelector('.close-modal').onclick = () => {
  document.getElementById('treatment-modal').classList.add('hidden');
};

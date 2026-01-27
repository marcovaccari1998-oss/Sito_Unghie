

// APERTURA / CHIUSURA CATEGORIE
document.querySelectorAll('.category-header').forEach(button => {
  button.addEventListener('click', () => {
    button.parentElement.classList.toggle('open');
  });
});

// FILTRI
const filterButtons = document.querySelectorAll('.filter-btn');
const categories = document.querySelectorAll('.category');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    categories.forEach(cat => {
      if (filter === 'all' || cat.dataset.category === filter) {
        cat.style.display = 'block';
      } else {
        cat.style.display = 'none';
      }
    });
  });
});

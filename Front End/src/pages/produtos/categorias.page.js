import { buscarCategorias } from '../../services/produtos/categorias.api.js';
import spinnerCarregamento from '../../components/ui/spinner-carregamento.component.js';

export async function categoriasPage() {

  const app = document.querySelector('#app');

  app.innerHTML = `
    <h1 class="fw-bold text-primary">📂 Categorias</h1>
    ${spinnerCarregamento()}
    <div class="row mt-4 d-none" id="lista-categorias"></div>
  `;

  const row = document.querySelector('#lista-categorias');
  const loading = document.querySelector('#loading');

  const categorias = await buscarCategorias();

  loading.remove();
  row.classList.remove('d-none');

  categorias.forEach(categoria => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    col.innerHTML = `
      <div class="card h-100 card-categoria">
        <div class="card-body">
          <h5 class="card-title">${categoria.name}</h5>
          <p class="card-text">${categoria.description || 'Descrição não disponível'}</p>
        </div>
      </div>
    `;

    row.appendChild(col);
  });
}
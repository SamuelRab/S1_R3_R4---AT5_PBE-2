export default function criarNavbar() {
  const header = document.querySelector('header');
  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-expand-lg shadow-sm';

nav.innerHTML = `
    <div class="container-fluid">

      <a class="navbar-brand fw-bold text-primary" href="#">
        TechNova  
      </a>

      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center" id="menu">

        <ul class="navbar-nav mb-2 mb-lg-0">

          <li class="nav-item">
            <button 
              class="nav-link active fw-bold text-primary" 
              id="btnProdutos"
            >
              Produtos
            </button>
          </li>

        </ul>

        <div class="d-flex align-items-center ms-3">
          <select class="btn btn-categoria btn-sm" id="selectCategoria" style="width: 180px;">
            <option value="">Todas as Categorias</option>
          </select>
        </div>

      </div>

      <form class="d-flex me-3">
        <input 
          class="form-control" 
          type="search" 
          placeholder="Pesquisar produtos..."
          id="inputSearch"
        >
      </form>

      <button 
        class="btn btn-outline-primary position-relative"
        id="btnCarrinho"
      >
        <i class="bi bi-cart3"></i>

        <span 
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
          id="quantidadeCarrinho"
        >
          0
        </span>
      </button>

    </div>
`;

  header.appendChild(nav);

}


export function ativarMenu(botaoClicado) {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.remove('active', 'text-primary', 'fw-bold');
  });

  botaoClicado.classList.add('active', 'text-primary', 'fw-bold');
}

export function pesquisarProduto(produtos, onSearch) {

  const inputSearch = document.querySelector("#inputSearch");

  inputSearch.addEventListener('input', () => {

    const termo = inputSearch.value.toLowerCase();

    const filtrados = produtos.filter(produtos =>
      produtos.name.toLowerCase().includes(termo)
    );

    onSearch(filtrados);
  });
}

export function filtrarPorCategoria(produtos, categorias, onFilter) {
  const selectCategoria = document.querySelector("#selectCategoria");

  selectCategoria.addEventListener('change', () => {

    const categoriaSelecionada = selectCategoria.value;

    if (categoriaSelecionada === '') {

      onFilter(produtos);

    } else {
      // Encontrar o ID da categoria pelo nome
      const categoria = categorias.find(cat => cat.name === categoriaSelecionada);
      
      if (categoria) {
        const filtrados = produtos.filter(produto =>
          produto.category === categoria.id
        );

        onFilter(filtrados);
      }
    }
  });
}
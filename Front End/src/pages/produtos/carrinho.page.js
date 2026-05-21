import {
  listarCarrinho
} from '../../storage/carrinho/carrinho.storage.js';

import {
  criarPaginacao,
  renderizarProdutos
} from '../../components/ui/paginacao.component.js';

import spinnerCarregamento from '../../components/ui/spinner-carregamento.component.js';

import { ITENS_POR_PAGINA } from '../../config/app.config.js';

export async function produtosCarrinhoPage() {

  const app = document.querySelector('#app');

  let paginaAtual = 1;

  let carrinho = [];

  let carrinhoFiltrados = [];

  app.innerHTML = `
    <h1 class="fw-bold text-primary">
      🛒 Carrinho
    </h1>

    ${spinnerCarregamento()}

    <div class="row mt-4 d-none" id="lista-produtos"></div>

    <div id="paginacao" class="mt-4"></div>
  `;

  const row = document.querySelector('#lista-produtos');

  const loading = document.querySelector('#loading');

  const paginacaoContainer = document.querySelector('#paginacao');

  carrinho = listarCarrinho();

  carrinhoFiltrados = carrinho;

  loading.remove();

  row.classList.remove('d-none');

  function sincronizarCarrinho() {

    carrinho = listarCarrinho();

    carrinhoFiltrados = carrinho;

    const totalPaginas = Math.max(
      1,
      Math.ceil(
        carrinhoFiltrados.length / ITENS_POR_PAGINA
      )
    );

    paginaAtual = Math.min(
      paginaAtual,
      totalPaginas
    );
  }

  function atualizarTela() {

    row.innerHTML = '';

    renderizarProdutos(
      row,
      carrinhoFiltrados,
      paginaAtual,
      {

        onCarrinhoAlterado: ({ carrinho }) => {

          if (!carrinho) {

            sincronizarCarrinho();

            atualizarTela();
          }
        }
      }
    );

    const paginacao = criarPaginacao({

      totalItens: carrinhoFiltrados.length,

      paginaAtual,

      onPageChange: (novaPagina) => {

        paginaAtual = novaPagina;

        atualizarTela();
      }
    });

    paginacaoContainer.innerHTML = '';

    paginacaoContainer.appendChild(paginacao);
  }

  atualizarTela();
}
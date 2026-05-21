import { buscarProdutos } from '../../services/produtos/produtos.api.js';
import { buscarCategorias } from '../../services/produtos/categorias.api.js';
import { pesquisarProduto, filtrarPorCategoria } from '../../components/layout/navbar.component.js';
import {
  criarPaginacao,
  renderizarProdutos
} from '../../components/ui/paginacao.component.js';

import spinnerCarregamento from '../../components/ui/spinner-carregamento.component.js';

export async function produtosPage() {

  const app = document.querySelector('#app');

  let paginaAtual = 1;
  let produtos = [];
  let produtosFiltrados = [];

  app.innerHTML = `
    <h1 class="fw-bold text-primary">🛍️ Produtos</h1>

    ${spinnerCarregamento()}

    <div class="row mt-4 d-none" id="lista-produtos"></div>

    <div id="paginacao" class="mt-4"></div>
  `;

  const row = document.querySelector('#lista-produtos');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');

  try {

    produtos = await buscarProdutos();

    const categorias = await buscarCategorias();

    console.log(produtos);

    produtosFiltrados = produtos;

    // Adicionar categorias ao select da navbar
    const selectCategoria = document.querySelector('#selectCategoria');
    
    // Limpar opções duplicadas (manter apenas a primeira opção)
    while (selectCategoria.options.length > 1) {
      selectCategoria.remove(1);
    }
    
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.name;
      option.textContent = categoria.name;
      selectCategoria.appendChild(option);
    });

    loading.remove();

    row.classList.remove('d-none');

    function atualizarTela() {

      row.innerHTML = '';

      renderizarProdutos(
        row,
        produtosFiltrados,
        paginaAtual
      );

      const paginacao = criarPaginacao({
        totalItens: produtosFiltrados.length,
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

    // Filtrar por categoria via navbar
    filtrarPorCategoria(produtos, categorias, (resultado) => {
      paginaAtual = 1;
      produtosFiltrados = resultado;
      atualizarTela();
    });

    // Pesquisar por nome
    pesquisarProduto(produtos, (resultado) => {
      paginaAtual = 1;
      produtosFiltrados = resultado;
      atualizarTela();
    });

  } catch (erro) {

    console.error(erro);

    app.innerHTML = `
      <div class="alert alert-danger">
        Erro ao carregar produtos.
      </div>
    `;
  }
}
import {listarCarrinho} from '../../storage/carrinho/carrinho.storage.js';
import {criarPaginacao, renderizarProdutos} from '../../components/ui/paginacao.component.js';
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

    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-4 mb-3 d-none" id="resumo-carrinho">
      <div>
        <p class="mb-1 fw-bold">Produtos no carrinho: <span id="carrinho-quantidade">0</span></p>
        <p class="mb-0">Valor total: <span id="carrinho-total">R$ 0,00</span></p>
      </div>
      <button id="btnCheckout" class="btn btn-primary btn-lg" disabled>Finalizar Compra</button>
    </div>

    <div class="row mt-4 d-none" id="lista-produtos"></div>

    <div id="paginacao" class="mt-4"></div>
  `;

  const row = document.querySelector('#lista-produtos');
  const resumo = document.querySelector('#resumo-carrinho');
  const quantidadeElement = document.querySelector('#carrinho-quantidade');
  const totalElement = document.querySelector('#carrinho-total');
  const btnCheckout = document.querySelector('#btnCheckout');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');

  function formatarDinheiro(valor) {
    return Number(valor).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function calcularTotal(itens) {
    return itens.reduce((total, produto) => {
      const valor = Number(String(produto.price).replace(',', '.')) || 0;
      return total + valor;
    }, 0);
  }

  function atualizarResumo() {
    const quantidade = carrinhoFiltrados.length;
    const total = calcularTotal(carrinhoFiltrados);

    quantidadeElement.innerText = quantidade;
    totalElement.innerText = `R$ ${formatarDinheiro(total)}`;
    btnCheckout.disabled = quantidade === 0;
    resumo.classList.remove('d-none');
  }

  btnCheckout.addEventListener('click', () => {
    const quantidade = carrinhoFiltrados.length;

    if (quantidade === 0) {
      window.alert('Seu carrinho está vazio.');
      return;
    }

    const total = calcularTotal(carrinhoFiltrados);
    window.alert(`Checkout realizado com ${quantidade} produto(s). Total: R$ ${formatarDinheiro(total)}`);
  });

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

    paginaAtual = Math.min(paginaAtual, totalPaginas);
  }

  function atualizarTela() {

    row.innerHTML = '';

    renderizarProdutos(row, carrinhoFiltrados, paginaAtual,{
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

    atualizarResumo();
  }

  atualizarTela();
}
import criarNavbar, { ativarMenu } from './components/layout/navbar.component';
import { produtosPage } from './pages/produtos/produtos.page';
import { produtosCarrinhoPage } from './pages/produtos/carrinho.page';

criarNavbar();
produtosPage();

const btnProdutos = document.querySelector('#btnProdutos');
const btnCarrinho = document.querySelector('#btnCarrinho');

// Controla a navegação entre páginas da aplicação
btnProdutos.addEventListener('click', () => {
  ativarMenu(btnProdutos);
  produtosPage();
});

btnCarrinho.addEventListener('click', () => {
  ativarMenu(btnCarrinho);
  produtosCarrinhoPage();
});
import { criarCarrinho } from "./button.component";
import criarImagemProduto from "./imagem.component";
import { salvarCarrinho, noCarrinho, removerCarrinho, listarCarrinho} from "../../storage/carrinho/carrinho.storage";
import { obterURLImagem } from "../../services/produtos/produtos.api";

// Cria o card do produto
export default function criarCardProduto(produto) {

  const card = document.createElement('div');
  card.className = 'card m-2';
  card.style.width = '18rem';

  const img = criarImagemProduto(
  obterURLImagem(produto.imagem)
);

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.innerText = produto.name;

  const price = document.createElement('p');
  price.className = 'card-text';
  price.innerText = `R$ ${produto.price}`;

  const produtoNoCarrinho = listarCarrinho().find(
    item => item.name === produto.name
  );

  let quantidade = produtoNoCarrinho ? Number(produtoNoCarrinho.quantity || 1) : 1;

  const quantidadeSelecionada = document.createElement('div');
  quantidadeSelecionada.className = 'd-flex align-items-center gap-2 mb-3 quantidade-controle';

  const btnMinus = document.createElement('button');
  btnMinus.type = 'button';
  btnMinus.className = 'btn btn-outline-secondary btn-sm';
  btnMinus.innerText = '-';

  const quantidadeLabel = document.createElement('span');
  quantidadeLabel.className = 'quantidade-display fw-bold';
  quantidadeLabel.innerText = quantidade;

  const btnPlus = document.createElement('button');
  btnPlus.type = 'button';
  btnPlus.className = 'btn btn-outline-secondary btn-sm';
  btnPlus.innerText = '+';


  // Limite de estoque
  const estoque = Number(produto.estoque || produto.estoque === 0 ? produto.estoque : 99);

  function atualizarQuantidade() {
    quantidade = Math.max(1, Math.min(quantidade, estoque));
    quantidadeLabel.innerText = quantidade;
    btnMinus.disabled = quantidade <= 1;
    btnPlus.disabled = quantidade >= estoque;
  }

  btnMinus.addEventListener('click', () => {
    if (quantidade > 1) {
      quantidade -= 1;
      atualizarQuantidade();
    }
  });

  btnPlus.addEventListener('click', () => {
    if (quantidade < estoque) {
      quantidade += 1;
      atualizarQuantidade();
    }
  });

  atualizarQuantidade();

  quantidadeSelecionada.appendChild(btnMinus);
  quantidadeSelecionada.appendChild(quantidadeLabel);
  quantidadeSelecionada.appendChild(btnPlus);

  const buttonCarrinho = criarCarrinho(noCarrinho(produto));

  // Contador da navbar
  const quantidadeCarrinho =
    document.querySelector('#quantidadeCarrinho');

  buttonCarrinho.addEventListener('click', () => {
    const produtoComQuantidade = {
      ...produto,
      quantity: quantidade
    };

    if (noCarrinho(produtoComQuantidade)) {
      removerCarrinho(produtoComQuantidade);

      buttonCarrinho.innerText =
        'Adicionar ao Carrinho';

      buttonCarrinho.className =
        'btn btn-sm btn-success';

    } else {
      salvarCarrinho(produtoComQuantidade);

      buttonCarrinho.innerText =
        'Remover do Carrinho';

      buttonCarrinho.className =
        'btn btn-sm btn-danger';
    }

    // Atualiza contador
    quantidadeCarrinho.innerText =
      listarCarrinho().length;
  });

  body.appendChild(title);
  body.appendChild(price);
  body.appendChild(quantidadeSelecionada);
  body.appendChild(buttonCarrinho);

  card.appendChild(img);
  card.appendChild(body);

  return card;
}
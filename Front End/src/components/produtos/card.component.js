import { criarCarrinho } from "./button.component";
import criarImagemProduto from "./imagem.component";

import {
  salvarCarrinho,
  noCarrinho,
  removerCarrinho,
  listarCarrinho
} from "../../storage/carrinho/carrinho.storage";

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

  const buttonCarrinho = criarCarrinho(noCarrinho(produto));

  // Contador da navbar
  const quantidadeCarrinho =
    document.querySelector('#quantidadeCarrinho');

  buttonCarrinho.addEventListener('click', () => {

    if (noCarrinho(produto)) {

      removerCarrinho(produto);

      buttonCarrinho.innerText =
        'Adicionar ao Carrinho';

      buttonCarrinho.className =
        'btn btn-sm btn-success';

    } else {

      salvarCarrinho(produto);

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
  body.appendChild(buttonCarrinho);

  card.appendChild(img);
  card.appendChild(body);

  return card;
}
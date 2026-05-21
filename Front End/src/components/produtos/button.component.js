// Cria o botão para adicionar/remover do carrinho
export function criarCarrinho(carrinho = false) {
  const button = document.createElement('button');

  if (carrinho) {
    button.className = 'btn btn-sm btn-danger';
    button.innerText = 'Remover do Carrinho';
  } else {
    button.className = 'btn btn-sm btn-success';
    button.innerText = 'Adicionar ao Carrinho';
  }

  return button;

}
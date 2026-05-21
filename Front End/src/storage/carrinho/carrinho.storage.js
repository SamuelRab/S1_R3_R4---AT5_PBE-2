// Salva um produto na lista do carrinho
export function salvarCarrinho(produtos) {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  );

  // evita duplicados
  const jaExiste = carrinho.some(
    car => car.name === produtos.name
  );

  if (!jaExiste) {
    carrinho.push(produtos);

    localStorage.setItem(
      'carrinho',
      JSON.stringify(carrinho)
    );
  }
}

// Remove um produto da lista do carrinho pelo id
export function removerCarrinho(produtos) {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  );

  const carrinhoAtualizados = carrinho.filter(
    car => car.name !== produtos.name
  );

  localStorage.setItem(
    'carrinho',
    JSON.stringify(carrinhoAtualizados)
  );
}

// Retorna todos os produtos salvos no carrinho
export function listarCarrinho() {
  return JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  );
}

// Verifica se um produto esta no carrinho
export function noCarrinho(produtos) {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  );

  return carrinho.some(
    car => car.name === produtos.name
  );
}
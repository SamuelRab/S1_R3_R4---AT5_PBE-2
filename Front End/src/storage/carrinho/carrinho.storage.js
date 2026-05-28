// Salva um produto na lista do carrinho
export function salvarCarrinho(produtos) {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  );
 
  const estoque = Number(produtos.quantidadeEstoque ?? Infinity);
  const quantidade = Number(produtos.quantity ?? 1);
 
  if (quantidade > estoque) {
    window.alert(`Não é possível adicionar mais do que ${estoque} unidades deste produto ao carrinho.`);
    return;
  }
 
  // Evita duplicados
  const jaExiste = carrinho.some(car => car.name === produtos.name);
 
  if (!jaExiste) {
    carrinho.push(produtos);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
}
 
// Remove um produto da lista do carrinho pelo nome
export function removerCarrinho(produtos) {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  );
 
  const carrinhoAtualizado = carrinho.filter(
    car => car.name !== produtos.name
  );
 
  localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
}
 
// Retorna todos os produtos salvos no carrinho
export function listarCarrinho() {
  return JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  );
}
 
// Verifica se um produto está no carrinho
export function noCarrinho(produtos) {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  );
 
  return carrinho.some(car => car.name === produtos.name);
}
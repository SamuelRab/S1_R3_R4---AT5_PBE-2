/**
 * Cria a imagem do produto com tratamento de erro
 */
export default function criarImagemProduto(imagem) {
  const img = document.createElement('img');
  img.src = imagem;
  img.className = 'card-img-top';
  img.alt = 'Imagem do Produto';
  img.style.objectFit = 'cover';
  img.style.height = '200px';
  
  // Tratamento de erro ao carregar a imagem
  img.addEventListener('error', () => {
    console.warn(`Erro ao carregar imagem: ${imagem}`);
    img.src = 'https://placehold.co/300x200?text=Imagem+Indisponível';
  });

  return img;
}
import axios from 'axios';

const API_URL = 'http://localhost:8080/produtos';
const BACKEND_URL = 'http://localhost:8080';

export async function buscarProdutos() {

  try {

    const resposta = await axios.get(API_URL);

    console.log(resposta);
    const produtos = resposta.data.dados;

    return produtos.map(produto => ({

      id: produto.id,
      name: produto.nome,
      price: produto.preco,
      imagem: produto.imagem,
      descricao: produto.descricao,
      category: produto.idCategoria,
      quantidadeEstoque:
        produto.quantidadeEstoque
    }));

  } catch (erro) {

    console.error(
      'Erro ao buscar produtos',
      erro
    );

    return [];
  }
};

/**
 * Retorna a URL completa da imagem do backend
 * @param {string} caminhoImagem - Caminho da imagem retornado pela API
 * @returns {string} URL completa da imagem
 */
export function obterURLImagem(caminhoImagem) {
  if (!caminhoImagem) {
    return 'https://placehold.co/300x200';
  }
  
  // Se já for uma URL completa, retorna como está
  if (caminhoImagem.startsWith('http')) {
    return caminhoImagem;
  }
  
  // Extrai apenas o nome do arquivo
  const nomeArquivo = caminhoImagem.split('/').pop();
  
  // Constrói a URL usando a rota específica de imagens
  return `${BACKEND_URL}/imagens/${nomeArquivo}`;
};
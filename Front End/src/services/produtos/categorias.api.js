import axios from 'axios';

const API_URL = 'http://localhost:8080/categorias';

/**
 * Capitaliza a primeira letra e deixa o resto em minúscula
 */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export async function buscarCategorias() {

  try {

    const resposta = await axios.get(API_URL);

    const categorias = resposta.data.dados;

    return categorias.map(categoria => ({
      id: categoria.id,
      name: capitalize(categoria.nome),
      description: categoria.descricao
    }));

  } catch (erro) {

    console.error(
      'Erro ao buscar categorias',
      erro
    );

    return [];
  }
}
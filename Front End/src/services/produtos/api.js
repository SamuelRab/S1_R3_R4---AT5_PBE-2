const BASE_URL = 'http://localhost:8080';

export async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || 'Erro na requisição');
  }

  return data;
}
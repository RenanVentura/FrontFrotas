import axios from 'axios';

// Criação da instância do axios com configurações básicas
const api = axios.create({
    baseURL: 'https://backfrotas.onrender.com',
    // baseURL: 'http://localhost:3000/', // URL base para todas as requisições
    timeout: 5000, // Tempo limite de 5 segundos para cada requisição
    headers: {
        'Content-Type': 'application/json', // Tipo de conteúdo JSON por padrão
    }
});

// Interceptor de requisição: Adiciona o token de autenticação (se disponível) em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Recupera o token do localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
        }
        return config;
    },
    (error) => {
        // Caso ocorra erro na requisição, retorna o erro
        return Promise.reject(error);
    }
);

// Interceptor de resposta: Trata respostas antes que elas sejam passadas ao código
api.interceptors.response.use(
    (response) => {
        // Manipulação de sucesso, caso necessário
        return response;
    },
    (error) => {
        // Caso de erro: trata erros de autenticação ou outros erros de status
        if (error.response) {
            if (error.response.status === 401) {
                // Exemplo: redirecionar para a página de login ou exibir mensagem
                console.log('Sessão expirada. Redirecionando para login...');
                // window.location.href = '/login';
            } else {
                // Outro tipo de erro, como erros de rede ou outros status
                console.error('Erro ao processar a requisição:', error.response.data.message);
            }
        }
        return Promise.reject(error);
    }
);

// Exporta a instância do axios configurada para uso em outros arquivos
export default api;

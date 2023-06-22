import axios from "axios";
import { getCookie } from "cookies-next";
import { parseCookies, destroyCookie } from "nookies";

const baseURL = process.env.API_URL || 'http://bigu-backend.herokuapp.com/';

export const api = axios.create({
  baseURL,
  headers: {'Accept': 'application/json'}
});

// let token;
// if (typeof window !== 'undefined') {
//   // Perform localStorage action
//   // token = localStorage.getItem("bigu-token")

//   token = token ? getCookie("token") : null;
// }

api.interceptors.response.use(
  (response) => {
    // Sucesso na resposta - retornar a resposta sem fazer alterações
    return response;
  },
  (error) => {
    // console.log(JSON.stringify(error, null, 2))
    if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
      // destroyCookie(null, 'nextauth.token');
    // Erro na resposta - manipular o erro ou lançar um novo erro
    // Aqui você pode fazer qualquer manipulação desejada no erro de resposta
    }
    // Por exemplo, você pode adicionar uma propriedade personalizada ao erro
    error.customProperty = 'Custom Value';

    // Ou você pode lançar um novo erro com uma mensagem personalizada
    throw new Error('Ocorreu um erro na resposta.');

    // Se você deseja retornar uma resposta de erro modificada, você pode fazer algo como:
    // return { ...error.response, customProperty: 'Custom Value' };
  }
);

api.interceptors.request.use( config => {
  const { 'nextauth.token': token } = parseCookies();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // console.log(JSON.stringify(config, null, 2))
  return config
})



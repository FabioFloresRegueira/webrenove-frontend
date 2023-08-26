/*
    configurando o bjeto do axios para requisição global facilitando
    a manutenção do codigo referenciando a url base da api. 
*/

import axios from "axios";

const axiosGlobal = axios.create({
    baseURL: "http://localhost:8080/rest/",
    headers: {"content-type": "application/json"},
});
export default axiosGlobal 
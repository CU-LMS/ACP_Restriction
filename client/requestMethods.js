import axios from "axios";

export const BASE_URL = "http://localhost:8800/api"
export const PRODUCTION_URL= "https://acpapi.idolcu.in/api"
export const FALLBACK_URL= "http://localhost:8800"
export const PRODUCTION_FALLBACK_URL= "https://acpapi.idolcu.in:8800"

let TOKEN;
const getToken = ()=>{
    if(localStorage.getItem("adminuserfileupload")){
        TOKEN = JSON.parse(localStorage.getItem("adminuserfileupload"))?.accestoken
}
}
getToken()

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})
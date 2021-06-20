import axios from "axios";
import {IAxiosConfig} from "./types/http";


const URL = 'http://localhost:8080';

const axiosConfig: IAxiosConfig = {
    withCredentials: true,
    'Access-Control-Allow-Origin': URL
}

const transport = axios.create(axiosConfig)

export const login = (data: FormData) => transport.post(URL + 'login', data);
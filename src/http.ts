import axios from "axios";
import {IAxiosConfig} from "./types/http";


const URL = 'http://localhost:8080/';

const axiosConfig: IAxiosConfig = {
    withCredentials: true
}

const transport = axios.create(axiosConfig)

export const authorize = async (data: FormData) => transport.post(URL + 'login', data);

export const getProfile = async () => transport.post(URL + 'profile');
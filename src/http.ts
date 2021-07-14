import axios from "axios";
import {IAxiosConfig} from "./types/http";

const URL = 'http://localhost:8080/';

const axiosConfig: IAxiosConfig = {
    withCredentials: true
}

const transport = axios.create(axiosConfig)

export const authorize = async (data: FormData) => transport.post(URL + 'login', data);

export const getProfile = async () => transport.get(URL + 'profile');

export const getUserList = async () => transport.get(URL + 'user_list');

export const getRoomList = async () => transport.get(URL + 'room_list')

export const logout = async () => transport.get(URL + 'logout');

export const chat = (roomId: string) =>
    new WebSocket(URL.replace('http', 'ws') + 'chat/' + roomId);
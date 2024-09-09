
import { io } from 'socket.io-client';
const URL = process.env.REACT_APP_NEW_BACKEND_SOCKET_URL;

export const socket = io(URL,{
    transports: ['websocket'],
});
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  socket = io(import.meta.env.VITE_SERVER_URL, {
    auth: {
      token,
    },
  })
  
  socket.connect();
}

export const getSocket = () => socket;
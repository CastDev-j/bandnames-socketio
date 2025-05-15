import { createContext } from "react";
import type { Socket } from "socket.io-client";

export const SocketContext = createContext<{
  socket: Socket;
  isOnline: boolean;
}>({
  socket: {} as Socket,
  isOnline: false,
});

import type { FC } from "react";
import { useSocket } from "../hooks/useSoccket";
import { SocketContext } from "../context/SocketContext";

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const { socket, isOnline } = useSocket("http://localhost:8080");

  return (
    <SocketContext.Provider value={{ isOnline, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

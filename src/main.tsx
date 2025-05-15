import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { SocketProvider } from "./provider/SocketProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </SocketProvider>
);

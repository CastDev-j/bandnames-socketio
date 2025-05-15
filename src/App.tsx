import { useContext } from "react";
import { BandList } from "./components/band-list";
import { SocketContext } from "./context/SocketContext";
import { Bars } from "./components/bars";

function App() {
  const { isOnline } = useContext(SocketContext);

  return (
    <main className="min-h-screen p-4 flex flex-col gap-6 items-center justify-center bg-neutral-900/50">
      <p className="absolute top-4 left-auto text-neutral-200 opacity-75">
        Estado de la aplicación:{" "}
        {isOnline ? (
          <span className="text-green-500">Conectado</span>
        ) : (
          <span className="text-red-500">Desconectado</span>
        )}
      </p>
      <BandList />
      <Bars />

    </main>
  );
}

export default App;

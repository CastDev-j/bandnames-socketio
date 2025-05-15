import { BandList } from "./components/band-list";

function App() {
  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center bg-neutral-900/50">
      <p className="absolute top-4 left-auto text-neutral-200 opacity-75">
        Estado de la aplicación:{" "}
        {true ? (
          <span className="text-green-500">Conectado</span>
        ) : (
          <span className="text-red-500">Desconectado</span>
        )}
      </p>
      <BandList />
    </main>
  );
}

export default App;

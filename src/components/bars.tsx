import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import type { Band } from "../interfaces";

export const Bars = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on("current-bands", (bands: Band[]) => {
      setBands(bands);
    });

    return () => {
      socket.off("current-bands");
    };
  }, [socket]);

  // Encontrar el máximo de votos para escalar las barras
  const maxVotes = Math.max(...bands.map((band) => band.votes), 1);

  return (
    <section className="w-full max-w-md" aria-label="Gráfico de votos">
      <div className="bg-neutral-800 rounded-xl shadow-2xl p-6 border border-neutral-700 backdrop-blur-sm">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-100 mb-1 tracking-tight">
            Votos por Banda
          </h1>
          <p className="text-sm text-neutral-500">
            Visualización de los votos actuales
          </p>
        </header>

        <div className="w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-px my-6" />

        {/* Gráfico de barras */}
        <div className="relative">
          <div className="absolute -top-3 left-0 right-0 flex justify-center">
            <div className="bg-neutral-800 px-3 text-xs text-neutral-500">
              VOTOS
            </div>
          </div>

          <div className="space-y-4 h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
            {bands.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[40vh] text-center text-neutral-400 border-2 border-dashed border-neutral-700 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-3 h-12 w-12 text-neutral-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg font-medium">No hay datos</span>
                <p className="text-sm mt-1 max-w-xs text-neutral-500">
                  Agrega bandas para visualizar los votos
                </p>
              </div>
            ) : (
              bands.map((band) => (
                <div key={band.id} className="flex items-center gap-4">
                  <div className="w-32">
                    <p className="text-neutral-200 truncate" title={band.name}>
                      {band.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {band.votes} votos
                    </p>
                  </div>

                  <div className="flex-1">
                    <div
                      className="h-8 bg-gradient-to-r from-neutral-600 to-neutral-500 rounded-md flex items-center justify-end pr-2 transition-all duration-500"
                      style={{
                        width: `${(band.votes / maxVotes) * 100}%`,
                        minWidth: "24px", // Para que se vea aunque tenga 0 votos
                      }}
                    >
                      <span className="text-xs font-medium text-neutral-900">
                        {band.votes}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-px my-6" />

        <footer className="flex justify-between items-center">
          <div className="text-sm text-neutral-400 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span>
              Total: {bands.reduce((sum, band) => sum + band.votes, 0)} votos
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
};

import { useBandList } from "../hooks/useBandList";

export const BandList = () => {
  const {
    bands,
    changeBandName,
    onBlurBandNameInput,
    clearList,
    decrementVote,
    deleteBand,
    handleSubmit,
    incrementVote,
  } = useBandList();

  return (
    <section className="w-full max-w-md" aria-label="Lista de Bandas">
      <div className="bg-neutral-800 rounded-xl shadow-2xl p-6 border border-neutral-700 backdrop-blur-sm">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-100 mb-1 tracking-tight">
            Lista de Bandas
          </h1>
          <p className="text-sm text-neutral-500">
            Agrega y gestiona tus bandas favoritas
          </p>
        </header>

        <div className="w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-px my-6" />

        {/* Formulario */}
        <form
          className="flex gap-3 mb-8"
          onSubmit={handleSubmit}
          aria-label="Agregar banda"
          autoComplete="off"
        >
          <label htmlFor="band-input" className="sr-only">
            Nombre de la banda
          </label>
          <input
            id="band-input"
            type="text"
            name="band"
            placeholder="Nombre de la banda..."
            className="text-neutral-100 placeholder-neutral-500 flex-1 px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Nombre de la banda"
            required
            maxLength={50}
          />
          <button
            type="submit"
            className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 px-5 py-3 rounded-lg transition-all font-medium shadow hover:shadow-lg active:scale-95 flex items-center"
            aria-label="Agregar banda"
          >
            <span>Agregar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </form>

        {/* Lista de bandas */}
        <div className="relative">
          <div className="absolute -top-3 left-0 right-0 flex justify-center">
            <div className="bg-neutral-800 px-3 text-xs text-neutral-500">
              BANDAS
            </div>
          </div>
          <ul
            className="space-y-3 h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900"
            aria-live="polite"
            aria-label="Lista de bandas"
          >
            {bands.length === 0 ? (
              <li className="flex flex-col items-center justify-center h-[40vh] text-center text-neutral-400 border-2 border-dashed border-neutral-700 rounded-lg">
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
                <span className="text-lg font-medium">La lista está vacía</span>
                <p className="text-sm mt-1 max-w-xs text-neutral-500">
                  Agrega tu primera banda usando el formulario
                </p>
              </li>
            ) : (
              bands.map((band) => (
                <li
                  key={band.id}
                  className="group flex flex-col justify-between items-center bg-neutral-900 rounded-lg p-4 border border-neutral-700 hover:border-neutral-600 transition-all"
                >
                  <div className="flex justify-between items-center w-full mb-3 gap-3">
                    <label htmlFor={`band-name-${band.id}`} className="sr-only">
                      Nombre de la banda
                    </label>
                    <input
                      id={`band-name-${band.id}`}
                      type="text"
                      value={band.name}
                      onChange={(e) => {
                        changeBandName(band.id, e.target.value);
                      }}
                      onBlur={() => onBlurBandNameInput(band.id, band.name)}
                      className="bg-transparent border-none p-0 text-neutral-200 font-medium focus:outline-none focus:ring-1 focus:ring-neutral-600 rounded px-1 -ml-1 w-full"
                      aria-label={`Editar nombre de la banda ${band.name}`}
                      maxLength={50}
                    />
                    <span className="text-sm bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                      {band.votes} votos
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 w-full">
                    <button
                      onClick={() => incrementVote(band.id)}
                      className="bg-neutral-700 hover:bg-neutral-600 text-neutral-200 px-4 py-2 rounded-md text-sm font-medium shadow hover:shadow-md transition-all flex items-center justify-center w-10"
                      title="Aumentar votos"
                      aria-label={`Aumentar votos de ${band.name}`}
                      type="button"
                    >
                      <span>+</span>
                    </button>
                    <button
                      onClick={() => decrementVote(band.id)}
                      className="bg-neutral-700 hover:bg-neutral-600 text-neutral-200 px-4 py-2 rounded-md text-sm font-medium shadow hover:shadow-md transition-all flex items-center justify-center w-10"
                      title="Disminuir votos"
                      aria-label={`Disminuir votos de ${band.name}`}
                      type="button"
                    >
                      <span>-</span>
                    </button>
                    <button
                      onClick={() => deleteBand(band.id)}
                      className="bg-neutral-700 hover:bg-rose-900/50 text-rose-400 px-4 py-2 rounded-md text-sm font-medium shadow hover:shadow-md transition-all flex items-center gap-1 flex-1 justify-center"
                      title="Eliminar banda"
                      aria-label={`Eliminar banda ${band.name}`}
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Eliminar</span>
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-px my-6" />

        <footer
          className="flex justify-between items-center"
          aria-label="Pie de página"
        >
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>Total: {bands.length}</span>
          </div>
          <button
            onClick={clearList}
            disabled={bands.length === 0}
            className={`${
              bands.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-neutral-600"
            } bg-neutral-700 text-rose-400 px-5 py-2 rounded-lg transition-all font-medium shadow hover:shadow-lg flex items-center gap-1`}
            aria-label="Limpiar toda la lista"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Limpiar todo</span>
          </button>
        </footer>
      </div>
    </section>
  );
};

export default function Text({ quote }: { readonly quote: string }) {
    return (
      <div className="transform transition duration-500 hover:shadow-2xl block rounded-t-lg bg-white text-gray-800 shadow-lg hover:scale-105">
        {/* Contenedor de los botones de control */}
        <div className="flex justify-start items-center space-x-2 px-4 py-2">
          {/* Botones de control: cerrar, minimizar, maximizar */}
          <span className="h-3 w-3 bg-red-500 rounded-full"></span>
          <span className="h-3 w-3 bg-yellow-400 rounded-full"></span>
          <span className="h-3 w-3 bg-green-500 rounded-full"></span>
        </div>
        <div className="border-b-2 border-neutral-200 px-6 py-3 font-medium text-lg bg-neutral-50 rounded-t-md">
          Descripción
        </div>
        <div className="p-6 rounded-b-lg bg-white">
          <blockquote>
            <p className="text-justify text-lg leading-relaxed font-light">
              {quote}
            </p>
          </blockquote>
        </div>
      </div>
    );
  }
  
import React from 'react';
import { useSettings } from '../../utils/SettingsContext'; // Asegúrate de importar correctamente

const Configuracion = () => {
  const {
    fontSize, setFontSize,
    highContrast, toggleHighContrast,
    darkMode, toggleDarkMode
  } = useSettings(); // Utilizamos el contexto aquí

  return (
    <div className="bg-white rounded-lg shadow-md p-4 bg-blue-200">
      <h1 className="text-xl font-bold">Configuración</h1>
      
      <div className="space-y-4">
        {/* Configuración del tamaño de la fuente */}
        <div>
          <h2 className="text-lg font-semibold">Tamaño de la fuente</h2>
          <div className="flex space-x-2">
            <button className={`py-2 px-4 ${fontSize === 'small' ? 'bg-blue-500 text-white' : 'bg-blue-300'}`} onClick={() => setFontSize('small')}>Pequeña</button>
            <button className={`py-2 px-4 ${fontSize === 'medium' ? 'bg-blue-500 text-white' : 'bg-blue-300'}`} onClick={() => setFontSize('medium')}>Media</button>
            <button className={`py-2 px-4 ${fontSize === 'large' ? 'bg-blue-500 text-white' : 'bg-blue-300'}`} onClick={() => setFontSize('large')}>Grande</button>
          </div>
        </div>

        {/* Modo de alto contraste */}
        <div>
          <h2 className="text-lg font-semibold">Modo de alto contraste</h2>
          <button className={`py-2 px-4 ${highContrast ? 'bg-blue-500 text-white' : 'bg-blue-300'}`} onClick={toggleHighContrast}>
            {highContrast ? 'Desactivar' : 'Activar'}
          </button>
        </div>

        {/* Modo oscuro */}
        <div>
          <h2 className="text-lg font-semibold">Modo oscuro</h2>
          <button className={`py-2 px-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300'}`} onClick={toggleDarkMode}>
            {darkMode ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;

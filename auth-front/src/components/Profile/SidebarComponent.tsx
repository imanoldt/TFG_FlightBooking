import React from 'react';
import { FaUserCircle, FaCog, FaEnvelope, FaChartLine, FaUnlockAlt, FaSignOutAlt } from 'react-icons/fa';

const SidebarComponent = ({ setActiveComponent }) => {
  return (
    <div className="bg-red-700 rounded-lg shadow-2xl p-5 flex flex-col items-center text-white space-y-6">
      {/* Imagen de perfil */}
      <img
        src="https://via.placeholder.com/100"
        alt="Perfil"
        className="w-32 h-32 rounded-full mb-4 shadow-lg"
      />
      {/* Links de navegación */}
      <ul className="w-full text-lg">
        <li className="flex items-center cursor-pointer py-3 px-4 hover:bg-red-800 rounded-md transition-all" onClick={() => setActiveComponent('perfil')}>
          <FaUserCircle className="mr-3 text-xl" /> Perfil
        </li>
        <li className="flex items-center cursor-pointer py-3 px-4 hover:bg-red-800 rounded-md transition-all" onClick={() => setActiveComponent('configuracion')}>
          <FaCog className="mr-3 text-xl" /> Configuración
        </li>
        <li className="flex items-center cursor-pointer py-3 px-4 hover:bg-red-800 rounded-md transition-all" onClick={() => setActiveComponent('mensajes')}>
          <FaEnvelope className="mr-3 text-xl" /> Mensajes
        </li>
        <li className="flex items-center cursor-pointer py-3 px-4 hover:bg-red-800 rounded-md transition-all" onClick={() => setActiveComponent('rutas')}>
          <FaChartLine className="mr-3 text-xl" /> Mis Rutas
        </li>
      </ul>
      {/* Botones de acción */}
      <div className="mt-6 w-full text-lg">
        <button className="bg-red-800 w-full rounded-lg py-3 hover:bg-red-900 transition duration-300 shadow-md flex items-center justify-center mb-3">
          <FaUnlockAlt className="mr-2" /> Modificar contraseña
        </button>
        <button className="bg-red-800 w-full rounded-lg py-3 hover:bg-red-900 transition duration-300 shadow-md flex items-center justify-center">
          <FaSignOutAlt className="mr-2" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default SidebarComponent;

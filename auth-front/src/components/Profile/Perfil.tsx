import React, { useState } from 'react';

// Componente de botón genérico con color personalizable
const Button = ({ label, onClick, color = "red" }) => (
    <button
      onClick={onClick}
      className={`w-full bg-${color}-500 text-white py-2 px-4 rounded hover:bg-${color}-700 transition duration-300 my-2`}
    >
      {label}
    </button>
  );

  const MenuButton = ({ label, onClick, icon }) => (
    <div onClick={onClick} className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 cursor-pointer p-4 m-4 rounded-lg transition duration-300">
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );

// Componente para cambiar la contraseña

const ChangePassword = ({ onBack }) => (
    <div className="space-y-6 p-6 rounded-lg ">
      <h2 className="text-2xl font-semibold text-gray-800">Cambiar contraseña</h2>
      <div className="space-y-4">
        <input
          type="password"
          placeholder="Nueva contraseña"
          className="input input-bordered w-full mb-4 p-3 rounded text-gray-700"
        />
        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          className="input input-bordered w-full p-3 rounded text-gray-700"

        />
      </div>
      <div className="flex flex-col space-y-2">
        <Button label="Actualizar contraseña" onClick={() => alert("Contraseña actualizada")} color="red" />
        
      </div>
    </div>
  );

// Componente para visualizar y editar rutas favoritas
const FavoriteRoutes = ({ onBack }) => (
    <div className="space-y-6 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Rutas favoritas</h2>
      <div className="space-y-4">
        {[
          { name: 'Ruta 1', image: 'url-to-image-1.jpg' },
          { name: 'Ruta 2', image: 'url-to-image-2.jpg' },
          { name: 'Ruta 3', image: 'url-to-image-3.jpg' },
        ].map((route, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden">
            <img src={route.image} alt={route.name} className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">{route.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onBack}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
      >
        Regresar
      </button>
    </div>
  );

// Componente para editar el perfil
const EditProfile = ({ onBack }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-800">Editar perfil</h2>
    <input type="text" placeholder="Nombre" className="input input-bordered w-full mb-4" />
    <input type="email" placeholder="Correo electrónico" className="input input-bordered w-full" />
    <Button label="Guardar cambios" onClick={() => alert("Cambios guardados")} />
    <Button label="Regresar" onClick={onBack} color="purple-300" />
  </div>
);

// Componente principal Perfil que maneja las vistas
const Perfil = () => {
    const [activeView, setActiveView] = useState('main');
    const userName = "Nombre del Usuario";
  
    const MainView = () => (
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mt-4">Bienvenido de nuevo, {userName}</h1>
          <div className="mt-6">
            <MenuButton label="Cambiar contraseña" onClick={() => setActiveView('changePassword')} icon="🔒" />
            <MenuButton label="Rutas favoritas" onClick={() => setActiveView('favoriteRoutes')} icon="🌍" />
            <MenuButton label="Editar perfil" onClick={() => setActiveView('editProfile')} icon="👤" />
          </div>
        </div>
      </div>
    );
  
    return (
      <div className="bg-white rounded-lg shadow-md p-8 h-full relative">
        {activeView !== 'main' && (
          <button
            className="absolute top-4 left-4 text-red-600 hover:text-red-800"
            onClick={() => setActiveView('main')}
            aria-label="Regresar"
          >
            {/* Ícono SVG de flecha hacia atrás */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {activeView === 'main' && <MainView />}
        {activeView === 'changePassword' && <ChangePassword onBack={() => setActiveView('main')} />}
        {activeView === 'favoriteRoutes' && <FavoriteRoutes onBack={() => setActiveView('main')} />}
        {activeView === 'editProfile' && <EditProfile onBack={() => setActiveView('main')} />}
      </div>
    );
  };
  

  

export default Perfil;

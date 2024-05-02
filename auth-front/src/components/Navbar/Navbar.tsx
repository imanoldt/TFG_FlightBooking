import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { HiMenuAlt3, HiUserCircle, HiCog, HiLogout } from "react-icons/hi";



export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);


  const auth = useAuth();
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };


  const showDropdown = () => {
    setDropdown(!dropdown);
  };
    const logout = () => {
    // Implementa la lógica de cierre de sesión aquí
    // Por ejemplo: auth.logout();
    navigate('/');
  };

  return (
    <nav className="w-full h-24 flex flex-col justify-center items-center sticky top-0 z-50 bg-white">
      <div className="max-w-[1400px] mx-auto lg:px-3 w-full">
        <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <h1 className="text-3xl font-bold text-black">SkySculptor</h1>
              <img
                className="h-12 w-12 object-cover"
                src="../public/sky_logo.webp"
                alt=""
              />
            </div>
          </div>
          <ul className="flex items-center xl:gap-12 gap-x-4 max-lg:hidden">
            <Link to="/dashboard" className="leading-normal no-underline text-black font-bold text-lg hover:text-primary">Inicio</Link>
            <Link to="/rutas" className="leading-normal no-underline text-black font-bold text-lg hover:text-primary">Rutas</Link>
            <Link to="" className="leading-normal no-underline text-black font-bold text-lg hover:text-primary">About</Link>
            <Link to="" className="leading-normal no-underline text-black font-bold text-lg hover:text-primary">Contacto</Link>
{/*
            {auth && (
              <button className="flex items-center bg-primary rounded border shadow h-16 px-12 outline-none text-white hover:bg-white hover:text-primary cursor-pointer text-base transition-bg hover:border hover:border-primary">
                Mi Perfil {auth.getUser()?.username}
              </button>
            )}*/}
            
          
          
            {auth && (
      <div className="relative">
        <button
          onClick={toggleProfileMenu}
          className="flex items-center bg-primary rounded border shadow h-16 px-12 outline-none text-white cursor-pointer text-base transition hover:bg-white hover:text-primary"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Mi Perfil {auth.getUser()?.username}
          <MdClose className="ml-2" />
        </button>
        {profileMenuOpen && (
          <div
            className={`absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
              profileMenuOpen ? 'block' : 'hidden'
            }`}
            style={{ width: 'max-content', minWidth: '100%' }} // Estilos para ancho mínimo y máximo
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            {/* Elementos del menú */}
            <a
              href="/perfil"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              <HiUserCircle className="inline mr-3 h-5 w-5" />
              Ver Perfil
            </a>
            <a
              href="/perfil"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              <HiCog className="inline mr-3 h-5 w-5" />
              Configuracion
            </a>
            <a
              href="/perfil"
              className="text-gray-700  block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              <HiLogout className="inline mr-3 h-5 w-5" />
              Cerrar sesión
            </a>
            {/* Agrega más elementos aquí */}
          </div>
        )}
      </div>
    )}









          </ul>
          



          {dropdown ? (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <MdClose />
            </div>
          ) : (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <HiMenuAlt3 />
            </div>
          )}


        </div>


        {dropdown && (
          <div className="lg:hidden w-full fixed top-24 bg-primary transition-all">
            <div className="w-full flex flex-col items-baseline gap-4">
              <ul className="flex flex-col justify-center w-full">
                <Link to="" className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"> Inicio </Link>
                <Link to="" className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid">Rutas</Link>
                <Link to="" className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid">About</Link>
                <Link to="" className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid">Contacto</Link>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

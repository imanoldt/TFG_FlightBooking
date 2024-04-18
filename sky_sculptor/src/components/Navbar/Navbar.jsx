import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../auth/AuthProvider";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const auth = useAuth();

  const showDropdown = () => {
    setDropdown(!dropdown);
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
                src="../public/logo_2.png"
                alt=""
              />
            </div>
          </div>
          <ul className="flex items-center xl:gap-12 gap-x-4 max-lg:hidden">
            <a
              href="#"
              className="leading-normal no-underline text-black font-bold text-lg hover:text-primary"
            >
              Inicio
            </a>
            <a
              href="#"
              className="leading-normal no-underline text-black font-bold text-lg hover:text-primary"
            >
              Rutas
            </a>
            <a
              href="#"
              className="leading-normal no-underline text-black font-bold text-lg hover:text-primary"
            >
              About
            </a>
            <a
              href="#"
              className="leading-normal no-underline text-black font-bold text-lg hover:text-primary"
            >
              Contacto
            </a>
            {auth && (
              <button className="flex items-center bg-primary rounded border shadow h-16 px-12 outline-none text-white hover:bg-white hover:text-primary cursor-pointer text-base transition-bg hover:border hover:border-primary">
                Mi Perfil {auth.getUser()?.userEmail}
              </button>
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
                <a
                  href="#"
                  className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                >
                  Inicio
                </a>
                <a
                  href="#"
                  className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                >
                  Rutas
                </a>
                <a
                  href="#"
                  className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                >
                  About
                </a>

                <a
                  href="#"
                  className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                >
                  Contacto
                </a>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

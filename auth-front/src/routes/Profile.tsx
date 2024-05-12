import  { useEffect, useRef, useState } from "react";
import DefaultLayoutTemplate from "../layout/DefaultLayoutTemplate";
import SidebarComponent from "../components/Profile/SidebarComponent";

import Buscador from "../components/Profile/Buscador";
import Mensajes from "../components/Profile/Mensajes";
import Perfil from "../components/Profile/Perfil";
import Configuracion from "../components/Profile/Configuracion";

const images = [
  "/images/barcelona/b1.jpg",
  "/images/barcelona/b1.jpg",
  "/images/barcelona/b1.jpg",
  "/images/barcelona/b1.jpg",
  "/images/barcelona/b1.jpg",
  "/images/barcelona/b1.jpg",
  "/images/barcelona/b1.jpg",
  "/images/barcelona/b1.jpg",
  "/images/barcelona/b1.jpg",
  "/images/barcelona/b1.jpg",
  
];

const Profile = () => {
  const containerRef = useRef(null);
  const [activeComponent, setActiveComponent] = useState('perfil');

  useEffect(() => {
    const container = containerRef.current;
    const scrollInterval = setInterval(() => {
      if (
        container.scrollLeft + container.offsetWidth <
        container.scrollWidth
      ) {
        container.scrollLeft += container.offsetWidth;
      } else {
        container.scrollLeft = 0;
      }
    }, 3000);
    return () => clearInterval(scrollInterval);
  }, []);

  const renderComponent = () => {
    switch(activeComponent) {
      case 'configuracion':
        return <Configuracion />;
      case 'perfil':
        return <Perfil />;
      case 'mensajes':
        return <Mensajes />;
      case 'rutas':
        return <Buscador />;
    }
  };




  return (
    <DefaultLayoutTemplate>
         <div className="container mx-auto px-4 lg:px-0">
         <div className="flex flex-row">
          <div className="w-1/4">
          <SidebarComponent setActiveComponent={setActiveComponent} />
          </div>
          <div className="w-3/4 ml-8">
          {renderComponent()}
          </div>
        </div>

         </div>


            <div
              className="overflow-hidden my-0 mx-auto flex rounded-2xl py-12"
              ref={containerRef}
            >
              {images.map((image, id) => (
                <img
                  key={id}
                  src={image}
                  alt=""
                  className="flex-none w-[270px] rounded-2xl mr-8"
                />
              ))}
            </div>
            

    </DefaultLayoutTemplate>
  );
};

export default Profile;

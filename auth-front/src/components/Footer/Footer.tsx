import {
  FaClock,
  FaLocationPin,
  FaPhone,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="bg-white py-16">
        <div className="max-w-[1400px] mx-auto grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 px-3">
          <div>
            <img src="publi2.png" alt="" />
          </div>
          <div>
            <h5 className="font-semibold text-2xl pb-8">Servicios</h5>
            <ul>
              <li className="hover:text-primary text-lg leading-10 cursor-pointer">
                Nuestros Destinos
              </li>
              <li className="hover:text-primary text-lg leading-10 cursor-pointer">
                Traquea tu Ruta
              </li>
              <li className="hover:text-primary text-lg leading-10 cursor-pointer">
                Galeria de Clientes
              </li>
              <li className="hover:text-primary text-lg leading-10 cursor-pointer">
              Perfil
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-2xl pb-8">Contactanos</h5>
            <ul>
              <span className="text-gray flex items-center pb-2 gap-2 lg:w-4/5">
                <FaPhone size={20} />
                <li className="leading-8">+34 603 690 529</li>
              </span>
              <span className="text-gray flex items-center pb-2 gap-2 lg:w-4/5">
                <FaClock size={20} />
                <li className="leading-8">
                  LUN - VIE 09:00 - 18:00 <br />
                  SAB 09:00 - 14:00 <br />
                  DOM Cerrado
                </li>
              </span>
              <span className="text-gray flex items-center pb-2 gap-2 lg:w-4/5">
                <FaLocationPin size={20} />
                <li className="leading-8">
                  Gurtubay Kalea, 1, 48013 Bilbao, Bizkaia
                </li>
              </span>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-2xl pb-8">Vosotros</h5>
            <div className="grid grid-cols-3 gap-2">
              <div className="overflow-hidden my-0 mx-auto rounded-lg w-full">
                <img
                  src="LPA.jpg"
                  alt=""
                  className="rounded-lg w-[90px] h-[90px] box-border hoverImg"
                />
              </div>
              <div className="overflow-hidden my-0 mx-auto rounded-lg w-full">
                <img
                  src="LPA.jpg"
                  alt=""
                  className="rounded-lg w-[90px] h-[90px] box-border hoverImg"
                />
              </div>
              <div className="overflow-hidden my-0 mx-auto rounded-lg w-full">
                <img
                  src="../public/LPA.jpg"
                  alt=""
                  className="rounded-lg w-[90px] h-[90px] box-border hoverImg"
                />
              </div>
              <div className="overflow-hidden my-0 mx-auto rounded-lg w-full">
                <img
                  src="../public/LPA.jpg"
                  alt=""
                  className="rounded-lg w-[90px] h-[90px] box-border hoverImg"
                />
              </div>
              <div className="overflow-hidden my-0 mx-auto rounded-lg w-full">
                <img
                  src="../public/LPA.jpg"
                  alt=""
                  className="rounded-lg w-[90px] h-[90px] box-border hoverImg"
                />
              </div>
              <div className="overflow-hidden my-0 mx-auto rounded-lg w-full">
                <img
                  src="../public/LPA.jpg"
                  alt=""
                  className="rounded-lg w-[90px] h-[90px] box-border hoverImg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-lightGray py-10 flex items-center text-center justify-center">
        <p className="px-3">
          SkySculptor© Copyright 2024. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

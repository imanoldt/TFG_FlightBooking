import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import "./Footer_2.css";

const Footer_2 = () => {
  const Year = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white">
      <div className="absolute top-0 left-0 w-[100%] overflow-hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
                        250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
                        3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="relative block h-[600px] fill-white"
          ></path>
        </svg>
        <div className="grid lg:grid-cols-3 gap-20 sm:grid-cols-1 p-20">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl text-purple-500">LOREM</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              illo quidem soluta fuga perspiciatis, voluptatibus, provident eius
              porro quia illum fugit saepe similique corporis praesentium
              dignissimos sint eos incidunt recusandae!
            </p>
          </div>

          <div>
            <li className="text-[22px] list-none font-semibold text-purple-500 py-2 uppercase">
              LOREM
            </li>
            <li className="my-4 list-none">Lorem-line</li>
            <li className="my-4 list-none">Lorem-line</li>
            <li className="my-4 list-none">Lorem-line</li>
          </div>

          <div className="mb-4 md:mb-0">
            <h2 className="text-[22px] font-semibold text-purple-500 py-2 uppercase">
              LOREM
            </h2>
            <p className="text-[16px] my-4">
              Email: imanol.duran@opendeusto.es
            </p>
            <p className="text-[16px] my-4">Phone: +34 603 69 05 29 </p>
            <div className="flex space-x-4">
              <a
                className="text-white hover:text-purple-500 transform hover:scale-150 
                            transition-all duration-150 ease-in-out"
                href=""
              >
                <FaGithub />
              </a>
              <a
                className="text-white hover:text-purple-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out"
                href=""
              >
                <FaLinkedinIn />
              </a>
              <a
                className="text-white hover:text-purple-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out"
                href=""
              >
                <FaTwitter />
              </a>
              <a
                className="text-white hover:text-purple-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out"
                href=""
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="h-full flex items-center justify-center mb-5">
            <form className="w-96 relative">
              <input
                type="email"
                placeholder=""
                className="w-full text-gray-800 p-4 h-10 rounded-full focus:outline-none 
                            focus:border border-purple-800"
              />
              <button
                type="Submit"
                className="bg-purple-400 px-8 py-2 rounded-full text-white
                                 absolute top-0 right-0"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <h6 className="text-center">&copy;opyright ImanolDt {Year}</h6>
      </div>
    </footer>
  );
};

export default Footer_2;

import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

type DefaultLayoutTemplateProps = {
  children: React.ReactNode; // Esta línea permite que el componente acepte children
};

const DefaultLayoutTemplate: React.FC<DefaultLayoutTemplateProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children} {/* Aquí es donde se renderizarán los componentes hijos */}
      <Footer />
    </>
  );
};

export default DefaultLayoutTemplate;

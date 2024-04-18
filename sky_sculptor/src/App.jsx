import React from "react";
import './index.css'


// Import components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Footer_2 from "./components/Footer/Footer_2";
import Hero from "./components/Hero/Hero";
import Featured from "./components/Featured/Featured";
import Package from "./components/Package/Package";



export default function App() {
  return (
    <>
     <Navbar />
     <Hero />
     <Package />
     {/*<Footer_2 />*/}
     {/*<Footer />*/}

     

    </>
  );
}
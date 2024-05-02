import { useAuth } from "../auth/AuthProvider";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Packages from "../components/Package/Package";
import Footer from "../components/Footer/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Hero />
      <Packages />
      <Footer />
    </>
  );
}

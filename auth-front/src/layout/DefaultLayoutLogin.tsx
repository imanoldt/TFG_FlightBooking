import Login from "../routes/Login";
import { motion } from "framer-motion";

export default function DefaultLayoutLogin() {
  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        scale: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        },
        rotate: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    }
  };

  const formVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="flex w-full h-screen">
      <motion.div 
        className="w-full flex items-center justify-center lg:w-1/2"
        initial="initial"
        animate="animate"
        variants={formVariants}
      >
        <Login />
      </motion.div>

      <div className="bg-[url('../public/bg1.jpg')] bg-no-repeat bg-cover bg-center hidden relative lg:flex h-full w-1/2 justify-center items-center ">
        <motion.div 
          className="lg:w-1/2 w-full flex justify-center items-center lg:justify-center lg:items-center lg:pt-0 pt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        >
          <motion.img 
            src="logo_sky.webp" 
            alt="SkySculptor Logo" 
            className="w-72 h-72 lg:w-96 lg:h-96" 
            variants={logoVariants}
            initial="initial"
            animate="animate"
          />
        </motion.div>
        <div className="flex justify-center items-center h-screen"></div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';

export default function Hero() {
    const logoVariants = {
        initial: { y: 0, rotate: 0 },
        animate: {
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                y: {
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

    const buttonVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } }
    };

    return (
        <motion.div 
            className="bg-[url('bg1.jpg')] bg-no-repeat bg-cover bg-center relative z-10 pb-32 overflow-x-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center px-3 pt-12">
                <div className="lg:w-1/2 w-full text-center lg:text-left">
                    <motion.h2 
                        className="xl:text-[4rem] lg:text-5xl text-4xl font-bold lg:leading-snug mb-5"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
                    >
                        Analiza tus rutas en un click
                    </motion.h2>
                    <motion.p 
                        className="text-gray text-lg leading-normal mb-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
                    >
                        SkySculptor se encarga de analizar tus rutas y te ofrece las mejores opciones para que puedas disfrutar de tus vacaciones. 
                    </motion.p>
                    <motion.div 
                        className="flex justify-center lg:justify-start gap-5"
                        initial="hidden"
                        animate="visible"
                        variants={buttonVariants}
                    >
                        <button className="bg-primary rounded border transition-bg shadow h-12 lg:px-10 lg:h-16 lg:w-auto w-full outline-none text-white hover:bg-white hover:text-primary cursor-pointer text-base hover:border hover:border-primary">
                            Empieza a Explorar
                        </button>
                        <button className="bg-white border rounded transition-bg shadow h-12 lg:px-10 lg:h-16 lg:w-auto w-full outline-none text-primary hover:bg-primary hover:text-white cursor-pointer text-base hover:border hover:border-primary">
                            Lee más
                        </button>
                    </motion.div>
                </div>
                <motion.div 
                    className="lg:w-1/2 w-full flex justify-center items-center lg:justify-center lg:items-center lg:pt-0 pt-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
                >
                    <motion.img 
                        src="logo_sky.webp" 
                        alt="SkySculptor Logo" 
                        className="w-56 h-56 lg:w-64 lg:h-64" 
                        variants={logoVariants}
                        initial="initial"
                        animate="animate"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

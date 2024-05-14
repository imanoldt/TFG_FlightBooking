import React from 'react';
import { motion } from 'framer-motion';
import DefaultLayoutTemplate from '../layout/DefaultLayoutTemplate';

const Contacto = () => {
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <DefaultLayoutTemplate>
            <div className="bg-gradient-to-b from-red-100 to-red-200 min-h-screen p-6 flex items-center justify-center">
                <motion.div
                    className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial="hidden"
                    animate="visible"
                >
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-4xl font-bold mb-6">Sobre Nosotros</h1>
                        <p className="text-lg text-gray-800 mb-6">
                            En SkySculptor, nos dedicamos a analizar y optimizar las rutas de viaje para ofrecer las mejores opciones a nuestros usuarios. Nuestra misión es hacer que los viajes sean más eficientes y agradables para todos. Con años de experiencia en el sector y un equipo de expertos apasionados por los viajes, estamos aquí para ayudarte a encontrar las mejores rutas y disfrutar de tus vacaciones al máximo.
                        </p>
                        <p className="text-lg text-gray-800 mb-6">
                            Nuestro equipo está compuesto por profesionales con una amplia trayectoria en la industria del turismo y la tecnología. Nos enorgullecemos de utilizar herramientas avanzadas de análisis de datos y algoritmos de optimización para ofrecer un servicio de alta calidad a nuestros usuarios. Creemos que viajar debe ser una experiencia placentera y sin complicaciones, y trabajamos arduamente para hacerlo posible.
                        </p>
                    </div>
                    <motion.div
                        className="p-6 bg-white rounded-lg shadow-md"
                        variants={formVariants}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-center">Contáctanos</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-gray-700">Nombre</label>
                                    <input type="text" className="mt-1 block w-full p-3 bg-gray-200 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <input type="email" className="mt-1 block w-full p-3 bg-gray-200 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Mensaje</label>
                                    <textarea className="mt-1 block w-full p-3 bg-gray-200 rounded-lg" rows={5}></textarea>
                                </div>
                            </div>
                            <div className="text-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-red-500 text-white py-3 px-6 rounded-lg font-semibold"
                                >
                                    Enviar
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </DefaultLayoutTemplate>
    );
};

export default Contacto;

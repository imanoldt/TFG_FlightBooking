export default function Hero() {
        return (
            <div className="bg-[url('../public/bg1.jpg')] bg-no-repeat bg-cover bg-center relative z-10 pb-32 overflow-x-hidden">
                <div className="lg:flex max-w-[1400px] mx-auto justify-between items-center px-3 pt-12">
                    <div className="lg:w-2/5">
                        <h2 className="xl:text-[4rem] lg:text-5xl text-4xl lg:text-left text-center font-bold lg:leading-snug mb-5">
                            Analiza tus rutas en un click
                        </h2>
                        <p className="text-gray text-lg leading-normal mb-8">
                            SkySculptor se encarga de analizar tus rutas y te ofrece las mejores opciones para que puedas disfrutar de tus vacaciones. 
                        </p>
                        <div className="flex flex-1 gap-5">
                            <button className="bg-primary rounded border transition-bg shadow h-12 lg:px-10 lg:h-16 lg:w-auto w-full outline-none text-white hover:bg-white hover:text-primary cursor-pointer text-base hover:border hover:border-primary">
                                Empieza a Explorar
                            </button>
                            <button className="bg-white border rounded transition-bg shadow h-12 lg:px-10 lg:h-16 lg:w-auto w-full outline-none text-primary hover:bg-primary hover:text-white cursor-pointer text-base hover:border hover:border-primary">
                                Lee más
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-3/5 flex items-center justify-end lg:pt-0 pt-10 lg:-mr-28">
                        <img src="../public/sky_logo.webp" alt="" className="w-[45rem] h-full" />

                    </div>
                </div>
            </div>
        );
    }
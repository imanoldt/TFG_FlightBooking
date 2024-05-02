import Card_photo from "../Concrete/Card_photo";

export default function Collage({ images, cityName }) {
  const safeImages = images.length >= 3 ? images : [];

  return (
    <div className="max-w-[1400px] mx-auto relative">
      <div className="w-full h-full">
        <p className="xl:text-[25rem] lg:text-[20rem] absolute top-0 left-0 w-full text-center z-[-1] text-gray font-semibold opacity-10 capitalize ">
          {cityName}
        </p>
      </div>

      <div className="px-3 lg:mt-0 mt-12">
        <div className="bg-white shadow-xl py-10 relative -top-16 z-10"></div>
        <div>
          <span className="flex flex-col items-center">
            <p className="text-primary font-bold capitalize tracking-[0.15em]">
              Ciudad de {cityName}
            </p>
            <h2 className="text-4xl text-center font-bold capitalize my-4">
              {cityName}
            </h2>
          </span>

          <div className="flex lg:flex-1 lg:flex-row flex-col gap-8 my-12 h-full">
            {/* Renderiza la primera imagen siempre que haya al menos una */}
            {safeImages.length > 0 && <Card_photo image={safeImages[0]} />}

            {/* Renderiza las segunda y tercera imagen en una columna si hay al menos tres */}
            {safeImages.length >= 3 && (
              <div className="flex flex-col gap-8">
                <Card_photo image={safeImages[1]} />
                <Card_photo image={safeImages[2]} />
              </div>
            )}

            {/* Renderiza la cuarta imagen, si está disponible */}
            {safeImages.length >= 4 && <Card_photo image={safeImages[3]} />}
          </div>
        </div>
      </div>
    </div>
  );
}

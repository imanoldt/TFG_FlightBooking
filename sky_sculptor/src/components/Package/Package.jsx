/* eslint-disable react/prop-types */
import { HiStar } from "react-icons/hi";

export default function Packages() {
    const Card = ({ image, text, accuracy, reviews, price }) => {
        return (
          <div>
            <div className="overflow-hidden my-0 mx-auto rounded-2xl">
              <img
                src={image}
                alt=""
                className="rounded-2xl w-[300px] h-[300px] hoverImg"
              />
            </div>
            <h5 className="text-2xl py-4 font-semibold">{text}</h5>
            <span className="flex items-center justify-between">
              <div className="bg-white text-gray shadow rounded-lg w-16 p-2 flex items-center gap-1">
                 {accuracy}<HiStar className="text-orange" />
              </div>
              <p>{reviews}</p>
              <div className="bg-primary cursor-pointer text-white text-lg text-center w-20 p-1 rounded-md transition-bg hover:bg-white hover:text-primary">
                {price}
              </div>
            </span>
          </div>
        );
      };

  return (
    <div>
      <div className="bg-lightGray my-16 py-16 relative">
        <div className="max-w-[1400px] mx-auto px-3">
          <span className="flex flex-col items-center">
            <p className="text-primary font-bold capitalize tracking-[0.15em]">
              Las más populares
            </p>
            <h2 className="text-4xl text-center font-bold capitalize my-4">
              Nuestras Rutas
            </h2>
          </span>
          <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 my-12 relative z-10">
            <Card
              image="./public/Mad.jpg"
              text="Madrid"
              accuracy={9.8}
              reviews="España"
              price="≈ 50 €"
            />
            <Card
              image="./public/Sev.jpg"
              text="Sevilla"
              accuracy={8.8}
              reviews="España"
              price="≈ 80 €"
            />
            <Card
              image="./public/Par.webp"
              text="Paris"
              accuracy={9.5}
              reviews="España"
              price="≈ 160 €"
            />
            <Card
              image="/public/LPA.jpg"
              text="Las Palmas"
              accuracy={2.8}
              reviews="España"
              price="≈ 200 €"
            />
          </div>
        </div>
        <img
          src="../public/star.png"
          alt=""
          className="lg:block hidden absolute -top-16 left-0"
        />
        <img
          src="../public/doughnut_3.png"
          alt=""
          className="lg:block hidden absolute -bottom-16 left-0"
        />
        <img
          src="../public/flower.png"
          alt=""
          className="lg:block hidden absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
}

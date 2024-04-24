
import Card from "../Concrete/Card.jsx";

export default function Packages() {
  
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
          <Card image="./public/Mad.jpg" text="Madrid" accuracy={9.8} reviews="España" price="≈ 50 €" />
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

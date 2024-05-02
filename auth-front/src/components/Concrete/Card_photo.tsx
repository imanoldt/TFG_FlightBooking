interface CardPhotoProps {
    image: string;
}

const Card_photo = ({ image }: CardPhotoProps) => {
    return (
        <div className="relative overflow-hidden my-0 mx-auto rounded-2xl">
            <img src={image} className="h-full w-full rounded-2xl hoverImg" />
        </div>
    );
};

export default Card_photo;

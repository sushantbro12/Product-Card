import React, { useEffect, useState } from "react";
import "./product.css";

const ProductCard = ({
  id,
  title,
  image,
  description,
  price,
  isFavourite,
  onHandleFavourite,
}) => {
  const [isFav, setIsFav] = useState(isFavourite);

  const handleFavourite = () => {
    const newFavState = !isFav;
    setIsFav(newFavState);
    onHandleFavourite(id, title, image, description, price, newFavState);
  };

  useEffect(() => {
    setIsFav(isFavourite);
  }, [isFavourite]);

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h1>{title}</h1>
      <p id="price">${price}</p>
      <p>{description}</p>
      <p>
        <button
          onClick={handleFavourite}
          style={{ background: isFav ? "red" : "black" }}>
          {isFav ? "Remove from Favourite" : "Add to Favourite"}
        </button>
      </p>
    </div>
  );
};

export default ProductCard;

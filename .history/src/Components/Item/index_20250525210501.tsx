
import { useState } from "react";
import { Rating } from "../Rating";
import { ButtonCTA } from "../ButtonCTA";
import { ItemProps } from "./types";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Item: React.FC<ItemProps> = ({
  id,
  name,
  category,
  price,
  rate,
  image,
  dispatch,
  added,
  isFavorite,
  description,
  city,
  featuredText,

}): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const images = Array.isArray(image) ? image : [image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);

  const handleNavigate = () => {
    dispatch({
      type: "MOVING",
      payload: { current: `/products/${name}`, history: window.location.pathname },
    });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    navigate(`/products/${name}`);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch("http://localhost:3000/api/trpc/restaurant.addFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Body:", errorBody);
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const result = await response.json();
      if (!result || !result.result || !result.result.data || typeof result.result.data.isFavorite === 'undefined') {
        console.error("Unexpected API response structure:", result);
        throw new Error("Unexpected API response structure");
      }

      const updatedItem = result.result.data;
      setLocalIsFavorite(updatedItem.isFavorite);
      dispatch({
        type: "TOGGLE_FAVORITE",
        payload: { id, isFavorite: updatedItem.isFavorite },
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="Item">
      <div className="Item__thumbnail" onClick={handleNavigate}>
        <img src={images[currentImageIndex]} alt={name} />
        <button
          onClick={toggleFavorite}
          className={`Item__favorite-button ${localIsFavorite ? "Item__favorite-button--active" : ""}`}
          aria-label={localIsFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={localIsFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
        <div className="Item__nav-buttons">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToImage(index);
              }}
              className={`Item__nav-button ${
                currentImageIndex === index ? "Item__nav-button--active" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="Item__body">
        {featuredText && (
          <p className="Item__featured">
           ✨ <span>{featuredText}</span> 
          </p>
        )}
        <div className="Item__name-rating">
           <h2>{name}</h2>
         <Rating content={rate} />
         
        </div>
        {description && <p className="Item__description">{description}</p>}
        <p className="Item__meta">
          <span>{category}</span>
          <span className="Item__separator">•</span>
          <span>{city}</span>
          <span className="Item__separator">•</span>
          <span>{price}</span>
        </p>
      </div>
    </div>
  );
};
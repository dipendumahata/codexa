import React, { useState } from "react";
import BuyNowButton from "./BuyNowButton";
import "./PriceOptions.css";

const PriceOptions = ({ project }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleSelect = (price) => {
    setSelectedPrice(price);
  };

  return (
    <div className="price-options">
      <div
        onClick={() => handleSelect(199)}
        className={selectedPrice === 199 ? "selected" : ""}
      >
        ₹199<br />Project Files
      </div>

      <div
        onClick={() => handleSelect(99)}
        className={selectedPrice === 99 ? "selected" : ""}
      >
        ₹99<br />Video Tutorial
      </div>

      <div
        onClick={() => handleSelect(Number(project.price))}
        className={selectedPrice === Number(project.price) ? "selected" : ""}
      >
        ₹{project.price}<br />Bundle (Project + Video)
      </div>

      {selectedPrice && (
        <BuyNowButton project={{ ...project, price: selectedPrice }} />
      )}
    </div>
  );
};

export default PriceOptions;

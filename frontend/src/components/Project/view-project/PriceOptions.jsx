import React from "react";
import "./PriceOptions.css";

const PriceOptions = ({ price }) => {
  return (
    <div className="price-options">
      <div>₹199<br/>Project Files</div>
      <div>₹99<br/>Video Tutorial</div>
      <div>₹249<br/>Bundle</div>
      <button className="purchase-btn">PURCHASE</button>
    </div>
  );
};

export default PriceOptions;

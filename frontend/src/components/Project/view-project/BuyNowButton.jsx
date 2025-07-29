// BuyNowButton.jsx
import React from "react";
import axios from "axios";

function BuyNowButton({ project }) {
  const handlePayment = async () => {
    try {
      // 🔥 1. Send selected price to backend
      const { data } = await axios.post(
        "/api/payment/create-order",
        { amount: project.price },
        { withCredentials: true }
      );

      // 🔥 2. Razorpay config
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Set in .env file
        amount: data.amount,
        currency: data.currency,
        name: "CodeBazaar",
        description: `Purchase: ${project.title}`,
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful!");

          // 🔥 3. Trigger ZIP download
          const fileName = `${project._id}.zip`;
          window.location.href = `/downloads/${fileName}`;
        },
        theme: { color: "#0F172A" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <button className="purchase-btn" onClick={handlePayment}>
      Purchase Now ₹{project.price}
    </button>
  );
}

export default BuyNowButton;

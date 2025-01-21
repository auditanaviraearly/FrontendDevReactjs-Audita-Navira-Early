import React from "react";

const RestaurantCard = ({ restaurant }) => {
  // Fungsi untuk menghasilkan bintang
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-star ${i <= rating ? "fas" : "far"}`}
          style={{ color: i <= rating ? "#ffc107" : "#e4e5e9", marginRight: 2 }}
        ></i>
      );  
    }
    return stars;
  };

  return (
    <div className="restaurant-card">
      <img src={restaurant.photo} alt={restaurant.name} />
      <h3>{restaurant.name}</h3>
      <div className="rating">{renderStars(restaurant.rating)}</div>
      <p>Category: {restaurant.categories}</p>
      <p>Price: {restaurant.price}</p>
      <p>Status: {restaurant.isOpen ? "Open Now" : "Closed"}</p>
    </div>
  );
};

export default RestaurantCard;

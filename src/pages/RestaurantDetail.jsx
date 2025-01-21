import React from "react";
import { useParams } from "react-router-dom";

const RestaurantDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Restaurant Detail</h1>
      <p>Details for restaurant ID: {id}</p>
      {/* Tambahkan elemen lainnya seperti ulasan */}
    </div>
  );
};

export default RestaurantDetail;
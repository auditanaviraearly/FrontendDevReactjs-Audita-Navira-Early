import React, { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]); // Data restoran
  const [visibleCount, setVisibleCount] = useState(10); // Jumlah restoran yang ditampilkan
  const [isOpen, setIsOpen] = useState(false); // Filter for open now
  const [price, setPrice] = useState(""); // Filter for price (low, high)
  const [categories, setCategories] = useState([]); // Filter for categories

  // Fetch data from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "https://678fd07b49875e5a1a937757.mockapi.io/api/restaurant/restaurants"
        );
        const data = await response.json();
        console.log("Data fetched:", data);
        setRestaurants(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  // Function to show more restaurants
  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 10); // Add 10 more restaurants
  };

  // Function to apply filters
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Filter based on Open Now status
    const matchesOpenNow = isOpen ? restaurant.isOpen : true;

    // Filter based on price
    const matchesPrice = price ? restaurant.price === price : true;

    // Filter based on categories
    const matchesCategory =
      categories.length > 0
        ? categories.some((category) => restaurant.categories.includes(category))
        : true;

    return matchesOpenNow && matchesPrice && matchesCategory;
  });

  // Handle the Open Now filter toggle
  const handleOpenNowClick = () => {
    setIsOpen(!isOpen);
  };

  // Handle Price filter change
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Handle Category filter click
  const handleCategoryClick = (category) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  // Handle Clear All filters
  const handleClearAll = () => {
    setIsOpen(false);
    setPrice("");
    setCategories([]);
  };

  return (
    <div className="homepage">
      <h1>Restaurants</h1>
      <p>Lorem ipsum dolor sit amet...</p>

      {/* Filter Section */}
      <div className="filters">
        <h4>Filters: </h4>
        <button onClick={handleOpenNowClick}>
          {isOpen ? "Open Now" : "Close Now"}
        </button>
        <select onChange={handlePriceChange}>
          <option value="">Price</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        
        {/* Categories Filter Buttons */}
        <button onClick={() => handleCategoryClick("categories")}>Categories</button>

        {/* Add more categories as needed */}
        <button onClick={handleClearAll}>Clear All</button>
      </div>

      {/* Restaurant List */}
      <div className="restaurant-list">
        {filteredRestaurants.slice(0, visibleCount).map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredRestaurants.length && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default HomePage;

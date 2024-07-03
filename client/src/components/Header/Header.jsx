import "./Header.css";

const Header = () => {
  return (
    <div className="header" id="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Welcome to FoodDelivery, your go-to app for ordering delicious meals
          from your favorite restaurants. Enjoy quick, reliable delivery
          straight to your doorstep.
        </p>
        <button>
          {" "}
          <a href="#explore-menu">View Menu</a>
        </button>
      </div>
    </div>
  );
};

export default Header;

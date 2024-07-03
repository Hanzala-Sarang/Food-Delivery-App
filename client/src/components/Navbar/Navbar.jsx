import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menuActive, setMenuActive] = useState("Home");

  const { getTotalCartAmount, token, setToken, user, setUser } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken("");
    setUser("");
    toast.success("Logged out successfully");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          className={menuActive === "Home" ? "active" : ""}
          onClick={() => setMenuActive("Home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={menuActive === "Menu" ? "active" : ""}
          onClick={() => setMenuActive("Menu")}
        >
          Menu
        </a>
        <a
          href="#app-download"
          className={menuActive === "MobileApp" ? "active" : ""}
          onClick={() => setMenuActive("MobileApp")}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          className={menuActive === "ContactUs" ? "active" : ""}
          onClick={() => setMenuActive("ContactUs")}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin((prev) => !prev)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <div className="profile">
              {" "}
              <img src={assets.profile_icon} alt="" />
              <p className="p-name">{user.name}</p>
            </div>

            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/my-orders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

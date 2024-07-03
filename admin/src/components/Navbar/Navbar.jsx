import "./Navbar.css";
import { assets } from "../../assets/admin_assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <img src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  const url = "http://localhost:4500";
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (token) {
      await axios.post(
        `${url}/api/cart/add-to-cart`,
        { itemId },
        { headers: { token } }
      );
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
      toast.success("Item added to cart successfully");
    } else {
      toast.error("Please login to add items in the cart ");
      setShowLogin(true);
    }
  };

  const removeFromCart = async (itemId) => {
    if (token) {
      await axios.post(
        `${url}/api/cart/remove-from-cart`,
        { itemId },
        { headers: { token } }
      );
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const getCartItems = async (token) => {
    try {
      if (token) {
        const response = await axios.post(
          `${url}/api/cart/get-cart`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData);
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items. Please try again.");
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Failed to fetch food list. Please try again.");
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      if (sessionStorage.getItem("token")) {
        setToken(sessionStorage.getItem("token"));
        await getCartItems(sessionStorage.getItem("token"));
      }
    }
    loadData();
  }, [token, setToken]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    user,
    setUser,
    showLogin,
    setShowLogin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

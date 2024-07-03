import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeliveryDetails((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    console.log(orderItems);

    let orderData = {
      address: deliveryDetails,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(`${url}/api/order/place-order`, orderData, {
      headers: { token },
    });

    console.log(response);

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error(response.data.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      toast.error("Please add items to proceed");
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            value={deliveryDetails.firstName}
            name="firstName"
            placeholder="First name"
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={deliveryDetails.lastName}
            placeholder="Last name"
            required
          />
        </div>
        <input
          type="email"
          onChange={onChangeHandler}
          value={deliveryDetails.email}
          name="email"
          placeholder="Email address"
          required
        />
        <input
          type="text"
          onChange={onChangeHandler}
          value={deliveryDetails.street}
          name="street"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={deliveryDetails.city}
            placeholder="City"
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            value={deliveryDetails.state}
            name="state"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            value={deliveryDetails.postalcode}
            name="postalcode"
            placeholder="Postal code"
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            value={deliveryDetails.country}
            name="country"
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          onChange={onChangeHandler}
          value={deliveryDetails.phone}
          name="phone"
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() && 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

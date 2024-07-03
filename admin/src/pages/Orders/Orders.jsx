import { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/all-orders`);

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error("No Orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const updateStatusHandler = async (e, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: e.target.value,
    });

    if (response.data.success) {
      toast.success("Order status updated successfully.");
      await fetchAllOrders();
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} X {item.quantity}
                    {index !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <div className="order-item-name">
                <p>
                  {order.address.firstName} {order.address.lastName}
                </p>
              </div>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}
                </p>
              </div>
              <div className="order-item-phone">
                <p>{order.address.phone}</p>
              </div>
            </div>
            <p>Items : {order.items.length}</p>
            <p> Amount: ${order.amount}</p>
            <select
              onChange={(e) => updateStatusHandler(e, order._id)}
              value={order.status}
              name="order-status"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

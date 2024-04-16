import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/orders';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const orders = useSelector(state => state.orders);
  const totalPriceArray = orders.map(singleOrder => {
    const totalPrice = (singleOrder.items).reduce((total, item) => {
      return total + (item.quantity * item.shoeId.price);
    }, 0)

    return totalPrice
  })

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchOrders(currentUser._id));
    }
  }, [dispatch, currentUser]);

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="order-history">
        <h2>Order History</h2>
        {orders.map((order, index) => (
          <div key={order._id} className="order">
            <div className="order-details">
              <h3>Order #: {order._id}</h3>
              <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <ul className="order-items">
              {order.items.map(item => (
                <li key={item._id} className="order-item">
                  <h4>{item.quantity} x {item.size}</h4>
                  <div className="shoe-details">
                    <img className="shoe-image" src={`http://localhost:5000/images/${item.shoeId.photoUrl}`} alt={item.shoeId.name} />
                    <div className="shoe-info">
                      <h5>{item.shoeId.name}</h5>
                      <p>Price: ${item.shoeId.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="total-price">Total Price: ${totalPriceArray[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/orders';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const orders = useSelector(state => state.orders);
  const orderArray = Object.values(orders);
  const totalPriceArray = orderArray.map(singleOrder => {
    const totalPrice = Object.values(singleOrder.items).reduce((total, item) => {
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
    <div>
      <h1>Profile Page</h1>
      <h2>Order History</h2>
      <ul>
        {orderArray.map((order, index) => (
          <li key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  <h4>{item.quantity} x {item.size}</h4>
                  <div className="shoe-details">
                    <img src={`http://localhost:5000/images/${item.shoeId.photoUrl}`} alt={item.shoeId.name} />
                    <h5>{item.shoeId.name}</h5>
                    <p>Price: ${item.shoeId.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p>Total Price: ${totalPriceArray[index]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;


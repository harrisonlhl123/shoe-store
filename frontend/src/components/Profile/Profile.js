import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/orders';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const orders = useSelector(state => state.orders);

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
        {orders.map(order => (
          <li key={order._id}>
            {/* Display order details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;

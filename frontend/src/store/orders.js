import jwtFetch from './jwt';

// Action types
const FETCH_ORDERS = 'orders/FETCH_ORDERS';
const CREATE_ORDER = 'orders/CREATE_ORDER';

// Action creators
const fetchOrdersAction = (orders) => ({
  type: FETCH_ORDERS,
  payload: orders,
});

const createOrderAction = (order) => ({
    type: CREATE_ORDER,
    payload: order,
});
  

// Thunks
export const fetchOrders = (userId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/orders/user/${userId}`);
    if (res.ok) {
      const orders = await res.json();
      dispatch(fetchOrdersAction(orders));
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};


export const createOrder = (cartItems, userId) => async (dispatch) => {
    try {
      const res = await jwtFetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userId, items: cartItems }),
      });
      if (res.ok) {
        const order = await res.json();
        dispatch(createOrderAction(order));
        return order; // Return the created order for further processing if needed
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
};

// Initial state
const initialState = [];

// Reducer
const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
        return action.payload;
    case CREATE_ORDER:
        return [...state, action.payload]; // Add the created order to the existing orders array
    default:
        return state;
  }
};

export default ordersReducer;

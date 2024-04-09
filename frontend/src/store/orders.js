import jwtFetch from './jwt';

// Action types
const FETCH_ORDERS = 'orders/FETCH_ORDERS';

// Action creators
const fetchOrdersAction = (orders) => ({
  type: FETCH_ORDERS,
  payload: orders,
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

// Initial state
const initialState = [];

// Reducer
const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return action.payload;
    default:
      return state;
  }
};

export default ordersReducer;

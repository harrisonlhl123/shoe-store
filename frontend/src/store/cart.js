import jwtFetch from './jwt';

// Action types
const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const SET_CART = 'cart/SET_CART';
const DELETE_CART = 'cart/DELETE_CART';

// Action creators
const addToCartAction = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

const removeFromCartAction = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

const setCartAction = (cart) => ({
  type: SET_CART,
  payload: cart,
});

const deleteCartAction = (id) => ({
  type: DELETE_CART,
  payload: id,
})

// Thunks
export const addToCart = (shoeId, size, userId) => async (dispatch) => {
    try {
      const res = await jwtFetch('/api/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userId, items: [{ shoeId, size, quantity: 1 }] }),
      });
  
      if (res.ok) {
        const cart = await res.json();
        dispatch(addToCartAction(cart));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
};
  

export const removeFromCart = (itemId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/cart/shoes/${itemId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      const cart = await res.json();
      dispatch(removeFromCartAction(cart));
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

export const fetchCart = (userId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/cart/user/${userId}`);

    if (res.ok) {
      const cart = await res.json();
      dispatch(setCartAction(cart));
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

export const deleteCart = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/cart/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      dispatch(deleteCartAction(id));
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

// Initial state
const initialState = null;

// Reducer
const cartReducer = (state = initialState, action) => {
    let newState = {...state}

    switch (action.type) {
        case ADD_TO_CART:
        case REMOVE_FROM_CART:
        case SET_CART:
          return action.payload;
        case DELETE_CART:
          delete newState[action.payload]
          return newState
        default:
            return state;
  }
};

export default cartReducer;

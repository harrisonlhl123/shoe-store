import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart, removeFromCart, deleteCart } from "../../store/cart";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchShoe, fetchShoes } from "../../store/shoes";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './CartShow.css';

const CartShow = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchCart(user._id))
    }, []);

    const cart = useSelector(state => state.cart?.items)
    const cartId = useSelector(state => state.cart?._id)

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId))
        .then(() => {
            // Refetch cart items after removing an item
            dispatch(fetchCart(user._id));
        })
    };

    const handleDeleteCart = () => {
        dispatch(deleteCart(cartId))
        .then(() => {
            dispatch(fetchCart(user._id));
            history.push('/thanks');
        })
    }

    // Calculate total price
    const totalPrice = cart && Object.values(cart).reduce((total, item) => {
        return total + (item.quantity * item.shoeId.price);
    }, 0);
    
    return (
        <div className="cart-container"> {/* Add a container class */}
            <h1>My Cart</h1>
            {cart && Object.values(cart).length === 0 ? (
                <p>Cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cart && Object.values(cart).map(item => (
                        <div key={item._id} className="cart-item"> {/* Add a class for each cart item */}
                            <div className="item-details">
                                <h3>{item.quantity} x {item.size}</h3>
                                <div className="shoe-details"> {/* Add a class for shoe details */}
                                    <img src={`http://localhost:5000/images/${item.shoeId.photoUrl}`} alt={item.shoeId.name} />
                                    <h4>{item.shoeId.name}</h4>
                                    <p>Price: ${item.shoeId.price}</p>
                                </div>
                            </div>
                            <button className="remove-button" onClick={() => handleRemoveFromCart(item._id)}>Remove</button> {/* Add a class for the remove button */}
                        </div>
                    ))}
                    <p>Total Price: ${totalPrice}</p>
                    <button onClick={handleDeleteCart}>Checkout</button>
                </div>
            )}
        </div>
    );
}

export default CartShow;

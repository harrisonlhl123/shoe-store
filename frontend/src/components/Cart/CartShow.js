import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart, removeFromCart } from "../../store/cart";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchShoe, fetchShoes } from "../../store/shoes";
import './CartShow.css';

const CartShow = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchCart(user._id))
    }, []);

    const cart = useSelector(state => state.cart?.items)

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId))
        .then(() => {
            // Refetch cart items after removing an item
            dispatch(fetchCart(user._id));
        })
    };
    
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
                                <ShoeDetails shoeId={item.shoeId._id} />
                            </div>
                            <button className="remove-button" onClick={() => handleRemoveFromCart(item._id)}>Remove</button> {/* Add a class for the remove button */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const ShoeDetails = ({ shoeId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchShoes());
    }, [])

    const shoe = useSelector(state => state.shoes ? state.shoes[shoeId] : null)

    return (
        <div className="shoe-details"> {/* Add a class for shoe details */}
            <img src={`http://localhost:5000/images/${shoe?.photoUrl}`} alt={shoe?.name} />
            <h4>{shoe?.name}</h4>
            <p>Price: ${shoe?.price}</p>
        </div>
    );
}

export default CartShow;

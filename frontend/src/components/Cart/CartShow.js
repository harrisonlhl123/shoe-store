import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../store/cart";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchShoe, fetchShoes } from "../../store/shoes";

const CartShow = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchCart(user._id))
    }, []);

    const cart = useSelector(state => state.cart?.items)
    
    return (
        <div>
            <h1>Cart Show page</h1>
            <div>
                {cart && Object.values(cart).map(item => (
                    <div key={item._id}>
                        <h3>{item.quantity} x {item.size}</h3>
                        <ShoeDetails shoeId={item.shoeId._id} />
                    </div>
                ))}
            </div>
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
        <div>
            {/* <img src={`http://localhost:5000/images/${shoe?.photoUrl}`} alt={shoe?.name} /> */}
            <h4>{shoe?.name}</h4>
            <p>Price: ${shoe?.price}</p>
        </div>
    );
}

export default CartShow;

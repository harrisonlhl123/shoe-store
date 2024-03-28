import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../store/cart";
import { useSelector } from "react-redux/es/hooks/useSelector";


const CartShow = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchCart(user._id))
    }, [])


    return (
        <h1>Cart Show page</h1>
    )
}

export default CartShow;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/cart";

const Thanks = () => {
    return (
        <h1>Thank you for your order!</h1>
    )
}

export default Thanks;
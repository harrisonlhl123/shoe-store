import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoes } from "../../store/shoes";
import OneShoe from "./OneShoe";


function AllShoes() {
    const dispatch = useDispatch();
    const shoes = useSelector(state => Object.values(state.shoes));

    useEffect(() => {
        dispatch(fetchShoes());
    }, [])

    return (
        <>
            {shoes.map((shoe) => {
                <OneShoe shoe={shoe}/>
            })}
        </>
    )

}

export default AllShoes;
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchShoe } from "../../store/shoes";

function OneShoe({shoe}) {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchShoe(shoeId));
    // }, [])

    return (
        <>
            <h3>{shoe.name}</h3>
            <img src={`${shoe.photoUrl}`} />
            <p>{shoe.description}</p>
        </>
    )
}

export default OneShoe;
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchShoe } from "../../store/shoes";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './OneShoe.css';

function OneShoe({shoe}) {
    return (
        <>
            <div id="one-shoe-container">
                <Link to={`/shoes/${shoe._id}`} className="links">
                    <img id="shoe-image" src={`http://localhost:5000/images/${shoe.photoUrl}`} />
                    <div id="show-page-text">
                        <h3>{shoe.name}</h3>
                        <h3>${shoe.price}</h3>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default OneShoe;

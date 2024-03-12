import './ShoeShow.css'
const { useEffect, useState } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { useParams } = require("react-router-dom/cjs/react-router-dom.min");
const { fetchShoes } = require("../../store/shoes");


const ShowShoe = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState(null);
    
    useEffect(() => {
        dispatch(fetchShoes());
    }, [id])
    
    const shoe = useSelector(state => state.shoes ? state.shoes[id] : null)

    // Function to handle adding the shoe to the cart
    const handleAddToCart = () => {
        // Add logic here to handle adding the shoe to the cart
        // You can dispatch an action to update the cart state
        console.log('Shoe added to cart:', shoe);
    }

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    }

    const sizes = Array.from({ length: 19 }, (_, index) => (index + 8) / 2);

    return (
        <div id="show-main-div">
            <div id="right-side-show">
                <img src={`http://localhost:5000/images/${shoe?.photoUrl}`} alt={shoe?.name} />
                {shoe?.description}
            </div>
            <div id="left-side-show">
                <h2>{shoe?.name}</h2>
                <p>${shoe?.price}</p>
                <div id="size-selection">
                    <h3>Select Size:</h3>
                    <div className="size-grid">
                        {sizes.map((size, index) => (
                            <button
                                key={index}
                                className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                <br></br>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ShowShoe;
import './ShoeShow.css'
const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { useParams } = require("react-router-dom/cjs/react-router-dom.min");
const { fetchShoes } = require("../../store/shoes");


const ShowShoe = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    useEffect(() => {
        dispatch(fetchShoes());
    }, [id])
    
    const shoe = useSelector(state => state.shoes ? state.shoes[id] : null)

    return (
        <>
            <div id="show-main-div">
                <div id="right-side-show">
                    <img src={`http://localhost:5000/images/${shoe?.photoUrl}`} />
                    {shoe?.description}
                </div>
                <div id="left-side-show">
                    {shoe?.name}
                    <br></br>
                    {shoe?.price}
                    {/* sizes and cart button */}
                </div>
            </div>
        </>
    )
}

export default ShowShoe;
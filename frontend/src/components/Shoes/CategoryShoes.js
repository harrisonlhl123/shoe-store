import { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchCategoryShoes } from "../../store/shoes";
import OneShoe from "./OneShoe";
import './CategoryShoes.css';

const CategoryShoes = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch()
    const categoryShoes = useSelector((state) => state.shoes ? Object.values(state.shoes) : [])

    useEffect(() => {
        dispatch(fetchCategoryShoes(categoryId))
    }, [])

    return (
        <div id="category-shoes">
            {categoryShoes.map((shoe) => {
                return <OneShoe key={shoe._id} shoe={shoe} />
            })}
        </div>
    )
}

export default CategoryShoes;
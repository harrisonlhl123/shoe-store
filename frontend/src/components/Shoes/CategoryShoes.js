import { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchCategoryShoes } from "../../store/shoes";

const CategoryShoes = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch()
    const categoryShoes = useSelector((state) => state.shoes ? Object.values(state.shoes) : [])
    useEffect(() => {
        dispatch(fetchCategoryShoes(categoryId))
    }, [])

    return (
        <>
            {categoryShoes.map((shoe) => {
                return shoe.name
            })}
        </>
    )
}

export default CategoryShoes;
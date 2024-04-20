import OneCategory from './OneCategory';
import './CategoriesIndex.css';
const { useEffect } = require("react")
const { useDispatch, useSelector } = require("react-redux");
const { fetchCategories } = require("../../store/categories");

const CategoriesIndex = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories ? Object.values(state.categories) : []);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    return (
        <>
            <div id="categories-main">
                {categories.map((category) => {
                    return <OneCategory category={category} />
                })}
            </div>
        </>
    )
}

export default CategoriesIndex;
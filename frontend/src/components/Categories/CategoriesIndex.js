import OneCategory from './OneCategory';
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
            {categories.map((category) => {
                return <OneCategory category={category} />
            })}
        </>
    )
}

export default CategoriesIndex;
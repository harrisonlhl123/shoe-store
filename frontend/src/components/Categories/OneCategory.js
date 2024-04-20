import { Link } from 'react-router-dom';
const OneCategory = ({category}) => {
    return (
        <>
            <Link to={`/categories/${category._id}`}>
                <h3>{category.name}</h3>
            </Link>
        </>
    )
}
export default OneCategory;
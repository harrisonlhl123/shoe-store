import { Link } from 'react-router-dom';
import './OneCategory.css';

const OneCategory = ({category}) => {
    return (
        <>
            <Link id='category-link' to={`/categories/${category._id}`}>
                <h3>{category.name}</h3>
            </Link>
        </>
    )
}
export default OneCategory;
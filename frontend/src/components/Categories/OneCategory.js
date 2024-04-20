import { Link } from 'react-router-dom';
import './OneCategory.css';

const OneCategory = ({category}) => {
    return (
        <>
            <div id='one-category'>
                <Link id='category-link' to={`/categories/${category._id}`}>
                    <h3>{category.name}</h3>
                </Link>
            </div>
        </>
    )
}
export default OneCategory;
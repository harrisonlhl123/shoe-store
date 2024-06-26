import jwtFetch from './jwt';

const RECEIVE_CATEGORIES = 'categories/RECEIVE_CATEGORIES';

const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
})

export const fetchCategories = () => async (dispatch) => {
    try {
        const res = await jwtFetch('/api/categories/');
    
        if (res.ok) {
            const categories = await res.json();
            dispatch(receiveCategories(categories));
        }
    } catch (error) {
        console.log('Error fetching categories:', error);
    }
}

const categoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return {...action.categories};
        default:
            return state;
    }
}

export default categoriesReducer;
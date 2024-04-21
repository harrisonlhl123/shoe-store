import jwtFetch from './jwt';

const RECEIVE_SHOES = "shoes/RECEIVE_SHOES";
const RECEIVE_SHOE = "shoes/RECEIVE_SHOE";
const RECEIVE_CATEGORY_SHOES = "shoes/RECEIVE_CATEGORY_SHOES";

const receiveShoes = shoes => ({
    type: RECEIVE_SHOES,
    shoes
});

const receiveShoe = shoe => ({
    type: RECEIVE_SHOE,
    shoe
});

const receiveCategoryShoes = (categoryId) => ({
    type: RECEIVE_CATEGORY_SHOES,
    categoryId
});

export const fetchShoes = () => async dispatch => {
    const res = await jwtFetch('/api/shoes/');
    if (res.ok) {
        const shoes = await res.json();
        dispatch(receiveShoes(shoes));
    }
};

export const fetchShoe = (shoeId) => async dispatch => {
    const res = await jwtFetch(`/api/shoes/${shoeId}`);
    if (res.ok) {
        const shoe = await res.json();
        dispatch(receiveShoe(shoe));
    }
};

export const fetchCategoryShoes = (categoryId) => async dispatch => {
    const res = await jwtFetch(`/api/shoes/category/${categoryId}`);
    if (res.ok) {
        const shoes = await res.json();
        dispatch(receiveCategoryShoes(shoes));
    }
};


export const searchShoes = (searchQuery) => async dispatch => {
    const res = await jwtFetch(`/api/shoes/lookup/search?name=${searchQuery}`);
    if (res.ok) {
        const shoes = await res.json();
        return shoes;
    }
};


const shoesReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case RECEIVE_SHOES:
            return {...action.shoes}
        case RECEIVE_SHOE:
            return {...newState, [action.shoe._id]: action.shoe}
        case RECEIVE_CATEGORY_SHOES:
            return {...action.categoryId}
        default:
            return state
    }
}

export default shoesReducer;
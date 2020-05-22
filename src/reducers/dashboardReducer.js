import {
    FETCH_ALL_BRANDS_SUCCESS,
    FETCH_USER_FOLLOWING_BRANDS_SUCCESS,
    SET_SELECTED_BRAND,
    SET_GIFT,
    FETCH_BRAND_FOLLOWING_USERS_SUCCESS,
    GIFTING_SUCCESS
} from '../actions';

const initialState = {
    allBrands: [],
    followingBrands: [],
    selectedBrand: {},
    gift: {},
    allUsers: []
};


export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BRAND_FOLLOWING_USERS_SUCCESS:
            return {
                ...state,
                allUsers: action.payload
            };

        case FETCH_ALL_BRANDS_SUCCESS:
            return {
                ...state,
                allBrands: action.payload
            };

        case FETCH_USER_FOLLOWING_BRANDS_SUCCESS:
            return {
                ...state,
                followingBrands: action.payload
            };

        case SET_SELECTED_BRAND:
            return {
                ...state,
                selectedBrand: action.payload
            };

        case SET_GIFT:
            return {
                ...state,
                gift: action.payload
            };

        case GIFTING_SUCCESS:
            const user = JSON.parse(localStorage.getItem('user'));
            user.brand.max_lp = user.brand.max_lp - action.payload[0].lp
            localStorage.setItem('user', JSON.stringify(user))
            return {
                ...state
            };
            
        default:
            return state;
    }
}

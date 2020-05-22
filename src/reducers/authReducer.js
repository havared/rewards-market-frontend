import {
    TRY_USER_LOGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REDIRECT
} from '../actions';

const initialState = {
    user: {},
    isLoading: false,
    redirectTo: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case REDIRECT:
            return {
                ...state,
                redirectTo: action.payload
            };

        case TRY_USER_LOGIN:
            return {
                ...state,
                isLoading: true
            };

        case LOGIN_USER_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                user: {...action.payload},
                isLoading: false
            };

        case LOGIN_USER_FAILURE:
            return {
                user: {},
                isLoading: false
            };

        default:
            return state;
    }
}

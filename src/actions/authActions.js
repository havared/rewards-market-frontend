import {
    TRY_USER_LOGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    TRY_USER_SIGNUP,
    REDIRECT
} from './';

export const tryLogin = (payload) => ({
    type: TRY_USER_LOGIN,
    payload
});

export const loginSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});

export const loginFailure = () => ({
    type: LOGIN_USER_FAILURE
});

export const redirect = (link) => {
  return { type: REDIRECT, payload: link };
};

export const trySignup = (payload) => {
  return { type: TRY_USER_SIGNUP, payload };
};

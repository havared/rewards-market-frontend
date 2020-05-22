import { ajax } from 'rxjs/ajax';
import {  of } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, mergeMap, concatMap, catchError } from 'rxjs/operators';

import authHeader from './authHeader';

import {
    TRY_USER_LOGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    TRY_USER_SIGNUP,
    REDIRECT
} from '../actions';

const url = 'http://localhost:8000';

const loginSuccess = payload => ({ type: LOGIN_USER_SUCCESS, payload });
const redirect = (link) => ({ type: REDIRECT, payload: link });

export const tryUserLogin = action$ => action$.pipe(
    ofType(TRY_USER_LOGIN),
    mergeMap(action => ajax({
        url: `${url}/user/signin`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            ...action.payload
        }
    })
    .pipe(
        concatMap(({ response }) => of(
              loginSuccess(response),
              redirect(response.user_type === 0 ?'/user/dashboard': '/brand')
          )),
        catchError(error => of({
            type: LOGIN_USER_FAILURE
        }))
    ))
);

export const tryUserSignup = action$ => action$.pipe(
    ofType(TRY_USER_SIGNUP),
    mergeMap(action => ajax({
        url: `${url}/user/signup`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            ...action.payload
        }
    })
    .pipe(
        map(({ response }) => redirect('/signin')),
        catchError(error => of({
            type: LOGIN_USER_FAILURE
        }))
    ))
);

import { ajax } from 'rxjs/ajax';
import { of, interval } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, mergeMap, switchMap, catchError, concatMap, takeUntil } from 'rxjs/operators';
import authHeader from './authHeader';

import {
    FETCH_ALL_BRANDS,
    FETCH_ALL_BRANDS_SUCCESS,
    FETCH_USER_FOLLOWING_BRANDS,
    FETCH_USER_FOLLOWING_BRANDS_SUCCESS,
    USER_FOLLOW_BRANDS,
    USER_FOLLOW_BRANDS_SUCCESS,
    GET_GIFT,
    SET_GIFT,
    CLAIM_GIFT,
    SET_SELECTED_BRAND,
    GET_BRAND,
    STOP_POLL,
    START_POLL,
    FETCH_BRAND_FOLLOWING_USERS_SUCCESS,
    FETCH_BRAND_FOLLOWING_USERS,
    GIFT_USERS,
    GIFTING_SUCCESS,
    LOGIN_USER_FAILURE
} from '../actions';

const url = 'http://localhost:8000';
const user = JSON.parse(localStorage.getItem('user'));

const allBrandsSuccess = payload => ({ type: FETCH_ALL_BRANDS_SUCCESS, payload });
const fetchFollowingBrandsSuccess = payload => ({ type: FETCH_USER_FOLLOWING_BRANDS_SUCCESS, payload });
const followBrandsSuccess = payload => ({ type: USER_FOLLOW_BRANDS_SUCCESS, payload });
const setGift = payload => ({ type: SET_GIFT, payload });
const setBrand = payload => ({ type: SET_SELECTED_BRAND, payload });
const startPoll = payload => ({ type: START_POLL, payload });
const brandFollowersSuccess = payload => ({ type: FETCH_BRAND_FOLLOWING_USERS_SUCCESS, payload });
const giftingSuccess = payload => ({ type: GIFTING_SUCCESS, payload});

export const giftBrandFollowersEpic = action$ => action$.pipe(
  ofType(GIFT_USERS),
  mergeMap(action =>
      ajax({
          url: `${url}/brand/${action.payload.brand_id}/gift`,
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              ...authHeader()
          },
          body: {
              ...action.payload
          }
      })
      .pipe(
          map(({response}) => giftingSuccess(action.payload.gifts)),
          catchError(error => of({
              type: LOGIN_USER_FAILURE
          })),
      )
  )
);

export const fetchBrandFollowersEpic = action$ => action$.pipe(
  ofType(FETCH_BRAND_FOLLOWING_USERS),
  mergeMap(action =>
      ajax({
          url: `${url}/brand/${action.payload}/followers`,
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              ...authHeader()
          }
      })
      .pipe(
          map(({response}) => brandFollowersSuccess(response.followers)),
          catchError(error => of({
              type: LOGIN_USER_FAILURE
          })),
      )
  )
);

export const fetchAllBrandsEpic = action$ => action$.pipe(
  ofType(FETCH_ALL_BRANDS),
  mergeMap(action =>
      ajax({
          url: `${url}/brands`,
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              ...authHeader()
          }
      })
      .pipe(
          map(({response}) => allBrandsSuccess(response.allBrands)),
          catchError(error => of({
              type: LOGIN_USER_FAILURE
          })),
      )
  )
);

export const fetchFollowingBrandsEpic = (action$) => action$.pipe(
  ofType(FETCH_USER_FOLLOWING_BRANDS),
  mergeMap(action =>
      ajax({
          url: `${url}/user/${user.id}/brands`,
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              ...authHeader()
          }
      })
      .pipe(
          map(({response}) => fetchFollowingBrandsSuccess(response.brands)),
          catchError(error => of({
              type: LOGIN_USER_FAILURE
          })),
      )
  )
);

export const followBrandsEpic = (action$) => action$.pipe(
  ofType(USER_FOLLOW_BRANDS),
  mergeMap(action =>
      ajax({
          url: `${url}/user/${user.id}/follow-brands`,
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              ...authHeader()
          },
          body: {
              ...action.payload
          }
      }).pipe(
          map(({response}) => followBrandsSuccess(response)),
          catchError(error => of({
              type: LOGIN_USER_FAILURE
          })),
      )
  )
);

export const getBrandEpic = (action$) => action$.pipe(
  ofType(GET_BRAND),
  mergeMap(action =>
      ajax({
          url: `${url}/brand/${action.payload}`,
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              ...authHeader()
          }
      }).pipe(
          map(({response}) => setBrand(response.brand)),
          catchError(error => of({
              type: LOGIN_USER_FAILURE
          })),
      )
  )
);

export const getGiftEpic = (action$, state$) => action$.pipe(
      ofType(GET_GIFT),
      mergeMap(action =>
          ajax({
              url: `${url}/user/${user.id}/brand/${action.payload}/gift`,
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  ...authHeader()
              }
          }).pipe(
              concatMap(({ response }) => of(
                    setGift(response.lp),
                    startPoll({ brand_id: response.lp.brand_id})
                )),
                catchError(error => of({
                    type: LOGIN_USER_FAILURE
                })),
          )
      )
);

export const pollGiftEpic = (action$, state$) => action$.pipe(
  ofType(START_POLL),
  switchMap(() => interval(60000)),
  takeUntil(action$.ofType(STOP_POLL)),
  mergeMap(action =>
      ajax({
          url: `${url}/user/${user.id}/brand/${state$.value.DashboardStore.selectedBrand.id}/gift`,
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              ...authHeader()
          },
          body: {
              ...action.payload
          }
      }).pipe(
          map(({response}) => setGift(response.lp)),
          catchError(error => of({
              type: LOGIN_USER_FAILURE
          })),
      )
  )
);

export const claimGiftEpic = (action$) => action$.pipe(
  ofType(CLAIM_GIFT),
  mergeMap(action =>
      ajax({
          url: `${url}/user/${user.id}/brand/${action.payload.brand_id}/claim`,
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              ...authHeader()
          },
          body: {
              ...action.payload
          }
      }).pipe(
          map(({response}) => setGift(response.lp)),
          catchError(error => of({
              type: LOGIN_USER_FAILURE
          })),
      )
  )
);

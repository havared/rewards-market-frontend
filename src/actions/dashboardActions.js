import {
    FETCH_ALL_BRANDS,
    FETCH_USER_FOLLOWING_BRANDS,
    USER_FOLLOW_BRANDS,
    SET_SELECTED_BRAND,
    CLAIM_GIFT,
    GET_GIFT,
    GET_BRAND,
    STOP_POLL,
    FETCH_BRAND_FOLLOWING_USERS,
    GIFT_USERS
} from './';

export const giftUsers = (payload) => ({
    type: GIFT_USERS,
    payload
});

export const fetchBrandFollowingUsers = (payload) => ({
    type: FETCH_BRAND_FOLLOWING_USERS,
    payload
});

export const stopPoll = () => ({
    type: STOP_POLL
});

export const fetchAllBrands = () => ({
    type: FETCH_ALL_BRANDS
});

export const fetchFollowingBrands = () => ({
    type: FETCH_USER_FOLLOWING_BRANDS
});

export const followBrands = (payload) => ({
    type: USER_FOLLOW_BRANDS,
    payload
});

export const setSelectedBrand = (payload) => ({
    type: SET_SELECTED_BRAND,
    payload
});

export const getGift = (payload) => ({
    type: GET_GIFT,
    payload
});

export const claimRewardPoints = (payload) => ({
    type: CLAIM_GIFT,
    payload
});

export const getBrand = (payload) => ({
    type: GET_BRAND,
    payload
});

import { combineEpics } from 'redux-observable';

import {
    tryUserLogin,
    tryUserSignup
} from './login';

import {
    fetchAllBrandsEpic,
    fetchFollowingBrandsEpic,
    followBrandsEpic,
    claimGiftEpic,
    getGiftEpic,
    getBrandEpic,
    pollGiftEpic,
    fetchBrandFollowersEpic,
    giftBrandFollowersEpic
} from './dashboard';

export default combineEpics(
    tryUserLogin,
    tryUserSignup,
    fetchAllBrandsEpic,
    fetchFollowingBrandsEpic,
    followBrandsEpic,
    claimGiftEpic,
    getGiftEpic,
    getBrandEpic,
    pollGiftEpic,
    fetchBrandFollowersEpic,
    giftBrandFollowersEpic
);

import { combineReducers } from 'redux';
import { default as AuthStore} from './authReducer';
import { default as DashboardStore} from './dashboardReducer';

const appReducer = combineReducers({
    AuthStore,
    DashboardStore
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;

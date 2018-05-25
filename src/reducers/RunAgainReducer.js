/*This reducer is used in src/components/Map.js, 
src/components/FavoriteListItem.js
src/components/ListItem.js to handle
the waypoints if a user wants to run a route again.*/

import { RUN_AGAIN, RUN_AGAIN_MODE } from '../actions/types';

const INITIAL_STATE = { wayPoints: '', runAgainMode: false };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case RUN_AGAIN:
            return { ...state, wayPoints: action.payload};
        case RUN_AGAIN_MODE:
            return { ...state, runAgainMode: action.payload};
        default:
            return state;
    }
};
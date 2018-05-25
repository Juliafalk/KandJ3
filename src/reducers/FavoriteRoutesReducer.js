/*This reducer is used in src/components/FavoritePage.js to fetch the user's routes
from the database that are marked as favorites, the list is also reversed
to display the runs with the latest one on top of the rendered list*/

import { FAVORITE_ROUTES_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FAVORITE_ROUTES_FETCH_SUCCESS:
            
            var favObject = {};
            var keys = [];
            for (var key in action.payload) {
                keys.push(key);
            }

            keys.reverse();
            
            for (var i = 0; i<keys.length; i++){
                var value = action.payload[keys[i]];
                if (value.favorite === true){
                favObject[keys[i]]=value;
                }
            }
            return favObject;
        default:
            return state;
    }
};
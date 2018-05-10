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
            console.log(favObject)
            return favObject;
        default:
            return state;
    }
};
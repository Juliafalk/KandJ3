import { ROUTES_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ROUTES_FETCH_SUCCESS:
            //return { ...state, [id]: action.payload };
            var newObject = {};
            var keys = [];
            for (var key in action.payload) {
                keys.push(key);
            }
            keys.reverse();
            for (var i = 0; i<keys.length; i++){
                var value = action.payload[keys[i]];
                newObject[keys[i]]=value;
            }
        
            return newObject;
        default:
            return state;
    }
};
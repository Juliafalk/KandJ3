import { LAST_ROUTE_FETCH } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LAST_ROUTE_FETCH: 
            var newObject = {};
            var keys = [];
            for (var key in action.payload) {
                keys.push(key);
            }
            keys.reverse();

            
            var value = action.payload[keys[0]]
            newObject[keys[0]]= value;
           
            return newObject;
        
        default:
            return state;
    }
};
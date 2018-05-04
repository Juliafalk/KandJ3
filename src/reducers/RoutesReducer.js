import { ROUTES_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ROUTES_FETCH_SUCCESS:
            //return { ...state, [id]: action.payload };
            return action.payload;
        default:
            //console.log(action)
            return state;
    }
}; 
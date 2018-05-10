import { RUN_AGAIN } from '../actions/types';

//const INITIAL_STATE = {};
const INITIAL_STATE = { wayPoints: ''};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case RUN_AGAIN:
            //console.log(action.payload)
            return { ...state, wayPoints: action.payload};
            //return action.payload;
        default:
            return state;
    }
}; 
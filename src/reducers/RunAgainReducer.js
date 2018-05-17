import { RUN_AGAIN, RUN_AGAIN_MODE } from '../actions/types';

//const INITIAL_STATE = {};
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
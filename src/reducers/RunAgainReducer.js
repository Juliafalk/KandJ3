import { RUN_AGAIN, START_BUTTON } from '../actions/types';

//const INITIAL_STATE = {};
const INITIAL_STATE = { wayPoints: '', startButton: true };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case RUN_AGAIN:
            return { ...state, wayPoints: action.payload};
        case START_BUTTON:
            return { ...state, startButton: action.payload};
        default:
            return state;
    }
}; 
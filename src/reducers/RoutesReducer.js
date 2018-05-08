import { 
    ROUTES_FETCH_SUCCESS,
    RUN_AGAIN
} from '../actions/types';

const INITIAL_STATE = {
    db: '',
    wayPoints: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ROUTES_FETCH_SUCCESS:
            //return { ...state, [id]: action.payload };
            console.log(action.payload)
            return action.payload;
        case RUN_AGAIN:
            //return { ...state, [id]: action.payload };
            return action.payload.wayPoints;
        default:
            //console.log(action)
            return state;
    }
};  
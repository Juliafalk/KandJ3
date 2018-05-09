import { combineReducers } from 'redux';
import RoutesReducer from './RoutesReducer'
import RunAgainReducer from './RunAgainReducer'

export default combineReducers({
    routes: RoutesReducer,
    runAgain: RunAgainReducer
 }); 
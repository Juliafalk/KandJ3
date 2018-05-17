import { combineReducers } from 'redux';
import RouteReducer from './RoutesReducer';
import LastRouteReducer from './LastRouteReducer';
import FavoriteRoutesReducer from './FavoriteRoutesReducer';
import RunAgainReducer from './RunAgainReducer'

export default combineReducers({
    routes: RouteReducer,
    lastRoute: LastRouteReducer,
    favRoutes: FavoriteRoutesReducer,
    runAgain: RunAgainReducer
 });
 
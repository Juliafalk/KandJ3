import { combineReducers } from 'redux';
import RouteReducer from './RoutesReducer';
import LastRouteReducer from './LastRouteReducer';
import FavoriteRoutesReducer from './FavoriteRoutesReducer';

export default combineReducers({
    routes: RouteReducer,
    lastRoute: LastRouteReducer,
    favRoutes: FavoriteRoutesReducer,
 });
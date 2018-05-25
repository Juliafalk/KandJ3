/*This file imports all reducers and collects then all in
the same place to make the handling of them easier*/

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
 
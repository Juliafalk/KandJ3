import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {StartPage, TheMap} from './components/StartPage';
import MapPage from './components/MapPage';
import LogPage from './components/LogPage';
import FavoritePage from './components/FavoritePage';

const RouterComponent = () => {
    return( 
        <Router>
            <Scene key = "root">
                <Scene key = "login" component={MapPage} title="Please Login" initial/>
            </Scene>
        </Router>
    );
};

export default RouterComponent;

/*
                <Scene key = "createAccount" component={LogPage} title="Please Login"/>
                <Scene key = "mapView" component={LogPage} title="Please Login"/>
                <Scene key = "summaryPage" component={LogPage} title="Please Login"/>
                <Scene key = "logPage" component={LogPage} title="Please Login"/>
                <Scene key = "favorites" component={LogPage} title="Please Login"/>
                <Scene key = "login" component={LogPage} title="Please Login"/>
*/
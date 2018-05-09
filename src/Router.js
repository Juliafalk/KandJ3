import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import StartPage from './components/StartPage';
import MapPage from './components/MapPage';


const RouterComponent = () => {
    return(
        <Router>
            <Scene key = "root">
                <Scene 
                key = "login" 
                component={MapPage} 
                //title="Please Login"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
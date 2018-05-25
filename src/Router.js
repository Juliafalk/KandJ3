/*This file handles the different views that the user 
can navigate between. Using react native router flux 
makes it really easy to navigate between the different pages.
*/

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Icon } from 'native-base';
import StartPage from './components/StartPage';
import CreateAccount from './components/CreateAccount';
import { CustomDrawerContentComponent } from './App';
import Map from './components/Map';
import LogPage from './components/LogPage';
import FavoritePage from './components/FavoritePage';
import InfoScreen from './components/InfoScreen';
import SummaryPage from './components/SummaryPage';
import WaitingPage from './components/WaitingPage';

var sceneConfig = {
    headerStyle: {
        backgroundColor: '#7785ad',
    },
    titleStyle: {
        color: 'white',
        fontSize: 20
    },
}

const RouterComponent = () => {
    return( 
        <Router>
            <Scene key = "root" {...sceneConfig}>
                <Scene initial={true} hideNavBar={true} key="waitPage" component={WaitingPage}/>
                <Scene hideNavBar={true} key="login" component={StartPage}/>
                <Scene hideNavBar={true} key="createAccount" component={CreateAccount}/>
                <Scene hideNavBar={true} key="sideMenu" drawer={true} drawerIcon={<Icon name="ios-menu" style={{color: "white"}}/>}contentComponent={CustomDrawerContentComponent}>
                    <Scene key="Map" title="Map" component={Map}/>
                    <Scene key="Log" title="My Log" component={LogPage}/>
                    <Scene key="Favorites" title="Favorites" component={FavoritePage}/>
                    <Scene key="Info" title="Information" component={InfoScreen}/>
                </Scene>
                <Scene hideNavBar={true} key="summary" component={SummaryPage}/>
            </Scene>
        </Router>
    );
};

export default RouterComponent;

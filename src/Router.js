import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Icon } from 'native-base';
import StartPage from './components/StartPage';
import CreateAccount from './components/CreateAccount';
import { CustomDrawerContentComponent } from './App';
import Map from './components/Map';
import LogPage from './components/LogPage';
import FavoritePage from './components/FavoritePage';
import SettingsScreen from './components/SettingsScreen';
import SummaryPage from './components/SummaryPage';
import WaitingPage from './components/WaitingPage';

//Summary scence just for working.
const RouterComponent = () => {
    return( 
        <Router>
            <Scene key = "root">
                
                <Scene initial={true} hideNavBar={true} key="waitPage" component={WaitingPage}/>
                <Scene hideNavBar={true} key="login" component={StartPage}/>
                <Scene hideNavBar={true} key="createAccount" component={CreateAccount}/>
                <Scene  hideNavBar={true} key="sideMenu" drawer={true} drawerIcon={<Icon name="ios-menu"/>}contentComponent={CustomDrawerContentComponent}>
                    <Scene key="Map" title="Map" component={Map}/>
                    <Scene key="Log" title="Log" component={LogPage}/>
                    <Scene key="Favorites" title="Favorites" component={FavoritePage}/>
                    <Scene key="Settings" title="Settings" component={SettingsScreen}/>
            
                    <Scene key="Summary" component={SummaryPage}/>

                </Scene>
                <Scene hideNavBar={true} key="summary" component={SummaryPage}/>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
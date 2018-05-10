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

const RouterComponent = () => {
    return( 
        <Router>
            <Scene key = "root">
                <Scene initial={true} hideNavBar={true} key="login" component={StartPage}/>
                <Scene hideNavBar={true} key="createAccount" component={CreateAccount}/>
                <Scene  hideNavBar={true} key="sideMenu" drawer={true} drawerIcon={<Icon name="ios-menu"/>}contentComponent={CustomDrawerContentComponent}>
                    <Scene key="Map" title="Map" component={Map}/>
                    <Scene key="Log" title="Log" component={LogPage}/>
                    <Scene key="Favorites" title="Favorites" component={FavoritePage}/>
                    <Scene key="Settings" title="Settings" component={SettingsScreen}/>
                </Scene>
                <Scene hideNavBar={true} key="summary" component={SummaryPage}/>
            </Scene>
        </Router>
    );
};

/*navigationBarStyle={styles.headerStyle}

const styles = {
    headerStyle: {
        backgroundColor: '#7785ad',
        color: 'white'
    }
}*/

export default RouterComponent;

/*
                <Scene key = "createAccount" component={LogPage} title="Please Login"/>
                <Scene key = "mapView" component={LogPage} title="Please Login"/>
                <Scene key = "summaryPage" component={LogPage} title="Please Login"/>
                <Scene key = "logPage" component={LogPage} title="Please Login"/>
                <Scene key = "favorites" component={LogPage} title="Please Login"/>
                <Scene key = "login" component={LogPage} title="Please Login"/>
*/
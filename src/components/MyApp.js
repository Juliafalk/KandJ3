import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import firebase from 'firebase';
import StartPage from './StartPage';
import MapPage from './MapPage';
import LogPage from './LogPage';
import FavoritePage from './FavoritePage';
import SettingsScreen from './SettingsScreen';
import WaitingPage from './WaitingPage';
import { DrawerNavigator, DrawerItems, SwitchNavigator } from 'react-navigation';
import { Container, Content, Header, Body  } from 'native-base';

const MyApp = DrawerNavigator({
    Map: {
        screen: MapPage
    },
    Log: {
        screen: LogPage
    },
    Favorites: {
        screen: FavoritePage
    },
    Settings: {
        screen: SettingsScreen
    },
}, {
    initialRouteName: 'Map',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    
});

const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{ height: 200, backgroundColor: 'white' }}>
            <Body>
                <Image
                style={styles.drawerImage}
                source={require('./Runit_logo.png')}/>
            </Body>
        </Header>
        <Content>
            
            <DrawerItems {...props}/>
        </Content>
    </Container>
);

export default MyApp;

styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75
    }
}); 


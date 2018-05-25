/*The core of the application. Checks if the user is logged in and
shows either LoginPage.js or Map.js at first. It then shows the 
specified page when the user is navigating using Router.js*/

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { DrawerItems } from 'react-navigation';
import {  
    Container, 
    Content, 
    Header, 
    Body, 
    Footer, 
    Button, 
    FooterTab
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import reducers from './reducers';
import StartPage from './components/StartPage';
import Map from './components/Map';
import LogPage from './components/LogPage';
import FavoritePage from './components/FavoritePage';
import InfoScreen from './components/InfoScreen';
import WaitingPage from './components/WaitingPage'
import Router from './Router';
import { Actions } from 'react-native-router-flux';

const store = createStore(reducers , {}, applyMiddleware(ReduxThunk))

class App extends React.Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyA8Iv39d5bK-G9xmvsbOMRHBv7QFa8710g",
            authDomain: "lasttry-1523359687064.firebaseapp.com",
            databaseURL: "https://lasttry-1523359687064.firebaseio.com",
            projectId: "lasttry-1523359687064",
            storageBucket: "lasttry-1523359687064.appspot.com",
            messagingSenderId: "529796294332"
          });
        
            //Checks if the user is already logged in 
            firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    loggedIn() {
        if (this.state.loggedIn){
            Actions.Map();
        }
        else if(this.state.loggedIn === false){
            Actions.login();
        }
    };
    
    render()  {
        return(
            <Provider store={ store }>
                <Router>
                    {this.loggedIn()};
                </Router>
            </Provider>
        );
    }
}

//Side menu - this is called from Router.js
export const CustomDrawerContentComponent = (props) => (
    <Container >
        <Header style={{ height: 200 }}>
            <Body>
                <ImageBackground style={styles.drawerImage} blurRadius= {7} 
                source={require('./components/images/bredTrack.jpg')}>
                <Text style={otherStyles.sideImage}>runRouter</Text>
                </ImageBackground>
            </Body>
        </Header>
        <Content style={{ backgroundColor: '#5c688c' }}>
            <DrawerItems {...props} 
            inactiveTintColor='white'
            activeTintColor='white'
            activeBackgroundColor= '#7785ad'/>
        </Content>
        <Footer style={{ backgroundColor: '#7785ad' }}>
            <FooterTab>
                <Button onPress={() => Logout()}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white'}}>  Log Out  </Text>
                </Button>
            </FooterTab>
        </Footer>
    </Container>
)

function Logout() {
    firebase.auth().signOut()
    Actions.login();
}

const styles = {
    drawerImage: {
        height: 215,
        width: 280,
        borderRadius: 75
    }
},

otherStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    sideImage: {
        fontSize: 25, 
        fontWeight: 'bold', 
        color: 'white', 
        alignSelf: 'center', 
        marginTop: '35%' 
    }
})

export default App;

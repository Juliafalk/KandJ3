/*This it the file that calls the StartPage. 
Later in the progress an if-state could be usefull here, to decide
if startpage or map should be shown direct (like if the user already is signed in)
/ JF (11/4)
*/
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import {  
    Container, 
    Content, 
    Header, 
    Body, 
    Footer, 
    Button, 
    Icon,
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
        
          //Event handler that accpet a function
          //When user sign in or out, the function will be called
          //Sign in, user is user, sign out user is NULL or undefined
          //Event handler for either sign in or sign out. 
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
            //Just to navigate to Summary while working on that page
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

//JL 9/5: används i router till drawer scene
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

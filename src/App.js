/*This it the file that calls the StartPage. 
Later in the progress an if-state could be usefull here, to decide
if startpage or map should be shown direct (like if the user already is signed in)
/ JF (11/4)
*/
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import StartPage from './components/StartPage';
import MapPage from './components/MapPage';
import LogPage from './components/LogPage';
import FavoritePage from './components/FavoritePage';
import SettingsScreen from './components/SettingsScreen';
import WaitingPage from './components/WaitingPage'
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

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return(
                <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
                >
                <Container>
                <MyApp /> 
                
                 </Container>
                </KeyboardAwareScrollView>);
            case false:
                return <StartPage />;
            default:
                return <WaitingPage />;
        }
    }

    render()  {

        
        return(
            <Provider store={ store }>
            <Container>
           {this.renderContent()};    
           </Container>
           </Provider>
        );
    }
}



const CustomDrawerContentComponent = (props) => (
    <Container >
        <Header style={{ height: 200, backgroundColor: 'white' }}>
            <Body>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black' }}>runRouter</Text>
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
               
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white'}}>  Log out  </Text>
                
            </Button>
            </FooterTab>
        </Footer>
    </Container>
)

function Logout() {
    firebase.auth().signOut()
}

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
    drawerToggleRoute: 'DrawerToggle' 
    
})

const styles = {

};
export default App;


otherStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

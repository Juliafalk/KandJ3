/*This it the file that calls the StartPage. 
Later in the progress an if-state could be usefull here, to decide
if startpage or map should be shown direct (like if the user already is signed in)
/ JF (11/4)
*/
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import firebase from 'firebase';
import StartPage from './components/StartPage';
import MapPage from './components/MapPage';
import LogPage from './components/LogPage';
import FavoritePage from './components/FavoritePage';
import SettingsScreen from './components/SettingsScreen';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Content, Header, Body, Icon } from 'native-base';

class App extends React.Component {

    state = { loggedIn: false };

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
                return <MyApp />;
            case false:
                return <StartPage />;
            default:
                return <Spinner size="large" />;
        }
    }

    render()  {
        return(
            <Container>
           {this.renderContent()};    
           </Container>
        );
    }
}

//layout on sidemenu/ JG 13/4 
const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{ height: 200, backgroundColor: 'white' }}>
            <Body>
                <Image
                style={styles.drawerImage}
                source={require('./components/Runit_logo.png')}/>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props}/>
        </Content>
    </Container>
)

/*Sidemenu with directions to which page if clicking on an option
InitialRouteName is which page to start on when calling MyApp/JG 13/4 */
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

export default App;

//style for the side menu/ JG 13/4
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
})

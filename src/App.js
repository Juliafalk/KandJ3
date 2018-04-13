/*This it the file that calls the StartPage. 
Later in the progress an if-state could be usefull here, to decide
if startpage or map should be shown direct (like if the user already is signed in)
/ JF (11/4)
*/
import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import firebase from 'firebase';
import StartPage from './components/StartPage';
import MapPage from './components/MapPage';
import WaitingPage from './components/WaitingPage';

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

    componentDidMount () {
        console.log('didMount')
        console.log(this.state)
    }

    renderContent() {
        console.log('content')
        console.log(this.state.loggedIn)
        switch(this.state.loggedIn) {
            case true:
                return <MapPage />;
            case false:
                return <StartPage />;
            default:
                return <WaitingPage />;
        }
    }

    render()  {
        return(
            <View>
           {this.renderContent()};    
           </View>
        );
    }
}
export default App;

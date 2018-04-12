/*This it the file that calls the StartPage. 
Later in the progress an if-state could be usefull here, to decide
if startpage or map should be shown direct (like if the user already is signed in)
/ JF (11/4)
*/
import React, { Component } from 'react';
import StartPage from './components/StartPage';
import Map from './components/Map';
import { Card } from './components/common';
import firebase from 'firebase';
import { View } from 'react-native'; 


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
                return (
                    <Card>
                        <Map />
                    </Card>
                );
            case false:
                return <StartPage />;
            default:
                return <Spinner size="large" />;
        }
    }
    render()  {
        return(
            <View>
            {this.renderContent()}
            </View>
        );    
    }
}
export default App;

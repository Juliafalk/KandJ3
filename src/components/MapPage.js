/*This page shows the map including signed out button.
The side menu/sidebar shall later be pleace ot this side. 
Then the button will be placed on the side bar*/

import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import Map from './Map';
import { Button, Header } from './common';

class MapPage extends React.Component {
    
    //Button to sign out. 
    onButtonPress() {
        firebase.auth().signOut()
    }
    
    render() {
        console.log(this.state)
        return (
        <View>
            <Header headerText="Happy running <3" />
            <View style={{
            height: '80%',
            paddingBottom: 10}}>
            <Map />
            </View>
            <View style={{ height: '7%'}}>
            <Button onPress={this.onButtonPress.bind(this)}>
                <Text>Log out</Text>
            </Button>
            </View>
        </View>
        );
    }
}

export default MapPage;
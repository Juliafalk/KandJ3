/*This page shows the map including signed out button.
The side menu/sidebar shall later be pleace ot this side. 
Then the button will be placed on the side bar*/

import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import Map from './Map';
import { MyButton, MyHeader } from './common';
import { Icon, Header, Left, Title, Body, Right } from 'native-base';

class MapPage extends React.Component {
    
    //Button to sign out. 
    onButtonPress() {
        firebase.auth().signOut()
    }
    
    render() {
        console.log(this.state)
        return (
        <View>
            <Header>
                <Left>
                    <Icon name='ios-menu' onPress={() =>
                        this.props.navigation.navigate('DrawerOpen')}/>
                </Left>
                <Body>
                    <Title>Map</Title>
                </Body>
                <Right />
            </Header>
            <View>
                <Map />
            </View>
        </View>
        );
    }
}

export default MapPage;


//this log out button should be on the side menu
/*

                <View style={{ height: '7%'}}>
                <MyButton onPress={this.onButtonPress.bind(this)}>
                    <Text>Log out</Text>
                </MyButton>
            </View>

*/
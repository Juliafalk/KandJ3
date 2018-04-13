/*This page shows the map including signed out button.
The side menu/sidebar shall later be pleace ot this side. 
Then the button will be placed on the side bar*/

import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import Map from './Map';
import { MyButton, MyHeader } from './common';
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right, Footer, FooterTab } from 'native-base';


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
                    <Icon name='ios-menu'/>
                </Left>
                <Body>
                    <Title>Happy Running!</Title>
                </Body>
                <Right />
            </Header>
            <View style={{
            height: '80%',
            paddingBottom: 10}}>
            <Map />
            </View>
            <View style={{ height: '7%'}}>
            <MyButton onPress={this.onButtonPress.bind(this)}>
                <Text>Log out</Text>
            </MyButton>
            </View>
        </View>
        );
    }
}

export default MapPage;
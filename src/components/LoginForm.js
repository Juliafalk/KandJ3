import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
//import firebase from 'firebase';
import { Button, Card, CardSection, Header } from './common';
import Map from './Map';


class StartScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    render() {
        return (
        <View>
            <Header headerText="runRouter" />
            <Text> Let do this </Text>
                <CardSection>
                    <Button onPress={this.login}> Login </Button> 
                </CardSection>
                <CardSection>
                    <Text>Or..</Text>
                </CardSection>
                <CardSection>
                    <Button onPress={this.CreateAccount}> Create a new account </Button>
                </CardSection>
            </View>
        );

    }

    CreateAccount = () => {
        this.props.navigation.navigate('CreateAccount');
    };
}

class CreateAccountScreen extends React.Component {
    static navigationOptions = {
        title: 'CreateAccount'
    }; 

    render () {
        return (
        <View>
            <Header headerText="Create Account" />
            <Text>Create a new account</Text>
            <CardSection>
                <Button onPress={this.GoBack}>Go back</Button>
                <Button onPress={this.SeeMap}>MapView</Button>
            </CardSection>
        </View>
        );
    }

    GoBack =() => {
            this.props.navigation.navigate('Home');
    } 

    SeeMap = () => {
        this.props.navigation.navigate('MapView')
    }
}

class TheMap extends React.Component {
    static navigationOptions = {
        title: 'MapView'
    };

    render () {
        return (
            <View>
            <CardSection>
            <Header headerText="Here should be a map" />
            </CardSection>
            <Card>
            <Map />
            </Card>
            <Button onPress={this.findWaypoints}>Create route</Button>
            </View>
        );
    }

    findWaypoints = () => {
        
      }
}

export default SwitchNavigator({
    Home: { screen: StartScreen },
    CreateAccount: { screen: CreateAccountScreen },
    MapView: {screen: TheMap}
  });
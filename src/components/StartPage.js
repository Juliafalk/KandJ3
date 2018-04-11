//this is the first page the user will see. 
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import { Button, Card, CardSection, Header } from './common';
import Map from './Map';
import CreateAccount from './CreateAccount';
import LoginPage from './LoginPage';

class StartPage extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    render() {
        return (
        <View>
            <Header headerText="runRouter" />
                <CardSection>
                    <Button onPress={this.Login}> Login </Button> 
                </CardSection>
                <CardSection>
                    <Button onPress={this.CreateAccount}> Create a new account </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.SeeMap}> See the map :) </Button>
                </CardSection>
            </View>
        );

    }

    Login = () => {
        this.props.navigation.navigate('Login')
    }

    CreateAccount = () => {
        this.props.navigation.navigate('CreateAccount');
    }

    SeeMap = () => {
        this.props.navigation.navigate('MapView')
    }
}

class Login extends React.Component {
    static navigationOptions = {
        title: 'Login'
    };


render() {
    return(
        <View>
            <LoginPage />
        </View>
    );
}
}

class CreateAccountScreen extends React.Component {
    static navigationOptions = {
        title: 'CreateAccount'
    };
    render () {
        return (
            <View>
                <CreateAccount />
            </View>
        );
    }
}

class TheMap extends React.Component {
    static navigationOptions = {
        title: 'MapView'
    };

    render () {
        return (
            <View>
                <Header headerText="Here should be a map" />
            <Card>
                <Map />
            </Card> 
            </View> 
        );
    }
}

export default SwitchNavigator({
    Home: { screen: StartPage },
    Login: { screen: Login },
    CreateAccount: { screen: CreateAccountScreen },
    MapView: {screen: TheMap}
});
/*This page is the startpage that the user will see if the user is not logged in.
Also it is good for us to be able to work on diffrent files like Login, CreateAccount and SeeMap.
The code navigates to correst pages with SwitchNavigator. / JF (11/4)
*/
import React, { Component } from 'react';
import { View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import { Button, Card, CardSection, Header } from './common';
import Map from './Map';
import CreateAccount from './CreateAccount';
import LoginPage from './LoginPage';

//This is the first page / JF (11/4)
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

    //Following functions make sure that the buttons navigate to correct page / JF (11/4)
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

//This class returns the LoginPage / JF (11/4)
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

//This class returns the CreateAccount Screens / JF (11/4)
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

/*This class resturns the map. 
So far the map is placed on card, because some stylingsproblems.
When the styling works correctly, we have to decide if the map should be
over the whole page / JF (11/4)*/
class TheMap extends React.Component {
    static navigationOptions = {
        title: 'MapView'
    };

    render () {
        return (
            <View>
                <Header headerText="There should be a map" />
                <Map /> 
            </View> 
        );
    }
}

//Export correct page, SwitchNavigator make sure that correct page is shown / JF (11/4)
export default SwitchNavigator({
    Home: { screen: StartPage },
    Login: { screen: Login },
    CreateAccount: { screen: CreateAccountScreen },
    MapView: {screen: TheMap}
});
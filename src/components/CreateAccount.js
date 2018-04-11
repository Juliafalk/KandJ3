import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import { Button, Card, CardSection, Header } from './common';
import StartPage from './StartPage'

class CreateAccount extends React.Component {

    render () {
        return (
        <View>
            <Header headerText="Create Account" />
            <Text>Create a new account</Text>
            <CardSection>
                <Button onPress={this.GoBack}>Go back</Button>
            </CardSection>
        </View>
        );
    }

    GoBack =() => {
            this.props.navigation.navigate('Home');
    } 
}

class GoBackStartPage extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    render () {
        return (
        <StartPage />
        );
    }
}

export default SwitchNavigator({
    CreateAccount: { screen: CreateAccount },
    Home: { screen: GoBackStartPage }

});
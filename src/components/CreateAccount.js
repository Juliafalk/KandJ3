/*This file should include the components for an user to create an account.
I.e. input form, back-button etc. So far it only includes back-button.
The back-button navigates back to the startpage trough the SwitchNavigator in the bottom.
and the GoBack function / JF (11/4) */ 

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import { MyButton, MyCard, MyCardSection, MyHeader } from './common';
import StartPage from './StartPage'

class CreateAccount extends React.Component {

    render () {
        return (
        <View>
            <MyHeader headerText="Create Account" />
            <Text>Create a new account</Text>
            <MyCardSection>
                <MyButton onPress={this.GoBack}>Go back</MyButton>
            </MyCardSection>
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
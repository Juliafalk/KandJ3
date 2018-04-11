import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import { Header, Button, CardSection } from './components/common';
import Map from './components/Map';
import LoginForm from './components/LoginForm';


class App extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    render() {
        return <LoginForm />;
    }
}
export default App;

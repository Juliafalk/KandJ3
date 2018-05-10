/*This page should include LoginForm, i.e. it is for the user to login. 
The Loginpage is placed on an card in App.js
The user can use/ JF (12/4) */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { MyCard, MyCardSection, MySpinner, MyInput } from './common';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

class LoginPage extends Component { 
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
         
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this)) //need to bind, passing of to promise, dont know the context = need to bind. 
            .catch(this.onLoginFailed.bind(this));
    }

    onLoginFailed() {
        this.setState({
            error: 'Authentication Failed.',
            loading: false
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '', 
            loading: false, 
            error: '' //overkill, is not needed.. 
        });

        Actions.Map();
    }

    renderButton() {
        if (this.state.loading) {
            return <MySpinner size="small" />
        }

        return (
            <View>
                <Button
                    full
                    style={styles.loginButton}
                    onPress={this.onButtonPress.bind(this)}> 
                    <Text
                    style={styles.loginButtonText}>Login</Text>  
                </Button>
            </View>
        );
    }

    render() {
        return (
            <View>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <MyCardSection>
                    <MyInput
                    placeholder="user@gmail.com"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    iconType={"SimpleLineIcons"} 
                    iconName={'user'} 
                    />
                </MyCardSection>
               
                <MyCardSection>
                    <MyInput
                    placeholder="password"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    iconType={"SimpleLineIcons"} 
                    iconName={'lock'} 
                    />
                </MyCardSection>

                <MyCardSection>
                    {this.renderButton()}
                </MyCardSection>
            </View>
        );
    };
};

const styles = {
    errorTextStyle: {
        height: 20,
        fontSize: 20,
        alignSelf: 'center',
        color: 'black',
        fontFamily: 'GillSans-SemiBold'
    },
    loginButton: {
        marginTop: 10,
        height: 40,
        alignSelf: 'center',
        width: '134%',
        backgroundColor: '#7785ad'
    },
    loginButtonText: {
        fontSize: 20,
        fontFamily: 'GillSans-Light',
        color: 'white'
    }
}

//Error message will only be seen if something goes wrong
//This cause it will only be updated it the user does something wrong.. 
export default LoginPage; 

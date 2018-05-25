//This file includes the LoginForm, and all the necessary functions that is required for the user to sign in.
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { MyCardSection, MySpinner, MyInput } from './common';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

class LoginPage extends Component { 
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
         
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))  
            .catch(this.onLoginFailed.bind(this));
    }

    onLoginFailed() {
        this.setState({
            error: 'Wrong email or password!',
            loading: false
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '', 
            loading: false, 
            error: '' 
        });

        Actions.Map();
    }

    renderButton() {

        const { 
            loginButton,
            loginButtonText
        } = styles; 
        if (this.state.loading) {
            return <MySpinner size="small" />
        }

        return (
            <View>
                <Button
                    block
                    style={loginButton}
                    onPress={this.onButtonPress.bind(this)}> 
                    <Text
                    style={loginButtonText}>Login</Text>  
                </Button>
            </View>
        );
    }

    render() {

        const {
            errorTextStyle
        } = styles;

        return (
            <View>
                <Text style={errorTextStyle}>
                    {this.state.error}
                </Text>

                <MyCardSection>
                    <MyInput
                    placeholder="user@email.com"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email, error: '' })}
                    iconType={"SimpleLineIcons"} 
                    iconName={'user'} 
                    />
                </MyCardSection>
               
                <MyCardSection>
                    <MyInput
                    placeholder="password"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password, error: ''  })}
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
        height: 25,
        fontSize: 20,
        marginBottom: 12.7,
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

export default LoginPage; 

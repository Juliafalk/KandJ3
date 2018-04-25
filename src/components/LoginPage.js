/*This page should include LoginForm, i.e. it is for the user to login. 
The Loginpage is placed on an card in App.js
The user can use/ JF (12/4) */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { MyCard, MyCardSection, MySpinner, MyInputLogin } from './common';
import { Button } from 'native-base';

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
    }

    renderButton() {
        if (this.state.loading) {
            return <MySpinner size="small" />
        }

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity block style={styles.login} onPress={this.onButtonPress.bind(this)}> 
                    <Text style={styles.loginButtonText}>Login </Text>  
                </TouchableOpacity>
            </View>
        );
         
    }

    render() {
        return (
            <MyCard>
                <MyCardSection>
                    <MyInputLogin
                    style={{alignSelf: 'center'}}
                    placeholder="user@gmail.com"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    iconType={"FontAwesome"} 
                    iconName={'user-o'} 
                    />
                </MyCardSection>
               
                <MyCardSection>
                    <MyInputLogin
                    placeholder="password"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    iconType={"Entypo"} 
                    iconName={'key'} 
                    //Vill vi ha nyckel?? / JF (13/4)
                    />
                </MyCardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <MyCardSection>
                    {this.renderButton()}
                </MyCardSection>
            </MyCard>
        );
    };
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#a80000',
        fontFamily: 'GillSans-SemiBold'
    },
    loginButton: {
        backgroundColor: '#3a88e8',
        width: '40%',
        alignSelf: 'center',    
    },
    login: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',  
        backgroundColor: '#3a88e8',
        height: 40,
        width: '40%',
        borderRadius: 20,
        zIndex: 100,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'GillSans-Light',
    }

}

//Error message will only be seen if something goes wrong
//This cause it will only be updated it the user does something wrong.. 
export default LoginPage; 
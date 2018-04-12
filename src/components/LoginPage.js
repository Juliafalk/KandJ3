/*This page should include LoginForm, i.e. it is for the user to login. 
The Loginpage is placed on an card in App.js
The user can use/ JF (12/4) */
import React, { Component } from 'react';
import { Text } from 'react-native';
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
            //    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            //        .then(this.onLoginSuccess.bind(this))
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
            <Button style={styles.loginButton} onPress={this.onButtonPress.bind(this)}>
                <Text style={styles.loginButtonText}>Log in</Text>
            </Button>
        );
         
    }

    render() {
        return (
            <MyCard>
                <MyCardSection>
                    <MyInputLogin
                    placeholder="user@gmail.com"
                    label="Email:"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                </MyCardSection>

                <MyCardSection>
                    <MyInputLogin
                    placeholder="password"
                    label="Password: "
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
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
        color: 'red'
    },
    loginButton: {
        backgroundColor: '#3a88e8',
        width: '100%'
    },
    //Denna text ska centreras sen, vet ej hur man gör
    loginButtonText: {
        //flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        fontSize: 20, 
        fontWeight: '600',
        //paddingTop: 10,
        paddingBottom: 10,
        color: 'white',
        marginLeft: 10
    }
}

//Error message will only be seen if something goes wrong
//This cause it will only be updated it the user does something wrong.. 
export default LoginPage; 
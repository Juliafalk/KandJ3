/*This page should include LoginForm, i.e. it is for the user to login. 
Probaly this file will be placed on a card.
So far this file does not contains so much, therefore I leave the rest
of the code uncommented / JF (11/4) */

/*import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'native-base';

class LoginPage extends React.Component {
    render () {
        return (
        <View>
            <Text> Empty LoginPage now </Text>
            <Button full light><Text>Hej</Text></Button>
        </View>
        );
    }
}


export default LoginPage; 
*/

import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Spinner, InputLogin } from './common';
import { Button } from 'native-base';

//loading - a booleand, when true = user attempot to log in
//loading is false cause by default, we are not loading anything.. 
//When pressed log in, we want to update state to true.
//Want to show button or spinner??

//renderButton - either show the button or the spinner
//if (this.state.loading) by default means true.
//Have to be called from render. 

//onLoginSuccress() när användare lyckas logga in. 
//clear out error message, clean out the form and loading = false. 

class LoginPage extends Component { 
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
         
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this)) //need to bind, passing of to promise, dont know the context = need to bind. 
            .catch(() => {
                firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFailed.bind(this));
                    
        }); 
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
            return <Spinner size="small" />
        }

        return (
            <Button style={styles.loginButton} onPress={this.onButtonPress.bind(this)}>
                <Text style={styles.loginButtonText}>Log in</Text>
            </Button>
        );
         
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <InputLogin
                    placeholder="user@gmail.com"
                    label="Email:"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <InputLogin
                    placeholder="password"
                    label="Password: "
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
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
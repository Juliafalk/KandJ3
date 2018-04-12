/*This file should include the components for an user to create an account.
I.e. input form, back-button etc. So far it only includes back-button.
The back-button navigates back to the startpage trough the SwitchNavigator in the bottom.
and the GoBack function / JF (11/4) */ 

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import { Button, Card, CardSection, Header, InputLogin, Spinner } from './common';
import StartPage from './StartPage';
import firebase from 'firebase';

class CreateAccount extends React.Component {

    state = { email: '', password: '', repPassword: '', error: '', name: '', age: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true,  });
        if (this.state.password == this.state.repPassword){
            console.log('same pass')
            console.log(password)
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onCreateAccountSuccess.bind(this)) //need to bind, passing of to promise, dont know the context = need to bind. 
                .catch(this.onCreateAccountFailed.bind(this))
        }
        else{
            console.log('not same pass')
            return(
            (this.onCreateAccountFailed.bind(this))
            );
        }
    }

    onCreateAccountSuccess() {
        console.log('created an account?')
         this.setState({
             email: '',
             password: '', 
             repPassword: '',
             name: '',
             age: '',
             loading: false, 
             error: '' //overkill, is not needed.. 
       });
    }
    
    onCreateAccountFailed() {
        console.log('failed to create account')
        this.setState({
            error: 'Create Account Failed.',
            loading: false
        });
    }


    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                <Text>Create Account</Text>
            </Button>
        );
         
    }

    render () {
            return (
                <View>
                <Header headerText="Create Account" />
                <Card>
                    <CardSection>
                        <InputLogin 
                        placeholder="Enter name"
                        label="Name:"
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}/>
                    </CardSection>

                                    
                     <CardSection>
                        <InputLogin 
                        placeholder="Age, ex. 22"
                        label="Age:"
                        value={this.state.age}
                        onChangeText={age => this.setState({ age })}/>
                    </CardSection>

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
                        placeholder="password, min 6 characters"
                        label="Password: "
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        />
                    </CardSection>

                    <CardSection>
                        <InputLogin
                        placeholder="repeat password"
                        label="Password: "
                        secureTextEntry={true}
                        value={this.state.repPassword}
                        onChangeText={repPassword => this.setState({ repPassword })}
                        />
                    </CardSection>
                    
    
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>

                    <CardSection>
                        <Button onPress={this.GoBack}>Go back</Button>
                    </CardSection>
                </Card>
            </View>
            );
        };

    
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
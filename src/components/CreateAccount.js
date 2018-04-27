/*This file should include the components for an user to create an account.
I.e. input form, back-button etc. So far it only includes back-button.
The back-button navigates back to the startpage trough the SwitchNavigator in the bottom.
and the GoBack function / JF (11/4) */ 

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import { Button, Icon, Header, Body } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MyCard, MyCardSection, MyInput, MySpinner } from './common';
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
            return <MySpinner size="small" />
        }

        return (
                <Button block style={styles.createAccountButton} onPress={this.onButtonPress.bind(this)}>
                    <Text style={styles.createAccountButtonText}>Create Account</Text>
                </Button>
        );
         
    }

    render () {
            return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true}>
                <View>
                    <Header style={styles.headerStyle}>
                        <Body>
                            <Text style={styles.headerStyleText}>Create account</Text>
                        </Body>
                    </Header>
                
                    <View style={{justifyContent: 'center'}}>
                        <View style={styles.inputContainer}>
                            <Icon type="SimpleLineIcons" name="user-follow" style={styles.iconStyle} />
                                <MyCardSection>
                                    <MyInput
                                    placeholder="name"
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })}/>
                                </MyCardSection>

                                <MyCardSection>
                                    <MyInput 
                                    placeholder="user@gmail.com"
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email })}
                                    />
                                </MyCardSection>
                
                                <MyCardSection>
                                    <MyInput 
                                    placeholder="password, min 6 characters"
                                    label="Password: "
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={password => this.setState({ password })}
                                    />
                                </MyCardSection>

                                <MyCardSection>
                                    <MyInput 
                                    placeholder="repeat password"
                                    label="Password: "
                                    secureTextEntry={true}
                                    value={this.state.repPassword}
                                    onChangeText={repPassword => this.setState({ repPassword })}
                                    />
                                </MyCardSection>
                                
                                <MyCardSection>
                                    {this.renderButton()}
                                </MyCardSection>
                            </View>
                            

                            <MyCardSection>
                                <Button block style={styles.goBackButton} onPress={this.GoBack}>
                                    <Icon type="Ionicons" name="ios-arrow-back" style={{color:'black', fontSize: 15}}/> 
                                    <Text style={styles.goBackButtonText}>Go back</Text>
                                </Button>
                            </MyCardSection>
                    </View>
                </View>
            </KeyboardAwareScrollView>
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

const styles = {
    headerStyle: {
        height: 80
    },
    headerStyleText: {
        fontFamily: 'GillSans',
        fontSize: 35,
    },
    iconStyle: {
        fontSize: 60,
        color: '#eaeaea',
        alignSelf: 'center'
    },
    createAccountButton: { 
        backgroundColor: '#65bc58',
        width: '50%',
        alignSelf: 'center',
    },
    createAccountButtonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'GillSans-Light',
    },
    inputContainer: {
        width: '80%'
    },
    goBackButton: {
        backgroundColor: '#fcfcfc',
        alignSelf: 'center',
        width: '40%',
    },
    goBackButtonText: {
        fontFamily: 'GillSans',
        fontSize: 18,
        //To center the button text
        //Rember to change the margin if the icon size is changed. 
        marginRight: 15
    }
}

export default SwitchNavigator({
    CreateAccount: { screen: CreateAccount },
    Home: { screen: GoBackStartPage }
});

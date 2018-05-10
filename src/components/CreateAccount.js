/*This file should include the components for an user to create an account.
I.e. input form, back-button etc. So far it only includes back-button.
and the GoBack function / JF (11/4) */ 

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MyCardSection, MyInput, MySpinner } from './common';
import firebase from 'firebase';
import Wallpaper from './Wallpaper';
import { Actions } from 'react-native-router-flux';

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

       Actions.Map();
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
            <View style={styles.createAccountView}>
                <Button full style={styles.createAccountButton} onPress={this.onButtonPress.bind(this)}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </Button>
            </View>
        );
    }

    render () {
        return ( 
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true}>
                <Wallpaper>
                <View>
                    <View style={styles.inputContainer}>
                        <Icon type="SimpleLineIcons" name="user-follow" style={styles.iconStyle} />
                            <MyCardSection>
                                <MyInput
                                    placeholder="name"
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })}
                                    iconType={"SimpleLineIcons"} 
                                    iconName={'user-follow'} 
                                />
                            </MyCardSection>

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
                                    placeholder="password, min 6 characters"
                                    label="Password: "
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={password => this.setState({ password })}
                                    iconType={"SimpleLineIcons"} 
                                    iconName={'lock'} 
                                />
                            </MyCardSection>

                            <MyCardSection>
                                <MyInput 
                                    placeholder="repeat password"
                                    label="Password: "
                                    secureTextEntry={true}
                                    value={this.state.repPassword}
                                    onChangeText={repPassword => this.setState({ repPassword })}
                                    iconType={"SimpleLineIcons"} 
                                    iconName={'lock'} 
                                />
                            </MyCardSection>
                                
                            <MyCardSection>
                                {this.renderButton()}
                            </MyCardSection>
                        </View>
                            
                        <MyCardSection>
                            <Button full style={styles.goBackButton} onPress={() => Actions.login()}>
                                <Icon type="Ionicons" name="ios-arrow-back" style={{color:'black', fontSize: 15}}/> 
                                <Text style={styles.goBackButtonText}>Go Back</Text>
                            </Button>
                        </MyCardSection>
                </View>
                </Wallpaper>
            </KeyboardAwareScrollView>
        );
    };
}

const styles = {
    iconStyle: {
        fontSize: 60,
        marginTop: 50,
        marginBottom: 50,
        color: 'white',
        alignSelf: 'center'
    },
    createAccountView: {
        flex: 1, 
        justifyContent: 'center' 
    },
    createAccountButton: {
        height: 40, 
        marginTop: 10,
        backgroundColor: '#7785ad' 
    },
    createAccountText: {
        fontSize: 17,
        fontFamily: 'GillSans-Light',
        color: 'white'
    },
    inputContainer: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 50
    },
    goBackButton: {
        backgroundColor: 'white',
        opacity: 0.75,
        alignSelf: 'center',
        height: 35,
        width: '30%',
    },
    goBackButtonText: {
        fontFamily: 'GillSans',
        fontSize: 18,
        //To center the button text
        //Rember to change the margin if the icon size is changed. 
        marginRight: 15
    }
}

export default CreateAccount;

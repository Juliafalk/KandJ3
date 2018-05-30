//This file includes the components for an user to create an account

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MyCardSection, MyInput, MySpinner } from './common';
import firebase from 'firebase';
import Wallpaper from './Wallpaper';
import { Actions } from 'react-native-router-flux';

class CreateAccount extends React.Component {

    state = { email: 'run@gmail.com', password: 'password', repPassword: '', error: '', name: 'Runner',  loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true,  });
        if (this.state.password == this.state.repPassword){
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onCreateAccountSuccess.bind(this))
                .catch(this.onCreateAccountFailed.bind(this))
        }
        else{
            this.pwdDiff();
        }
    }

    onCreateAccountSuccess() {
        const user = firebase.auth().currentUser;
        if(user){
            user.updateProfile({
                displayName: this.state.name
            }).then(function() {
                var displayName = user.displayName;
            })
        }
         this.setState({
             email: '',
             password: '', 
             repPassword: '',
             name: '',
             loading: false, 
             error: ''
       });

       Actions.Map();
    }

    onCreateAccountFailed(error) {
       if ( error.code == 'auth/invalid-email' && this.state.password.length < 6) {
            this.setState({
                error: 'Invalid email and password',
                loading: false
            });
        }
        else if (this.state.password.length < 6){
            this.setState({
                error: 'Password too short',
                loading: false
            });
        }
        else{
            this.setState({
                error: 'Invalid email',
                loading: false
            });
        }
    }


    pwdDiff() {
        if (this.state.password.length < 6){
            this.setState({
                error: 'Password short and not matching',
                loading: false
            });
        }
      else{
        this.setState({
            error: 'Password not matching',
            loading: false
        });
      }  
    }

    renderButton() {
        if (this.state.loading) {
            return <MySpinner size="small" />
        }

        return (
            <View style={styles.createAccountView}>
                <Button block style={styles.createAccountButton} onPress={this.onButtonPress.bind(this)}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </Button>
            </View>
        );
    }

    render () {

        const {
            iconStyle,
            errorTextStyle,
            createAccountView,
            createAccountButton,
            createAccountText,
            inputContainer,
            goBackButton,
            goBackButtonText
        } = styles;
        return ( 
            <View>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                >
                <Wallpaper>
                <View>
                    <View style={inputContainer}>
                        <Icon type="SimpleLineIcons" name="user-follow" style={iconStyle} />
                            <Text style={errorTextStyle}>
                                {this.state.error}
                            </Text>
                            <MyCardSection>
                                <MyInput
                                    placeholder="username"
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name, error: '' })}
                                    iconType={"SimpleLineIcons"} 
                                    iconName={'user-follow'} 
                                />
                            </MyCardSection>

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
                                    placeholder="password, min 6 characters"
                                    label="Password: "
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={password => this.setState({ password, error: '' })}
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
                                    onChangeText={repPassword => this.setState({ repPassword, error: '' })}
                                    iconType={"SimpleLineIcons"} 
                                    iconName={'lock'} 
                                />
                            </MyCardSection>
                                
                            <MyCardSection>
                                {this.renderButton()}
                            </MyCardSection>
                        </View>
                            
                        <MyCardSection>
                            <Button block style={goBackButton} onPress={() => Actions.login()}>
                                <Icon type="Ionicons" name="ios-arrow-back" style={{color:'black', fontSize: 15}}/> 
                                <Text style={styles.goBackButtonText}>Go Back</Text>
                            </Button>
                        </MyCardSection>
                </View>
                </Wallpaper>
            </KeyboardAwareScrollView>
            </View>
        );
    };
}

const styles = {
    iconStyle: {
        fontSize: 60,
        marginTop: 50,
        marginBottom: 17,
        color: 'white',
        alignSelf: 'center'
    },
    errorTextStyle: {
        height: 25,
        fontSize: 20,
        marginBottom: 8,
        alignSelf: 'center',
        color: 'black',
        fontFamily: 'GillSans-SemiBold'
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
        marginBottom: 146
    },
    goBackButtonText: {
        fontFamily: 'GillSans',
        fontSize: 18,
        marginRight: 15
    }
}

export default CreateAccount;

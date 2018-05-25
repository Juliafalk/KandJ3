//This page is the startpage that the user will see if the user is not logged in.
//The LoginPage in displayed on the startPage. 

import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Container, Button } from 'native-base';
import { MyCardSection } from './common';
import LoginPage from './LoginPage';
import Wallpaper from './Wallpaper';
import { Actions } from 'react-native-router-flux';

export class StartPage extends React.Component {

    render() {
        const { 
            headerText,
            loginForm,
            createAccountButton,
            createAccountText
        } = styles 

        return (
            <View style={{ height: '100%' }}>
                <Wallpaper>
                    <Container style={loginForm}>
                        <MyCardSection>
                            <Text style={headerText}>runRouter</Text>
                        </MyCardSection>
                            
                        <LoginPage />
                             
                        <MyCardSection>
                            <View>
                                <Button 
                                    style={createAccountButton}
                                    onPress={() => Actions.createAccount()}> 
                                    <Text style={createAccountText}>Create Account</Text>
                                </Button> 
                            </View>
                        </MyCardSection>
                    </Container>
                </Wallpaper>
            </View>
        );
    }
}

const styles = { 
    headerText: {
        fontSize: 50, 
        fontWeight: 'bold', 
        marginBottom: 60,
        color: 'white'
    },
    loginForm: {
        width: '80%', 
        marginTop: 100,
        alignSelf: 'center'
    },
    createAccountButton: {
        height: 35,
        backgroundColor: 'transparent'
    },
    createAccountText: {
        fontSize: 17,
        textDecorationLine: 'underline',
        fontFamily: 'GillSans-Light',
        color: 'white'
    },
};


export default StartPage;

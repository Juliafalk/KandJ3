/*This page is the startpage that the user will see if the user is not logged in.
Also it is good for us to be able to work on diffrent files like Login, CreateAccount and SeeMap.
/ JF (11/4)
*/
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { MyCardSection } from './common';
//JL: should add an index file to reduce imports below
import LoginPage from './LoginPage';
import Wallpaper from './Wallpaper';
import { Actions } from 'react-native-router-flux';

//This is the first page / JF (11/4)
//Map button will not be visible later. 
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
        marginBottom: 77.7,
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

otherStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartPage;

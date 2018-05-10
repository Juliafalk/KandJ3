/*This page is the startpage that the user will see if the user is not logged in.
Also it is good for us to be able to work on diffrent files like Login, CreateAccount and SeeMap.
The code navigates to correst pages with SwitchNavigator. / JF (11/4)
*/
import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerNavigator, DrawerItems, SwitchNavigator } from 'react-navigation';
import { Container, Content, Header, Body, Button, Icon, Footer } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MyCard, MyCardSection, MyButton } from './common';
//JL: should add an index file to reduce imports below
import MapPage from './MapPage'; 
import CreateAccount from './CreateAccount';
import LoginPage from './LoginPage';
import LogPage from './LogPage';
import FavoritePage from './FavoritePage';
import SettingsScreen from './SettingsScreen';
import Wallpaper from './Wallpaper';
import { Actions } from 'react-native-router-flux';

//This is the first page / JF (11/4)
//Map button will not be visible later. 
export class StartPage extends React.Component {

    render() {
        return (
            <View style={{ height: '100%' }}>
                <Wallpaper>
                    <Container style={styles.loginForm}>
                        <MyCardSection>
                            <Text style={styles.headerText}>runRouter</Text>
                        </MyCardSection>
                            
                        <LoginPage />
                             
                        <MyCardSection>
                            <View>
                                <Button 
                                    style={styles.createAccountButton}
                                    onPress={() => Actions.createAccount()}> 
                                    <Text style={styles.createAccountText}>Create Account</Text>
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

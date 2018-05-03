/*This page is the startpage that the user will see if the user is not logged in.
Also it is good for us to be able to work on diffrent files like Login, CreateAccount and SeeMap.
The code navigates to correst pages with SwitchNavigator. / JF (11/4)
*/
import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerNavigator, DrawerItems, SwitchNavigator } from 'react-navigation';
import { Container, Content, Header, Body, Button, Icon, Footer } from 'native-base';
import { MyCard, MyCardSection, MyButton } from './common';
//JL: should add an index file to reduce imports below
import MapPage from './MapPage'; 
//import MyApp from './MyApp';
import CreateAccount from './CreateAccount';
import LoginPage from './LoginPage';
import LogPage from './LogPage';
import FavoritePage from './FavoritePage';
import SettingsScreen from './SettingsScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Wallpaper from './Wallpaper';

//This is the first page / JF (11/4)
//Map button will not be visible later. 
class StartPage extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
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
                                    onPress={this.CreateAccount}> 
                                    <Text style={styles.createAccountText}>Create Account</Text>
                                </Button> 
                            </View>
                        </MyCardSection>
                    </Container>
                </Wallpaper>
            </View>
        );
    }

    //Following functions make sure that the buttons navigate to correct page / JF (11/4)
    Login = () => {
        this.props.navigation.navigate('Login')
    }

    CreateAccount = () => {
        this.props.navigation.navigate('CreateAccount');
    }

    SeeMap = () => {
        this.props.navigation.navigate('MapView')
    }
}

//This class returns the LoginPage / JF (11/4)
class Login extends React.Component {
    static navigationOptions = {
        title: 'Login'
    };
    render() {
        return(
            <View>
                <LoginPage />
            </View>
        );
    }
};

//This class returns the CreateAccount Screens / JF (11/4)
class CreateAccountScreen extends React.Component {
    static navigationOptions = {
        title: 'CreateAccount'
    };
    render () {
        return (
            <View 
            style={{ height: '100%'}}>
            <Wallpaper>
                <CreateAccount />
            </Wallpaper>
            </View>
        );
    }
};

/*This class resturns the map. 
So far the map is placed on card, because some stylingsproblems.
When the styling works correctly, we have to decide if the map should be
over the whole page / JF (11/4)*/
class TheMap extends React.Component {
    static navigationOptions = {
        title: 'MapView'
    };
    render () {
        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            >
                <Container>
                    <MyApp /> 
                </Container>
            </KeyboardAwareScrollView>       
        );
    }
};

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

//layout on sidemenu/ JG 13/4 
const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{ height: 200, backgroundColor: 'white' }}>
            <Body>
                <Image
                style={otherStyles.drawerImage}
                />
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props}/>
        </Content>        
    </Container>
);

/*Sidemenu with directions to which page if clicking on an option
InitialRouteName is which page to start on when calling MyApp/JG 13/4 */
const MyApp = DrawerNavigator({

    Map: {
        screen: MapPage
    },
    Log: {
        screen: LogPage
    },
    Favorites: {
        screen: FavoritePage
    },
    Settings: {
        screen: SettingsScreen
    },
}, {
    initialRouteName: 'Map',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle' 
    
});

//Export correct page, SwitchNavigator make sure that correct page is shown / JF (11/4)
export default SwitchNavigator({
    Home: { screen: StartPage },
    Login: { screen: Login },
    CreateAccount: { screen: CreateAccountScreen },
    MapView: {screen: TheMap}
});

otherStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75
    }
})


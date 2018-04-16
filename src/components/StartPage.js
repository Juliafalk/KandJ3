/*This page is the startpage that the user will see if the user is not logged in.
Also it is good for us to be able to work on diffrent files like Login, CreateAccount and SeeMap.
The code navigates to correst pages with SwitchNavigator. / JF (11/4)
*/
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import MapPage from './MapPage'; 
import { MyCard, MyCardSection} from './common';
import CreateAccount from './CreateAccount';
import LoginPage from './LoginPage';
import LogPage from './LogPage';
import FavoritePage from './FavoritePage';
import SettingsScreen from './SettingsScreen';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Content, Header, Body, Button, Icon } from 'native-base';
//JL: should add an index file to reduce imports

//This is the first page / JF (11/4)
//Map button will not be visible later. 
class StartPage extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    render() {
        return (
        
        <View style={{justifyContent: 'center', height: '100%'}}>
            <MyCardSection>
                <Icon type="Foundation" name='map' style={{fontSize: 100}}/>
            </MyCardSection>
                
            <LoginPage />
                
            <MyCardSection>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Button block style={styles.createAccountStyle} onPress={this.CreateAccount}> 
                        <Text style={styles.createAccountText}>Create account</Text>
                    </Button> 
                    <Button block style={styles.seeMapStyle}onPress={this.SeeMap}> 
                        <Text>See the map</Text>
                    </Button>
                </View>
            </MyCardSection>
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
            <View>
                <CreateAccount />
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
            <Container>
                <MyApp /> 
            </Container> 
        );
    }
};

const styles = {
    createAccountStyle: {
        backgroundColor: '#fcfcfc',
        alignSelf: 'center',
        width: '60%'
    },
    createAccountText: {
        fontSize: 18,
        fontFamily: 'GillSans-Light',
        textDecorationLine: 'underline'
    },
    seeMapStyle: {
        backgroundColor: '#fff'
    },
};

//layout on sidemenu/ JG 13/4 
const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{ height: 200, backgroundColor: 'white' }}>
            <Body>
                <Image
                style={otherStyles.drawerImage}
                source={require('./Runit_logo.png')}/>
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


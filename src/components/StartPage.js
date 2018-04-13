/*This page is the startpage that the user will see if the user is not logged in.
Also it is good for us to be able to work on diffrent files like Login, CreateAccount and SeeMap.
The code navigates to correst pages with SwitchNavigator. / JF (11/4)
*/
import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import MapPage from './MapPage'; 
import { MyCard, MyCardSection} from './common';
import { Button, Icon } from 'native-base';
import CreateAccount from './CreateAccount';
import LoginPage from './LoginPage';

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
                    <Text style={styles.orText}>Or.. </Text>
                    <Button block style={styles.createAccountStyle} onPress={this.CreateAccount}> 
                        <Text style={styles.createAccountText}>Create a new account</Text>
                    </Button> 
                </View>
            </MyCardSection>

            <MyCardSection style={{ flex: 1}}>
                <Button block style={styles.seeMapStyle}onPress={this.SeeMap}> 
                    <Text>See the map </Text>
                </Button>
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
            <View>
                <MapPage /> 
            </View> 
        );
    }
};

const styles = {
    orText: {
        alignSelf: 'center',
        fontSize: 17,
        fontFamily: 'GillSans-LightItalic',
        
    },
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
}

//Export correct page, SwitchNavigator make sure that correct page is shown / JF (11/4)
export default SwitchNavigator({
    Home: { screen: StartPage },
    Login: { screen: Login },
    CreateAccount: { screen: CreateAccountScreen },
    MapView: {screen: TheMap}
});
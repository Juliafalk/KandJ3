import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    Alert,
    TouchableHighlight 
} from 'react-native';
import firebase from 'firebase'; 
import { 
    Icon, 
    Button, 
} from 'native-base';
import {
    LogCard,
    LogCardItem
} from './common';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            onClicked: false
        }
        this.handlerButtonOnClick = this.handlerButtonOnClick.bind(this)
    }

    handlerButtonOnClick() {
        this.setState({
            onClicked: true
        });
    }

   
    

    

    runAgain (){
        console.log('pressed runAgain')
        console.log(theRoute)
    }

    addFavorite (route){
        const { currentUser } = firebase.auth();
        const UID = route.uid;
        firebase.database().ref(`/users/${currentUser.uid}/routes/${UID}`)
           .update({ favorite: true });
    }

    deleteRoute(route){
        const { currentUser } = firebase.auth();
        const UID = route.uid;
        firebase.database().ref(`/users/${currentUser.uid}/routes/${UID}`)
           .remove();
    }
        
    render() {    
        
        var favText;
        var iconName;
         
        if(this.state.onClicked) {
            favText = "Already favorite",
            iconName = "favorite"

        }
        else{
            favText = "Add to favorite",
            iconName = "favorite-border"
        }

        const { route } = this.props;
        const { 
            viewStyle,
            labelStyle,
            deleteRouteStyle,
            deleteText,
            lineStyle, 
            textStyle,
            viewIconStyle,
            iconStyle,
            favoriteRunView,
            buttonStyle,
            textButtonStyle,
            favoriteButtonStyle,
            favoriteStyle,
            button,
            buttonPress, 
            welcomePress,
            welcome 
        } = styles;
        
     
        return (
            <View style={viewStyle} >
                <LogCard>
                    <LogCardItem>
                        <Text style={labelStyle}>{route.date.toUpperCase()}</Text>
                        <Icon type="FontAwesome" name="remove" onPress={() => 
                               Alert.alert(
                                'Delete route?',
                                'The route is not possible restore!', 
                                [
                                  {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'Yes', onPress: () => {this.deleteRoute(route)}
                                  },
                                ],
                                { cancelable: false }
                              )}>
                        </Icon>
                    </LogCardItem>
                    <View style={lineStyle} />
                    <View style={{
                        flexDirection: 'row'
                        }}>
                        <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            width: '65%'
                        }}>
                            <LogCardItem>
                                <View style={viewIconStyle}>
                                    <Icon name='ios-stopwatch-outline'/>
                                </View>
                                <Text style={textStyle}>Duration: {route.TOTAL_DURATION}</Text>
                            </LogCardItem>
                            <LogCardItem >
                                <View style={viewIconStyle}>
                                    <Icon name="ios-walk-outline"/>
                                </View>
                                <Text style={textStyle}>Route distance: {route.actualDistance.toFixed(2)} km</Text>
                            </LogCardItem>
                            <LogCardItem >
                                <View style={viewIconStyle} />
                                <Text style={textStyle}>Your distance: {route.DISTANCE_TRAVELLED.toFixed(2)} km</Text>
                            </LogCardItem>
                        </View>
                        <View style= {favoriteRunView}>
                        
                            <Button transparent style={favoriteButtonStyle} onPress={() => {this.addFavorite(route), this.handlerButtonOnClick()}}>>
                                <Icon type="MaterialIcons" name={iconName} style={{ color:'black'}} />
                                <Text style={favoriteStyle}>{favText}</Text>
                            </Button>
                            <Button full 
                            style={buttonStyle} 
                            onPress={() => {this.runAgain(route)}}>
                                <Text style={textButtonStyle}>Run again</Text>
                            </Button>
                          
                        </View>
                    </View>
                </LogCard>        
            </View>
        )};
       
}

const styles = {
    viewStyle: {
        alignItems: 'center',
    },
    labelStyle: {
        fontSize: 17,
        paddingLeft: 1, 
        flex: 1, 
        fontFamily: 'GillSans-Light',
        color: 'black',
    },
    deleteRouteStyle: {
        height: 25,
        width: 60,
        backgroundColor: '#666666'
    },
    deleteText: {
        fontSize: 15,
        fontFamily: 'GillSans-Light',
        color: '#fff'
    },
    lineStyle: {
        backgroundColor: 'black',
        height: 1, 
        width: '100%',
        marginBottom: 8,
        marginTop: 2,
    },
    textStyle:{
        marginTop: 5,
        fontSize: 15,
        fontFamily: 'GillSans-Light',
        paddingLeft: 10
    },
    favoriteRunView: {
        width: '35%',
        marginTop: '2%',
        marginRight: '2%'
    },
    buttonStyle: {
        marginTop: 10,
        height: 35,
        width: '100%',
        backgroundColor: '#7785ad',  
    },
    textButtonStyle: {
        fontSize: 17,
        fontFamily: 'GillSans-Light',
        color: 'white'
    },
    favoriteButtonStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    favoriteStyle: {
        fontFamily: 'GillSans-Light',
        fontSize: 10, 
    },
    viewIconStyle: { 
        width: '12%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'red'
    },
    buttonPress: {
        backgroundColor: 'green'
    },
    welcomePress: {
        color: 'blue',
    },
    welcome: {
        color: 'pink'
    }
};


export default ListItem;
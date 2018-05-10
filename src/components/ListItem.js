import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native'; 
import firebase from 'firebase'; 
import { Icon, Button } from 'native-base';
import { LogCard, LogCardItem } from './common';
import { connect } from 'react-redux';
import { runAgain, startButton } from '../actions';
import { Actions } from 'react-native-router-flux';

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
    
    //JL 2/5: vill här ändra sida till kartan och skicka med waypoints
    runAgain(route) {
        this.props.runAgain(route.WAYPOINTS);
        this.props.startButton(false);
        Actions.Map();
    }

    addFavorite(route) {
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
        
        var favoriteText;
        var iconName;
        const { route } = this.props;
         
        if(this.state.onClicked || route.favorite == true ) {
            favoriteText = "Favorite!",
            iconName = "favorite"
        }
        else{
            favoriteText = "Add to favorites!",
            iconName = "favorite-border"
        }
        
        const { 
            viewStyle,
            labelStyle,
            deleteRouteStyle,
            lineStyle, 
            textStyle,
            viewIconStyle,
            favoriteRunView,
            buttonStyle,
            textButtonStyle,
            favoriteButtonStyle,
            favoriteStyle,
        } = styles;
        
        return (
            <View style={viewStyle} >
                <LogCard>
                    <LogCardItem>
                        <Text style={labelStyle}>{route.date.toUpperCase()}</Text>
                        <Icon name="close" style={deleteRouteStyle} onPress={() => 
                               Alert.alert(
                                'Delete route?',
                                'It cannot be restored later!', 
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
                                    <Icon name='ios-stopwatch-outline' style={{fontSize: 22 }}/>
                                </View>
                                <Text style={textStyle}>Duration: {route.TOTAL_DURATION}</Text>
                            </LogCardItem>
                            <LogCardItem >
                                <View style={viewIconStyle}>
                                    <Icon name="ios-walk-outline" style={{fontSize: 24 }}/>
                                </View>
                                <Text style={textStyle}>Route distance: {route.actualDistance.toFixed(2)} km</Text>
                            </LogCardItem>
                            <LogCardItem >
                                <View style={viewIconStyle} >
                                <Icon name="ios-trophy-outline" style={{fontSize: 22 }}/>
                                </View>
                                <Text style={textStyle}>Your distance: {route.DISTANCE_TRAVELLED.toFixed(2)} km</Text>
                            </LogCardItem>
                        </View>
                        <View style= {favoriteRunView}>
                        
                            <Button transparent style={favoriteButtonStyle} onPress={() => {this.addFavorite(route), this.handlerButtonOnClick()}}>
                                <Icon type="MaterialIcons" name={iconName} style={{ color:'black'}} />
                                <Text style={favoriteStyle}>{favoriteText}</Text>
                            </Button>
                            <Button full 
                            style={buttonStyle} 
                            onPress={() => this.runAgain(route)}>
                                <Text style={textButtonStyle}>Run again</Text>
                            </Button>
                          
                        </View>
                    </View>
                </LogCard>        
            </View>
        )
    };
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    deleteRouteStyle: {
        fontSize: 30,
        alignSelf: 'center',
        position: 'relative',
        height: '100%', 
    },
    lineStyle: {
        backgroundColor: 'black',
        height: 0.5, 
        width: '100%',
        marginBottom: 8,
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
};

const mapStateToProps = state => {
    return {
        wayPoints: state.runAgain.wayPoints
    };
};

export default connect(mapStateToProps, { runAgain, startButton })(ListItem); 

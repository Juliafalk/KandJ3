//This file includes the information and functionalites that is displayed on every ListItem
//I.e. the card that is displaying the route information for every route, run again functionality and add to favorite.
import React, { Component } from 'react';
import { Animated, Text, View, Alert } from 'react-native'; 
import firebase from 'firebase'; 
import { Icon, Button } from 'native-base';
import { LogCard, LogCardItem } from './common';
import { connect } from 'react-redux';
import { runAgain, runAgainMode } from '../actions';
import { Actions } from 'react-native-router-flux';

class ListItem extends Component {

    state = { 
        animatedRemove: new Animated.Value(1)
    }

    componentDidUpdate () {
        this.state.animatedRemove.setValue(1)
    }
   
    runAgain(route) {
        this.props.runAgain(route.WAYPOINTS);
        this.props.runAgainMode(true);
        Actions.Map();
    }

    addRemoveFavorite(route) {
        Pressedfavorite = true;
        const { currentUser } = firebase.auth();
        const UID = route.uid;
        if (route.favorite === false ){
            firebase.database().ref(`/users/${currentUser.uid}/routes/${UID}`)
                .update({ favorite: true });
        }
        else if (route.favorite === true) {
            firebase.database().ref(`/users/${currentUser.uid}/routes/${UID}`)
                .update({ favorite: false });
        }
    }

    deleteRoute(route){
        const { currentUser } = firebase.auth();
        const UID = route.uid;
        Animated.timing(this.state.animatedRemove, {
            toValue: 0,
        }).start(() =>  {
            firebase.database().ref(`/users/${currentUser.uid}/routes/${UID}`)
                .remove()}) 
        }

        
    render() {    
        
        var favoriteText;
        var iconName;
        const { route } = this.props;
        const { animatedRemove } = this.state;
        
        //Changing the style on the heart depending on if the route is favorite or not. 
        if(route.favorite == true ) {
            favoriteText = "Favorite",
            iconName = "favorite",
            iconStyle = {
                color: '#d6b3d2',
                fontSize:25
            }
        }
        else{
            favoriteText = "Add to Favorites",
            iconName = "favorite-border",
            iconStyle = {
                color: 'black',
                fontSize:25
            }
        }
        const transformStyle = {
            opacity: animatedRemove,
            alignItems: 'center',
        };

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
            <Animated.View style={transformStyle} >
                <LogCard>
                    <LogCardItem>
                        <Text style={labelStyle}>{route.date.toUpperCase()}</Text>
                        <Icon type="EvilIcons" name="close" style={deleteRouteStyle} onPress={() => 
                               Alert.alert(
                                'Delete route?',
                                'It cannot be restored later!', 
                                [
                                    //console.log() is requried to make the function work. 
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
                        <View style={viewStyle}>
                            <LogCardItem>
                                <View style={viewIconStyle}>
                                    <Icon name='ios-stopwatch-outline' style={{fontSize: 22 }}/>
                                </View>
                                <Text style={textStyle}>Duration: {route.TOTAL_DURATION}</Text>
                            </LogCardItem>
                            <LogCardItem >
                                <View style={viewIconStyle}>
                                    <Icon name="ios-walk-outline" style={{fontSize: 29 }}/>
                                </View>
                                <Text style={textStyle}>Route Distance: {route.actualDistance.toFixed(2)} km</Text>
                            </LogCardItem>
                            <LogCardItem >
                                <View style={viewIconStyle} >
                                <Icon name="ios-trophy-outline" style={{fontSize: 22 }}/>
                                </View>
                                <Text style={textStyle}>Your Distance: {route.DISTANCE_TRAVELLED.toFixed(2)} km</Text>
                            </LogCardItem>
                        </View>
                        <View style= {favoriteRunView}>
                        
                            <Button transparent style={favoriteButtonStyle} onPress={() => {this.addRemoveFavorite(route)}}>
                                <Icon type="MaterialIcons" name={iconName} style={iconStyle} />
                                <Text style={favoriteStyle}>{favoriteText}</Text>
                            </Button>
                            <Button  
                            style={buttonStyle} 
                            onPress={() => this.runAgain(route)}>
                                <Text style={textButtonStyle}>Run Again</Text>
                            </Button>
                          
                        </View>
                    </View>
                </LogCard>     
            </Animated.View>
        )
    };
}

const styles = {
    viewStyle: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '65%'
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
        fontSize: 25,
        alignSelf: 'flex-start',
        position: 'relative',
    },
    lineStyle: {
        backgroundColor: 'black',
        height: 0.5, 
        width: '100%',
        marginBottom: 8,
        marginTop: 2
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
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center'
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

export default connect(mapStateToProps, { runAgain, runAgainMode })(ListItem); 

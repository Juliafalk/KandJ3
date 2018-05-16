import React, { Component } from 'react';
import { Text, View, Animated} from 'react-native';
import firebase from 'firebase'; 
import { Icon, Button } from 'native-base';
import { LogCard, LogCardItem } from './common';
import { connect } from 'react-redux';
import { runAgain, startButton } from '../actions';
import { Actions } from 'react-native-router-flux';

class FavoriteListItem extends Component {

    state = {
        animatedRemove: new Animated.Value(1)
    }
    componentDidUpdate() {
        this.state.animatedRemove.setValue(1)
    }
    runAgain(route) {
        this.props.runAgain(route.WAYPOINTS);
        this.props.startButton(false);
        Actions.Map();
    }

    removeFavorite (route){
        const { currentUser } = firebase.auth();
        const UID = route.uid;
       
        Animated.timing(this.state.animatedRemove, {
            toValue: 0,
        }).start(() =>  {firebase.database().ref(`/users/${currentUser.uid}/routes/${UID}`)
            .update({ favorite: false })}, 
        )}

 
    render() {
        const { route } = this.props;
        const { animatedRemove } = this.state;
        const transformStyle = {
            opacity: animatedRemove,
            alignItems: 'center',
        };
 
        const {
            viewStyle, 
            labelStyle,
            lineStyle, 
            textStyle,
            viewIconStyle,
            favoriteRunView,
            buttonStyle,
            textButtonStyle,
            favoriteButtonStyle,
            favoriteStyle 
        } = styles;
        
        return (
            <Animated.View style ={transformStyle}>
                <LogCard>
                    <LogCardItem>
                        <Text style={labelStyle}>{route.date.toUpperCase()}</Text>
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
                                    <Icon name='ios-stopwatch-outline'style={{fontSize: 22 }}/>
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
                            <Button transparent style={favoriteButtonStyle} onPress={() => {this.removeFavorite(route)}}>
                                <Icon type="MaterialIcons" name="delete" style={{ color:'black'}} />
                                <Text style={favoriteStyle}>Remove favorite</Text>
                            </Button>
                            <Button full 
                            style={buttonStyle} 
                            onPress={() => {this.runAgain(route)}}>
                                <Text style={textButtonStyle}>Run again</Text>
                            </Button>
                          
                        </View>
                    </View>
                </LogCard> 
            </Animated.View> 
  
           
             
        )};  
}

const styles = {
    labelStyle: {
        fontSize: 17,
        paddingLeft: 1, 
        flex: 1, 
        fontFamily: 'GillSans-Light',
        color: 'black',
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
        fontSize: 12, 
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

export default connect(mapStateToProps, { runAgain, startButton })(FavoriteListItem); 

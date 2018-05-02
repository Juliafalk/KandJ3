import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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

    runAgain (){
        console.log('pressed runAgain')
        console.log(theRoute)
    }

    addFavorite (){

        const { currentUser } = firebase.auth();
        console.log('add favorite?')
        console.log(this.props.route.favorite)
        this.props.route.favorite = true;
        console.log(this.props.route.favorite)
        /*firebase.database().ref(`/users/${currentUser.uid}/routes`)
        .push({ this.props.route.favorite });*/
    }
        
    render() {

        
        
        const { route } = this.props;
        const { 
            viewStyle,
            labelStyle,
            lineStyle, 
            textStyle,
            viewIconStyle,
            iconStyle,
            favoriteRunView,
            buttonStyle,
            textButtonStyle,
            favoriteButtonStyle,
            favoriteStyle 

        } = styles;
        
        return (
            <View style={viewStyle}>
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
                            <Button transparent style={favoriteButtonStyle} onPress={() => {this.addFavorite(route)}}>>
                                <Icon type="MaterialIcons" name="favorite-border" style={{ color:'black'}} />
                                <Text style={favoriteStyle}>Add to favorite</Text>
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


export default ListItem;
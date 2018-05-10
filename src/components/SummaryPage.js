/*Here a summary for the runner will be displayed,
a map, distance and total duration will be displayed.
Currently not is used, have to figure out how to send props and state 
between diffrent pages / JF (18/4) */

import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, ActivityIndicator, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { 
    Icon, 
    Header,  
    Left, 
    Body, 
    Title, 
    Right,
    CardItem,
    Button 
} from 'native-base';
import { MyInputCreateAccount, MyButton } from './common';
import reducers from '../reducers';
import { connect } from 'react-redux';
import { lastRouteFetch } from '../actions';
import {
    LogCard,
    LogCardItem,
  } from './common';
  

var routeid;
var routeDate;
var routeDistance;
var routeDuration;
var distanceTravelled;
var favoriteRoute;


//JL 19/5: just a shell to be able to navigate to this page, JF is working on layout
class SummaryPage extends React.Component { 

    
    componentWillMount() {
        this.props.lastRouteFetch();
    }

    addRemoveFavorite (lastRoute){
        const { currentUser } = firebase.auth();
        console.log(favoriteRoute)
        if (favoriteRoute === false){
        firebase.database().ref(`/users/${currentUser.uid}/routes/${routeid}`)
           .update({ favorite: true });
        }
        else if (favoriteRoute === true){
            firebase.database().ref(`/users/${currentUser.uid}/routes/${routeid}`)
               .update({ favorite: false });
        }
}

    render() {
        const { lastRoute } = this.props;
         
        if(favoriteRoute == true ) {
            favoriteText = "Favorite!",
            iconName = "favorite",
            iconStyle = {
                color: '#d6b3d2',
                fontSize: 50
            },
            unAddText="Psst.. Press the heart to remove from favorite"  
        }

        else if (favoriteRoute == false){
            favoriteText = "Add to favorites!",
            iconName = "favorite-border",
            iconStyle = {
                color: '#ffffff',
                fontSize: 50
            },
            unAddText=""

        }

        else {
            favoriteText = "Add to favorites!",
            iconName = "favorite-border",
            iconStyle = {
                color: '#ffffff',
                fontSize: 50
            },
            unAddText=""
        }
        const {
            divideSection,
            summary,
            summaryCard,
            summaryLabel,
            iconSummary,
            summaryText,
            favoriteButtonStyle,
            favoriteStyle,
            unAddStyle,
          } = summaryStyle
      
        return (
            <View style={summary} >
            <View style={{ marginLeft: 15, marginTop: 10 }}>
            <Icon name='close' 
            onPress={() => {Actions.Map()}} 
            style={{ fontSize: 50, color: 'white' }}
            />
            </View>
            <View style={{ marginLeft: 15, marginTop: 10 }}>
            </View>
            <View style={divideSection}>
                <Image style={{ height: 90, width: 90}}  
                source={require('./images/finisher.png')}/>
            </View>
            <View style={summaryCard}>
            <LogCard>
                <LogCardItem>
                <Text style={summaryLabel} >{routeDate}
                </Text>
                </LogCardItem>

                <View style={{ backgroundColor: 'black', height: 0.5,  
                width: '100%',marginBottom: 8,}} />

                <LogCardItem>
                <View style={iconSummary} >
                    <Icon  name='ios-stopwatch-outline'/>
                </View>
                <Text style={summaryText}>Duration: {routeDuration}</Text>
                </LogCardItem>
                
                <LogCardItem block >
                <View style={iconSummary} >
                    <Icon  name="ios-walk-outline"/>
                </View>
                <Text style={summaryText} >Your distance: {distanceTravelled} km</Text>
                </LogCardItem>
            </LogCard>
            </View>
            
        
            <Button transparent style={favoriteButtonStyle} onPress={() => {this.addRemoveFavorite(lastRoute)}}>
                <Icon 
                type="MaterialIcons" 
                name={iconName} 
                style={iconStyle} />
                <Text style={favoriteStyle}>{favoriteText}</Text>
            </Button>
            <Text style={unAddStyle}>{unAddText}</Text>
         
            </View>
        )
    }
}

const mapStateToProps = state => {
    const lastRoute = _.map(state.lastRoute, (theRoute, uid) => {
        if (_.map(state.lastRoute).length > 0){
        routeid = uid; 
        routeDate = theRoute.date.toUpperCase();
        routeDistance = theRoute.actualDistance;
        routeDuration = theRoute.TOTAL_DURATION;
        distanceTravelled = theRoute.DISTANCE_TRAVELLED;
        favoriteRoute = theRoute.favorite;
        }
        return {theRoute, uid};
    });
    return { lastRoute };
};

const summaryStyle = {
    divideSection: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    summary: {
      height: '100%',
      backgroundColor: '#5c688c',
    },
    summaryCard: {
      alignItems: 'center',
      backgroundColor: '#5c688c',
      zIndex: -1
    },
    summaryLabel: {
      fontSize: 17, 
      paddingLeft: 1, 
      flex: 1, 
      fontFamily: 'GillSans-Light',
      color: 'black'
    },
    iconSummary: { 
      width: '7%',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    summaryText:{
      marginTop: 5,
      fontSize: 17,
      fontFamily: 'GillSans-Light',
      paddingLeft: 10
    },
    favoriteButtonStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignSelf: 'center',
      height: '10%',
  
    },
    favoriteStyle: {
      fontFamily: 'GillSans-Light',
      fontSize: 20,
      color: '#fff' 
    },
    unAddStyle: {
        fontFamily: 'GillSans-Light',
        fontSize: 15,
        color: '#fff',
        justifyContent: 'center',
        alignSelf: 'center'
    }
}
  
export default connect(mapStateToProps, { lastRouteFetch })(SummaryPage); 
    

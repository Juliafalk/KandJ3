/*Here is the summary page, where the users latest route is displayed / JF 10/5 */

import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, ActivityIndicator, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { 
    Icon,    
    Button 
} from 'native-base';
import reducers from '../reducers';
import { connect } from 'react-redux';
import { lastRouteFetch } from '../actions';
import {
    MyInputCreateAccount, 
    MyButton,
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

    state = { loading: true };

    
    componentWillMount() {
        this.props.lastRouteFetch();
       
    }

    addRemoveFavorite (lastRoute){
        const { currentUser } = firebase.auth();
        if (favoriteRoute === false){
        firebase.database().ref(`/users/${currentUser.uid}/routes/${routeid}`)
           .update({ favorite: true });
        }
        else if (favoriteRoute === true){
            firebase.database().ref(`/users/${currentUser.uid}/routes/${routeid}`)
               .update({ favorite: false });
        }
    }

    renderSpinner() {
        if (this.state.loading) {
            return (
            <View style={summaryStyle.spinnerStyle} >
            <ActivityIndicator size="large"  />
            </View>
            );
        }
    }

    render() {
        const { lastRoute } = this.props;
    
       
         
        if(favoriteRoute == true ) {
            favoriteText = "Favorite!",
            iconName = "favorite",
            iconStyle = {
                color: '#d6b3d2',
                fontSize: 70
            },
            unAddText="Psst.. Press the heart to remove from favorites"  
        }

        else if (favoriteRoute == false){
            favoriteText = "Add to favorites!",
            iconName = "favorite-border",
            iconStyle = {
                color: '#ffffff',
                fontSize: 70
            },
            unAddText=""

        }

        else {
            favoriteText = "Add to favorites!",
            iconName = "favorite-border",
            iconStyle = {
                color: '#ffffff',
                fontSize: 70
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
        
          //Two types of gifs, will see if it is possible to store them as files later.. / JF(14/5)
          //https://media.giphy.com/media/xUPGcECDtcpmUDIeQw/giphy.gif
          //https://media.giphy.com/media/Hb3kDuX7tYHza/giphy.gif

        
       
        
        if(lastRoute.length > 0){
        return (
            <View style={summary} >
            <View style={{ marginLeft: 15, marginTop: 10 }}>
            <Icon name='close' 
            onPress={() => {Actions.Map()}} 
            style={{ fontSize: 50, color: 'white' }}
            />
            </View>
        
            <View style={divideSection}>
                <Image style={{ width: '90%', height: '50%'}} 
                source={require('./images/goldenband.png') /*Will probably changes picture later /JF (15/5)*/} />

            </View>
            <View style={summaryCard}>
            <LogCard>
                
                <LogCardItem>
                <Text style={summaryLabel}>{routeDate}</Text>
                </LogCardItem>

                <View style={{ backgroundColor: 'black', height: 0.5,  
                width: '100%',marginBottom: 8,}} />
                <LogCardItem>
                <View style={iconSummary} >
                    <Icon  name='ios-stopwatch-outline'/>
                </View>
                <Text style={summaryText}>Duration: {routeDuration}</Text>
                </LogCardItem>

                <LogCardItem />

                <LogCardItem >
                    <View style={iconSummary}>
                        <Icon name="ios-walk-outline" style={{fontSize: 28 }}/>
                    </View>
                    <Text style={summaryText}>Route distance: {routeDistance} km</Text>
                </LogCardItem>

                <LogCardItem />
                
                <LogCardItem>
                <View style={iconSummary} >
                    <Icon name="ios-trophy-outline" style={{fontSize: 24 }}/>   
                </View>
                <Text style={summaryText} >Your distance: {distanceTravelled} km</Text>
                </LogCardItem>
                <LogCardItem />
            </LogCard>
            </View>
            
            <View style={{marginTop: 10}}>
            <Button transparent style={favoriteButtonStyle} onPress={() => {this.addRemoveFavorite(lastRoute)}}>
                <Icon 
                type="MaterialIcons" 
                name={iconName} 
                style={iconStyle} />
                <Text style={favoriteStyle}>{favoriteText}</Text>
            </Button>
            <Text style={unAddStyle}>{unAddText}</Text>
            </View>
            </View>
            
            )
        }
        else {
            return (
            <View style={summary}>
                {this.renderSpinner()}
            </View>
            )
        }
        
    }
}

const mapStateToProps = state => {
    const lastRoute = _.map(state.lastRoute, (theRoute, uid) => {
        if (_.map(state.lastRoute).length > 0){
        routeid = uid; 
        routeDate = theRoute.date.toUpperCase();
        routeDistance = theRoute.actualDistance.toFixed(2);
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
      height: '10%'
    },
    summary: {
      height: '100%',
      backgroundColor: '#5c688c',
      paddingTop: '5%'
    },
    summaryCard: {
      alignItems: 'center',
      backgroundColor: '#5c688c',
      zIndex: -1
    },
    summaryLabel: {
      fontSize: 23, 
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
      fontSize: 20,
      fontFamily: 'GillSans-Light',
      paddingLeft: 10
    },
    favoriteButtonStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignSelf: 'center',
      height: 90,
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
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
  
export default connect(mapStateToProps, { lastRouteFetch })(SummaryPage); 
    

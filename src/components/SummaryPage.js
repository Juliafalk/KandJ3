/*Here a summare for the runner will be displayed,
a map, distance and total duration will be displayed.
Currently not is used, have to figure out how to send props and state 
between diffrent pages / JF (18/4) */

import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, ActivityIndicator, Image} from 'react-native';
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
import { lastRouteFetch } from '../actions/LastRouteAction';
import {
    LogCard,
    LogCardItem,
  } from './common';
  

var routeid;
var routeDate;
var routeDistance;
var routeDuration;
var distanceTravelled;


class SummaryPage extends React.Component { 
    
    componentWillMount() {
        this.props.lastRouteFetch();
        console.log(this.props)
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps')
        console.log(nextProps)
        this.createDataSource(nextProps);
        
    }

    createDataSource({ lastRoute }) {
        
          
           const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.dataSource = ds.cloneWithRows(lastRoute)
            
         
    }

    renderRow(lastRoute){
        console.log('where?')
        console.log(lastRoute)

        return null;

    //            return <LastRoute route={route} />;
    }
    
    removeFavorite (lastRoute){
        const { currentUser } = firebase.auth();
        console.log('currentUser')
        console.log(currentUser)
        const UID = lastRoute.uid;
        console.log(lastRoute)
        firebase.database().ref(`/users/${currentUser.uid}/routes/${routeid}`)
           .update({ favorite: true });
    }


    render() {

        const { lastRoute } = this.props;
        const {
            divideSection,
            summary,
            summaryCard,
            summaryLabel,
            iconSummary,
            summaryText,
            favoriteButtonStyle,
            favoriteStyle,
          } = summaryStyle
      
        return (

            <View style={summary} >
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

            <Button transparent style={favoriteButtonStyle} onPress={() => {this.removeFavorite(lastRoute)}}>
                <Icon type="MaterialIcons" name="favorite-border" style={{ color:'#fff', fontSize: 50}} />
                <Text style={favoriteStyle}>Add to favorite</Text>
            </Button>

            </View>
        )
        
    
}
}

const mapStateToProps = state => {

    console.log('state.lastRoute')
    console.log(_.map(state.lastRoute).length)
    //const lastRoute = (state.lastRoute)
    
   
    const lastRoute = _.map(state.lastRoute, (theRoute, uid) => {
        if (_.map(state.lastRoute).length > 0){
        routeid = uid; 
        routeDate = theRoute.date.toUpperCase();
        routeDistance = theRoute.actualDistance;
        routeDuration = theRoute.TOTAL_DURATION;
        distanceTravelled = theRoute.DISTANCE_TRAVELLED;

        }
        return {theRoute, uid};
    });
  
   
    return { lastRoute };
};

const summaryStyle = {
    divideSection: {
      //height: '30%',

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
  }
  

export default connect(mapStateToProps, { lastRouteFetch })(SummaryPage); 
    
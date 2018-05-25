//Here is the summary page, where the users latest route is displayed directly after a run
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image} from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Icon, Button } from 'native-base';
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
    
         //Changing the style on the heart depending on if the route is favorite or not.
        if(favoriteRoute == true ) {
            favoriteText = "Favorite!",
            iconName = "favorite",
            iconStyle = {
                color: '#d6b3d2',
                fontSize: 70
            },
            unAddText="Psst.. Press the heart to remove from Favorites"  
        }

        else if (favoriteRoute == false){
            favoriteText = "Add to Favorites!",
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
            viewMarginStyle,
            summaryCard,
            summaryLabel,
            viewSummaryStyle,
            backButtonStyle,
            iconSummary,
            summaryText,
            favoriteButtonStyle,
            favoriteStyle,
            unAddStyle,
            imageStyle,
            imageBandStyle,
        } = summaryStyle

        if(lastRoute.length > 0){
            return (
                <View style={summary} >
                    <View style={viewMarginStyle}>
                        <Icon name='ios-arrow-back' 
                        onPress={() => {Actions.Map()}} 
                        style={backButtonStyle}
                        />
                    </View>

                <View >
                    <Image style={imageStyle}
                    source={require('./images/greatJob.png')} />
                </View>

                <View style={{marginTop: 10}}>
                    <View style={divideSection}>
                        <Image style={imageBandStyle} 
                        source={require('./images/goldenband.png')} />
                    </View>

                    <View style={summaryCard}>
                    <LogCard>
                        
                        <LogCardItem>
                            <Text style={summaryLabel}>{routeDate}</Text>
                        </LogCardItem>

                        <View style={viewSummaryStyle} />
                        <LogCardItem>
                            <View style={iconSummary} >
                                <Icon  name='ios-stopwatch-outline'/>
                            </View>
                            <Text style={summaryText}>Duration: {routeDuration}</Text>
                        </LogCardItem>

                        <LogCardItem />

                        <LogCardItem >
                            <View style={iconSummary}>
                                <Icon name="ios-walk-outline" style={{fontSize: 37 }}/>
                            </View>
                            <Text style={summaryText}>Route Distance: {routeDistance} km</Text>
                        </LogCardItem>

                        <LogCardItem />
                        
                        <LogCardItem>
                        <View style={iconSummary} >
                            <Icon name="ios-trophy-outline" style={{fontSize: 26 }}/>   
                        </View>
                        <Text style={summaryText} >Your Distance: {distanceTravelled} km</Text>
                        </LogCardItem>

                        <LogCardItem />

                    </LogCard>
                    </View>

                    <View style={divideSection}>
                        <Image style={imageBandStyle} 
                        source={require('./images/goldenband.png')} />
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

const summaryStyle = {
    divideSection: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '5%'
    },
    summary: {
      height: '100%',
      backgroundColor: '#5c688c',
      paddingTop: '5%'
    },
    viewMarginStyle: {
        marginLeft: 15, 
        marginTop: 10 
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
    backButtonStyle: { 
        fontSize: 50, 
        color: 'white'
    },
    viewSummaryStyle: {
        backgroundColor: 'black', 
        height: 0.5,  
        width: '100%',
        marginBottom: 8
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
    },
    imageStyle: {
        width: 150, 
        height: 150, 
        marginLeft: 110
    },
    imageBandStyle: {
        width: '95%', 
        height: '70%'
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

export default connect(mapStateToProps, { lastRouteFetch })(SummaryPage); 
    

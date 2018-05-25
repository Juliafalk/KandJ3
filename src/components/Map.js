/*This file includes the map with functions to generate the routes,
choose another starting location, tracking the user's run, etc.*/

import React, { Component } from 'react';
import { 
  Alert,
  Dimensions,
  Keyboard,
  TextInput,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Stopwatch } from 'react-native-stopwatch-timer'
import pick from 'lodash/pick';
import { Button, Text, Icon } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geocoder from 'react-native-geocoding';
import firebase from 'firebase';
import haversine from 'haversine';
import { connect } from 'react-redux';
import { runAgain, runAgainMode } from '../actions';
import { Actions } from 'react-native-router-flux';
import { DistanceInput } from './common';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.00922; //a universal value for the default zoom of the map
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO*0.1;
const DISTANCE_TRAVELLED = 0;
const TOTAL_DURATION = 0;

const GOOGLE_MAPS_APIKEY = 'AIzaSyA8Iv39d5bK-G9xmvsbOMRHBv7QFa8710g';
Geocoder.init(GOOGLE_MAPS_APIKEY);
class Map extends Component {

  static navigationOptions = {
    drawerIcon: (
        <Icon name='ios-map-outline' style={{ color: 'white'}} />
    )
  }

  constructor(props) {
    super(props);

    this.state = { 
      initialPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      initialPositionMarker: {
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      currentPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      distanceTravelled: 0,
      actualDistance: 0,
      favorite: false,
      prevLatLng: {},
      wantedDistance: '',
      createRouteDisabled: true,
      createRoute: false,
      startRunning: false,
      stopwatchStart: false,
      stopwatchReset: false,
      totalDuration: 0,
      date: 0, 
      pauseRunning: false,
      createdRoute: false
    }
    this.mapView = null;  
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  watchID: ?number = null;
  
  componentDidMount() {
    if(firebase.auth().currentUser == null){
      this.resetMap()
    }
    navigator.geolocation.getCurrentPosition((position) => {
      //Uses the user's current position
     this.setState({ 
      initialPosition: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, 
      initialPositionMarker: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      currentPosition: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      });
      //this.fitMapToCoords(position.coords.latitude, position.coords.longitude);
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

    this.watchID = navigator.geolocation.watchPosition(
      position => {

        const { distanceTravelled } = this.state
        const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude} 

        this.setState({
          initialPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          currentPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
          prevLatLng: newLatLngs 
        });
      }
    );
  }

  calcDistance(newLatLng) {
    const { prevLatLng } = this.state
    return (haversine(prevLatLng, newLatLng) || 0 )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  };

  /*THE ROUTE ALGORITHM
  We create an imaginary circle with the circumference equal to the specified distance
  We add [circlePoints] number of waypoints in a perfect circle on the circumference
  The first and final waypoint is the startpoint [this.state.initialPosition]
  We then set the redux state to the generated waypoints and when this class is rendered, the directionService will make a route 
  through these waypoints*/
  routeGenerator(length) {

    const waypoints = [];
 
    lengthInMeters = length*1000;
    lengthInMeters = lengthInMeters*0.7; //uses 70% of the circumference of the input to compensate for roads not following the outline of the circle
    waypoints[0] = this.state.initialPosition;
    var circlePoints = 4;
    const radius = lengthInMeters/2/Math.PI;
    const degrees = [];
    const direction = Math.random()*2*Math.PI;  //Random starting direction in radians
    //Locate the circle center point that is radius meters away from the initialPosition in the direction chosen
    var dx = radius*Math.cos(direction); 
    var dy = radius*Math.sin(direction);
    var delta_lat = dy/110540; //converts the distance to move from meters to coordinates
    var delta_lng = dx/(111320*Math.cos(this.state.initialPosition.latitude*Math.PI/180));
    const center = {
      latitude: this.state.initialPosition.latitude+delta_lat,
      longitude: this.state.initialPosition.longitude+delta_lng
    }

    //Place the waypoints in a perfect circle
    degrees[0] = direction + Math.PI;
    const sign = -1; //Clockwise
    for (const i=1;i<circlePoints+1;i++) {
        degrees[i] = degrees[i-1] + sign*2*Math.PI/(circlePoints+1);
        dx = radius*Math.cos(degrees[i]);
        dy = radius*Math.sin(degrees[i]);
        delta_lat = dy/110540;
        delta_lng = dx/(111320*Math.cos(center.latitude*Math.PI/180));
        const nextCoord = {
          latitude: center.latitude+delta_lat,
          longitude: center.longitude+delta_lng
        }
        waypoints[i] = nextCoord;
    }
    waypoints[circlePoints+1] = this.state.initialPosition;

    //sets the redux state
    this.props.runAgain(waypoints);
  }

  //Change states when user is typing
  changeDistance(userInput) {
    if (userInput === '') {
      this.setState({
        createRouteDisabled: true,
        createdRoute: false
      })
    }
    else {
      this.setState({
        createRouteDisabled: false,
      })
    }
  }

  //When the user is done running a route the information about the route and the run is stored in the database
  toDatabase() {
    var date= new Date().toDateString()
    const { totalDuration, actualDistance, favorite } = this.state;
    const { WAYPOINTS } = this.props;
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/routes`)
        .push({ WAYPOINTS, TOTAL_DURATION, DISTANCE_TRAVELLED, date, actualDistance, favorite });
    return(
      this.setState({
          totalDuration: 0,
          DISTANCE_TRAVELLED: 0,
          date: 0
      })
    );
  }

  resetMap(){
    this.props.runAgain('');
    this.setState({ actualDistance: '' })
  }

  //Allows the user to choose a starting point
  chooseStartpoint(){
    if (!this.state.startRunning) {
      return(
        <GooglePlacesAutocomplete
        placeholder='Choose another starting point...'
        styles={{
          listView: {
            backgroundColor: 'white',
            opacity: 0.8,
          },
          textInput: {color: 'rgb(65,127,225)',  fontSize: 14},
          textInputContainer: {backgroundColor: '#5c688c'} 
          }}
          returnKeyType={'search'}
          onPress={(data = null) => {
            Geocoder.from(data.description)
              .then(json => {
                var location = json.results[0].geometry.location;
                this.setState({
                  initialPosition: {
                    latitude: location.lat,
                    longitude: location.lng
                  },
                  initialPositionMarker: {
                    latitude: location.lat,
                    longitude: location.lng
                  },
                  currentPosition: {
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                  }
                });
                if (!this.props.RUN_AGAIN_MODE){
                  this.fitMapToCoords(location.lat, location.lng);
                }
              })
              .catch(error => console.warn(error))
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
        />
      );
    }
    else{
      return(
        null
      );
    }
  }

  fitMapToCoords(lat, lng){
    const coords = [{latitude: lat, longitude: lng}];
    this.mapView.fitToCoordinates(coords, {
      edgePadding: {
        right: (width / 15),
        bottom: (height / 15),
        left: (width / 15),
        top: (height / 15),
      }
    });
  }

  //Shows different footers before running and while running
  renderFooter(){
    const {
      createRouteContainerStyle,
      createRouteButtonStyle,
      inputContainerStyle,
      distanceContainer,
      textInputStyle,
      actualDistanceStyle,
      distanceTravelledStyle,
      timeContainer,
      pauseDoneContainer,
      pauseDoneButton,
      startButtonStyle
    } = styles;
    const {
      wantedDistance,
      createRouteDisabled,
      distanceTravelled,
      stopwatchStart,
      stopwatchReset,
      startRunning,
      pauseRunning,
      totalDuration,
      createdRoute,
      actualDistance
    } = this.state;
    const {
      RUN_AGAIN_MODE
    } = this.props;

    if (startRunning){
      return(
        <View style={{backgroundColor: '#5c688c'}}>
          <View style={createRouteContainerStyle}>
            <Text style={distanceTravelledStyle}>
              {distanceTravelled.toFixed(2)} km 
            </Text>
          <View style={timeContainer}>
            <Icon name='time' style={{fontSize: 25, marginTop: 4, color: 'white'}}/>
            <Stopwatch
              start={stopwatchStart}
              options={options}
              reset={stopwatchReset}
              getTime={(time) => this.getFormattedTime(time)}
            />
          </View>
          </View>
          <View style={pauseDoneContainer}>
            <Button
              warning
              style={pauseDoneButton}
              onPress={() => {this.setState({ startRunning: true, pauseRunning: !pauseRunning }),
                this.toggleStopwatch()}}>
                <Icon 
                style={{fontSize: 25}}
                type='FontAwesome'
                name={pauseRunning ? 'play': 'pause'}
                />
            </Button>
            <Button
              success
              iconLeft
              style={pauseDoneButton}          
              onPress={() =>  {this.setState({ pauseRunning: true, stopwatchStart: false }),
                DISTANCE_TRAVELLED = parseFloat(distanceTravelled.toFixed(2)), 
                Alert.alert(
                  'Done running?',
                  '', 
                  [
                    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Yes', onPress: () => {Actions.summary(), this.setState({ totalDuration: TOTAL_DURATION }),
                      this.toDatabase(), this.resetMap()}
                    },
                  ],
                  { cancelable: false }
                )
              }}>
                <Icon type='FontAwesome' name='check' />
                <Text style={{fontSize: 16}}>Done</Text>
            </Button>
          </View>
      </View>
      );
    }
    else {
      return(
        <View>
          <View style={createRouteContainerStyle}>
            <View style={actualDistanceStyle}>
              <Text style={{ fontSize: 12, color: 'white'}}>This Route:</Text>
              <Text style={{ color: 'white' }}>{actualDistance.toFixed(2)} km</Text>
            </View>
            <View style={inputContainerStyle}>
              <DistanceInput
                keyboardType='number-pad'
                placeholder='...'
                value={wantedDistance}
                onChangeText={userInput => 
                  {this.setState({
                  wantedDistance: userInput}),
                  this.changeDistance(userInput)}}/>
            </View>
            <Button
              style={createRouteButtonStyle}
              disabled ={createRouteDisabled}
              onPress={() => {this.routeGenerator(wantedDistance)
              this.setState({ createdRoute: true }), this.props.runAgainMode(false), Keyboard.dismiss}}>
                <Text style={{ fontSize: 11 }}>{createdRoute ? 'Another Route' : 'Create Route'}</Text>
            </Button>
          </View>
          { RUN_AGAIN_MODE || createdRoute ? 
            <Button
              block
              success
              style={startButtonStyle}
              onPress={() => {this.setState({ startRunning: true, distanceTravelled: 0, wantedDistance: '' }), 
              this.resetStopwatch(), this.toggleStopwatch()}}> 
    +           <Text style={{ fontSize: 20 }}>Start</Text>
           
            </Button>
          : null }
      </View>
      );
    }
  }

  //These three functions handle the stopwatch used to track the user's runtime
  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }
  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  getFormattedTime(time) {
    this.currentTime = time;
    TOTAL_DURATION = time;
  };

  //MapView draws the route between all waypoints
  render() {

    const {
      distanceContainer,
      mapPageContainer,
      mapStyle,
      timeContainer,
      pauseDoneContainer,
      pauseDoneButton
    } = styles;
    const {
      wantedDistance,
      createRouteDisabled,
      distanceTravelled,
      stopwatchStart,
      stopwatchReset,
      pauseRunning,
      totalDuration,
      actualDistance
    } = this.state;
    const {
      WAYPOINTS,
    } = this.props;

    if (firebase.auth().currentUser){
    return (
     
      <KeyboardAwareScrollView	        
             resetScrollToCoords={{ x: 0, y: 0 }}	             
             contentContainerStyle={styles.scrollViewContainer}	           
             scrollEnabled={false}	             
             >
      <View style={mapPageContainer}>
        <MapView
          provider={"google"}
          showsUserLocation={true}
          followUserLocation={true}
          region={this.state.currentPosition}
          onRegionChange={ currentPosition => this.setState({currentPosition}) }
          onRegionChangeComplete={ currentPosition => this.setState({currentPosition}) }
          showsMyLocationButton
          show 
          style={mapStyle}
          ref={c => this.mapView = c}
         >
          <View
            style={{ height: '27%' }}>
            {this.chooseStartpoint()}
          </View>
          <MapView.Marker 
            coordinate={this.state.initialPositionMarker} 
          />
            <MapViewDirections
              origin={WAYPOINTS[0]}
              waypoints={ (WAYPOINTS.length > 2) ? WAYPOINTS.slice(1, -1): null}
              destination={WAYPOINTS[WAYPOINTS.length-1]}
              mode={"walking"}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              
              onStart={(params) => {
                //console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}

                //Generates a new route when the route is more than 10% too short or too long
                //Also when an error accures a new route is generated
              onReady={(result) => {
                /*if (!this.props.RUN_AGAIN_MODE && result.distance < parseFloat(this.state.wantedDistance)*0.9){
                  this.routeGenerator(this.state.wantedDistance)
                }
                else if (!this.props.RUN_AGAIN_MODE && result.distance > parseFloat(this.state.wantedDistance)*1.1) {
                  this.routeGenerator(this.state.wantedDistance)
                }*/
                //else {
                  this.setState({ actualDistance: result.distance })
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: (width / 15),
                      bottom: (height / 15),
                      left: (width / 15),
                      top: (height / 15),
                    }
                  });
                //}
              }}
              onError={(errorMessage) => {
                 console.log('GOT AN ERROR');
                 this.routeGenerator(this.state.wantedDistance)
              }}
            />
        </MapView>
          {this.renderFooter()}
        </View>
      </KeyboardAwareScrollView>
    );
  }
  else {
    return null;
  }
  }
}

//****STYLING*****//
const styles = {
  mapPageContainer: {
    height: '100%',
    backgroundColor: '#5c688c'
  },
  mapStyle: {
    height: '81.6%'
  },
  createRouteContainerStyle: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  distanceContainer: {
    width: '35%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  timeContainer: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: -15
  },
  distanceTravelledStyle: {
    fontSize: 25,
    color: 'white',
    paddingLeft: 15,
    marginTop: 5,
  },
  inputContainerStyle: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputStyle: {
    width: '60%',
    height: 40,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    color: 'white',
    backgroundColor: '#7785ad',
    textAlign: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white'
  },
  actualDistanceStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createRouteButtonStyle: {
    width: 105,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonStyle: {
    marginTop: 10
  },
  pauseDoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 9
  },
  pauseDoneButton: {
    width: '33%',
    marginRight: 5,
    marginLeft: 5
  },
  scrollViewContainer: {	  
    flex: 1,	    
    justifyContent: 'center',	           
  }	
}

//Styling for the stopwatch
const options = {
  container: {
    padding: 5,
    width: '100%'
  },
  text: {
    fontSize: 25,
    color: 'white',
    marginLeft: 2,
  }
};

const mapStateToProps = state => {
    return {
        WAYPOINTS: state.runAgain.wayPoints,
        RUN_AGAIN_MODE: state.runAgain.runAgainMode
    };
};

export default connect(mapStateToProps, { runAgain, runAgainMode })(Map); 

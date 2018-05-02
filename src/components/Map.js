import React, { Component } from 'react';
import { 
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView, 
  TextInput,
  View,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Stopwatch } from 'react-native-stopwatch-timer'
import { SwitchNavigator } from 'react-navigation';
import pick from 'lodash/pick';
import { Button, Text, Icon, CardItem, Card } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import firebase from 'firebase';
import haversine from 'haversine';
import {
  LogCard,
  LogCardItem,
  MyInput
} from './common';
//import SummaryPage from './SummaryPage';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.00922; //JL 13/4: 'the angle in which you're viewing', a universal value
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO*0.1;
const DISTANCE_TRAVELLED = 0; //This is to calculate how long distance that has been travelled / JF (18/4)

//JL 11/4: the points the route should go through (including start and end point)
const waypoints = [];

//JL 18/4: time spent runnning
const TOTAL_DURATION = 0;

const GOOGLE_MAPS_APIKEY = 'AIzaSyA8Iv39d5bK-G9xmvsbOMRHBv7QFa8710g';
Geocoder.init(GOOGLE_MAPS_APIKEY);

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      //intialPosition - to generate routes, it is the start position / JF (16/4)
      initialPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      //initialPositionMarker - to place the marker at the initialPosition, 
      //ev. could be same as initialPosition / JF (16/4)
      initialPositionMarker: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      //currentPosition - to update the users current position / JF (16/4)
      currentPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      chosenStartpoint: '',
      distanceTravelled: 0,
      actualDistance: 0,
      prevLatLng: {},
      wayPoints: [],
      wantedDistance: '',
      createRoute: true,
      startButton: true,
      startRunning: false,
      stopwatchStart: false,
      stopwatchReset: false,
      totalDuration: 0,
      date: 0, 
      pauseRunning: false
    }

    this.mapView = null;  
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }
  watchID: ?number = null; // from tutorial, red marked but it works! / JL (13/4) 
 //Do we need this? /JF 18/4 

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      // Here set all the positions, given by the devices current position. 
     this.setState({ 
      initialPosition: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude, 
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }, 
      initialPositionMarker: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      currentPosition: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
        //wayPoints: [],
        //wantedDistance: ''
      });
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
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
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
    //console.log(this.wacthID)
    navigator.geolocation.clearWatch(this.watchID)
  }

  //JL 11/4: press on the map and add another point that the route will go through
  onMapPress = (e) => {
    this.setState({
      wayPoints: [
        ...this.state.wayPoints,
        e.nativeEvent.coordinate,
      ],
    });
  }

  /*JL 11/4: this is a rather complicated function but I will try to explain it in a simple way
  we create a center point of a circle with a radius that is dependent on the length of the route
  from the center point we create [circlePoints] number of waypoints in a perfect circle around the center
  we add the startpoint [this.state.initialPosition], all the generated waypoint and the endpoint [this.state.initialPosition] to
  the array waypoints
  we then set this.state.wayPoints to waypoints and when rendered, the directionService will make a route 
  through these points*/
  routeGenerator(length) {

    lengthInMeters = length*1000;
    lengthInMeters = lengthInMeters*0.7; //only takes 80% of the input to compensate, since the generated route is almost 'always' too long
    waypoints[0] = this.state.initialPosition;
    var circlePoints = 4;
    const radius = lengthInMeters/2/Math.PI;
    const deg = [];
    const direction = Math.random()*2*Math.PI;  //in radians
    //Locate the point that is radius meters away from the initialPosition in the direction chosen.
    //length assumed in meters, and then deltas in degrees.
    var dx = radius*Math.cos(direction); //convert the direction from radians to degrees
    var dy = radius*Math.sin(direction);
    var delta_lat = dy/110540; //not sure about the numbers 110540 and 111320, but hey ho it works!
    var delta_lng = dx/(111320*Math.cos(this.state.initialPosition.latitude*Math.PI/180));
    const center = {
      latitude: this.state.initialPosition.latitude+delta_lat,
      longitude: this.state.initialPosition.longitude+delta_lng
    }

    //Find circlePoints other points to use
    //First, call the initial direction direction+180, since we are looking in the opposite direction.
    deg[0] = direction + Math.PI;
    const sign = -1; //Clockwise

    for (const i=1;i<circlePoints+1;i++) {
        deg[i] = deg[i-1] + sign*2*Math.PI/(circlePoints+1);
        dx = radius*Math.cos(deg[i]);
        dy = radius*Math.sin(deg[i]);
        delta_lat = dy/110540;
        delta_lng = dx/(111320*Math.cos(center.latitude*Math.PI/180));
        const nextCoord = {
          latitude: center.latitude+delta_lat,
          longitude: center.longitude+delta_lng
        }
        waypoints[i] = nextCoord;
    }
    waypoints[circlePoints+1] = this.state.initialPosition;

    this.setState({
      wayPoints: waypoints
    });
    console.log(waypoints)
  }

  //JL 17/4: disable and enable the footer buttons
  changeDistance(userInput) {
    if (userInput === '') {
      this.setState({
        createRoute: true,
        startButton: true
      })
    }
    else {
      this.setState({
        createRoute: false,
      })
    }
  }

  //JG 18/4 will send information about the route to the database
  toDatabase() {
    var date= new Date().toDateString()
    const { wayPoints, totalDuration, actualDistance } = this.state;
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/routes`)
        .push({ wayPoints, TOTAL_DURATION, DISTANCE_TRAVELLED, date, actualDistance });
    return(
      this.setState({
          wayPoints: [],
          totalDuration: 0,
          DISTANCE_TRAVELLED: 0 ,
          date: 0   
      })
    );
  }

  //JL 25/4: allows user to choose starting point
  chooseStartpoint(){
    if (!this.state.startRunning) {
      return(
        <GooglePlacesAutocomplete
        placeholder='Current location'
        placeholderTextColor='rgb(65,127,225)'
        styles={{
          listView: {
            backgroundColor: 'white',
            opacity: 0.8,
          },
          textInput: {color: 'rgb(65,127,225)'},
          textInputContainer: {backgroundColor: '#5c688c', opacity: 0.5,} 
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
                  }
                });
              })
              .catch(error => console.warn(error))
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_MAPS_APIKEY,
            language: 'en', // language of the results
          }}
          renderLeftButton={() => <Icon type='EvilIcons' name='location' 
            style={{marginTop: 8, marginLeft: 3, color: 'white'}}/>}
        />
      );
    }
    else{
      return(
        null
      );
    }
  }

  //JL 17/4: shows different footers before and while running
  startRunning(){
    //JL 18/4: deconstruction of styles and states
    const {
      createRouteContainerStyle,
      createRouteButtonStyle,
      inputContainerStyle,
      distanceContainer,
      textInputStyle,
      actualDistanceStyle,
      startButtonStyle,
      distanceTravelledStyle,
      timeContainer,
      pauseDoneContainer,
      pauseDoneButton
    } = styles;
    const {
      wantedDistance,
      actualDistance,
      createRoute,
      startButton,
      distanceTravelled,
      stopwatchStart,
      stopwatchReset,
      pauseRunning,
      totalDuration
    } = this.state;

    if (!this.state.startRunning){
      return(
        <View>
          <View style={createRouteContainerStyle}>
            <View style={actualDistanceStyle}>
              <Text style={{ fontSize: 12, color: 'white'}}>This Route:</Text>
              <Text style={{ color: 'white'}}>{actualDistance.toFixed(2)} km</Text>
            </View>
            <View style={inputContainerStyle}>
              <TextInput
                keyboardType='number-pad'
                placeholder='..km'
                style={textInputStyle}
                maxLength={2}
                value={wantedDistance}
                onChangeText={userInput => 
                  {this.setState({
                  wantedDistance: userInput}),
                  this.changeDistance(userInput)}}
              />
            </View>
            <Button
              info
              
              style={createRouteButtonStyle}
              disabled ={createRoute}
              onPress={() => {this.routeGenerator(wantedDistance), 
              this.setState({ startButton: false }), Keyboard.dismiss}}>
                <Text style={{ fontSize: 14 }}>Create Route</Text>
            </Button>
          </View>
          <Button
          full
          success
          disabled={startButton}
          style={startButtonStyle}
          onPress={() => {this.setState({ startRunning: true, distanceTravelled: 0 }), 
            this.resetStopwatch(), this.toggleStopwatch()}}>
            <Text>Start</Text>
        </Button>
      </View>
      );
    } 
    else {
      return(
        <View style={{backgroundColor: '#5c688c'}}>
          <View style={createRouteContainerStyle}>
            <Text style={distanceTravelledStyle}>
              {distanceTravelled.toFixed(2)} km 
            </Text>
          <View style={timeContainer}>
            <Icon name='time' style={{fontSize: 25, marginTop: 6}}/>
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
                this.toggleStopwatch()}}
              >
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
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {this.SummaryPage(), this.setState({ totalDuration: TOTAL_DURATION }), this.toDatabase()}
                    },
                  ],
                  { cancelable: false }
                )
              }}>
                <Icon type='FontAwesome' name='check' />
                <Text>Done</Text>
            </Button>
          </View>
      </View>
      );
    }
  }

  SummaryPage() {
    this.props.navigation.navigate('SummaryView', {
      durationTime: TOTAL_DURATION,
      totalDistance: DISTANCE_TRAVELLED,
    });
  }

  //JL 17/4: these three functions handle the stopwatch used to track the user's runtime
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
  //****//

  //JL 11/4: the render function adds markers at all waypoints and draws the route inbetween them
  render() {
    const {
      inputContainerStyle,
      distanceContainer,
      startButtonStyle,
      distanceTravelledStyle,
      timeContainer,
      pauseDoneContainer,
      pauseDoneButton
    } = styles;
    const {
      wantedDistance,
      actualDistance,
      createRoute,
      startButton,
      distanceTravelled,
      stopwatchStart,
      stopwatchReset,
      pauseRunning,
      totalDuration
    } = this.state;

    return (
      <View style={styles.mapPageContainer}>
        <MapView
          provider={"google"}
          showsUserLocation={true}
          followUserLocation={true}
          region={this.state.currentPosition}
          onRegionChange={ currentPosition => this.setState({currentPosition}) }
          onRegionChangeComplete={ currentPosition => this.setState({currentPosition}) }
          showsMyLocationButton
          show 
          style={styles.mapStyle}
          ref={c => this.mapView = c}
         >
          <View>
            {this.chooseStartpoint()}
          </View>
          <MapView.Marker 
            coordinate={this.state.initialPositionMarker} 
          />

          {(this.state.wayPoints.length >= 2) && (
            <MapViewDirections
              origin={this.state.wayPoints[0]}
              waypoints={ (this.state.wayPoints.length > 2) ? this.state.wayPoints.slice(1, -1): null}
              destination={this.state.wayPoints[this.state.wayPoints.length-1]}
              mode={'walking'}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              
              onStart={(params) => {

                //console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}

                //Generate a new route when the route is 10% to short or to small
                //Also when an error accures a new route is generated / JF 17/4
              onReady={(result) => {
                if (result.distance < parseFloat(this.state.wantedDistance)*0.9){
                  this.routeGenerator(this.state.wantedDistance)
                }
                else if (result.distance > parseFloat(this.state.wantedDistance)*1.1) {
                  this.routeGenerator(this.state.wantedDistance)
                }
                else {
                  this.setState({ actualDistance: result.distance })
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: (width / 15),
                      bottom: (height / 15),
                      left: (width / 15),
                      top: (height / 15),
                    }
                  });
              }
              }}
              onError={(errorMessage) => {
                 console.log('GOT AN ERROR');
                 this.routeGenerator(this.state.wantedDistance)
              }}
            />
          )}

        </MapView>
          {this.startRunning()}
      </View>
    );
  }
}

//to add markers at the coords for the waypoints insert this at row ish 113
//inbetween the <MapView/> and <MapViewDirections/>
/*
  {this.state.wayPoints.map((coordinate, index) =>
    <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
  )}
*/

//****STYLING*****//
//Obs, styling for clock is in the bottom under const options / JF (18/4)
const styles = {
  mapPageContainer: {
    height: '96%',
    backgroundColor: '#5c688c'
  },
  mapStyle: {
    height: '80%'
  },
  createRouteContainerStyle: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems: 'center',
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
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: -15
  },
  distanceTravelledStyle: {
    fontSize: 25
  },
  inputContainerStyle: {
    width: '30%',
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
    marginRight: 15,
  },
  createRouteButtonStyle: {
    width: '30%',
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
    width: '30%',
    marginRight: 5,
    marginLeft: 5
  },
  divideSection: {
    //height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseStartpointStyle: {
    backgroundColor: 'white',
    opacity: 0.8
  },
  summary: {
    height: '100%',
    backgroundColor: '#5c688c'
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
  }
}

//This is styling for the timer / JF (18/4)
const options = {
  container: {
    padding: 5,
    width: '100%'
  },
  text: {
    fontSize: 25,
    color: 'black',
    marginLeft: 2,
  }
};
 
/****************HERE STARTS A NEW CLASS FOR SUMMARYPAGE*****************/
class TheSummary extends React.Component {
  static navigationOptions = {
      title: 'SummaryView'
  };
  render() {
    const { params } = this.props.navigation.state;
    const durationTime = params ? params.durationTime : null;
    const totalDistance = params ? params.totalDistance : null;
    const date= new Date().toDateString()

    return (
        <View style={styles.summary} >
        <View style={{ marginLeft: 15, marginTop: 10 }}>
        <Icon name='close' 
          onPress={() => {this.props.navigation.navigate('Home')}} 
          style={{ fontSize: 50, color: 'red' }}
        />
        </View>
        <View style={styles.divideSection}>
            < Image style={{ height: 90, width: 90}}  
            source={require('./images/finisher.png')}/>
        </View>
        <View style={styles.summaryCard}>
        <LogCard>
                    <LogCardItem>
                        <Text style={styles.summaryLabel} >
                        {date.toUpperCase()}</Text>
                    </LogCardItem>
                    <View style={{ backgroundColor: 'black', height: 0.5,  
                    width: '100%',marginBottom: 8,}} />
                    <LogCardItem>
                    <View style={styles.iconSummary} >
                        <Icon  name='ios-stopwatch-outline'/>
                    </View>
                        <Text style={styles.summaryText}>Duration: {durationTime}</Text>
                    </LogCardItem>
                    <LogCardItem block >
                    <View style={styles.iconSummary} >
                        <Icon  name="ios-walk-outline"/>
                    </View>
                        <Text style={styles.summaryText} >Your distance: {totalDistance} km</Text>
                    </LogCardItem>
                </LogCard>

        </View>

        </View>

    );  
  }
};

export default SwitchNavigator({
  Home: { screen: Map },
  SummaryView: {screen: TheSummary}
});

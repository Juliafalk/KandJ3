import React, { Component } from 'react';
import { 
  Alert,
  Dimensions,
  KeyboardAvoidingView, 
  TextInput,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Stopwatch } from 'react-native-stopwatch-timer'
import pick from 'lodash/pick';
import { Button, Text, Icon } from 'native-base';
import firebase from 'firebase';
import haversine from 'haversine';

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
const totalDuration = 0;

const GOOGLE_MAPS_APIKEY = 'AIzaSyA8Iv39d5bK-G9xmvsbOMRHBv7QFa8710g';

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

        console.log('Update frequently? ' + parseFloat(this.state.distanceTravelled.toFixed(2)))  
      });
  }

  calcDistance(newLatLng) {
    const { prevLatLng } = this.state
    return (haversine(prevLatLng, newLatLng) || 0 )
  }

  componentWillUnmount() {
    console.log(this.wacthID)
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
    lengthInMeters = lengthInMeters*0.8; //only takes 80% of the input to compensate, since the generated route is almost 'always' too long
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
        console.log('nextCoord' + nextCoord )
    }
    waypoints[circlePoints+1] = this.state.initialPosition;

    this.setState({
      wayPoints: waypoints
    });
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
    console.log(DISTANCE_TRAVELLED)
      const { wayPoints, totalDuration } = this.state;
      const { currentUser } = firebase.auth();
      firebase.database().ref(`/users/${currentUser.uid}/routes`)
          .push({ wayPoints, totalDuration, DISTANCE_TRAVELLED });
      return(
      this.setState({
          wayPoints: [],
          totalDuration: 0,
          DISTANCE_TRAVELLED: 0    
      })
      
      );
     
  }

  //JL 17/4: shows different footers before and while running
  startRunning(){
    if (!this.state.startRunning){
      return(
        <View>
          <View style={styles.createRouteContainerStyle}>
            <View style={styles.inputContainerStyle}>
              <TextInput
                keyboardType='number-pad'
                style={styles.textInputStyle}
                maxLength={2}
                value={this.state.wantedDistance}
                onChangeText={userInput => 
                  {this.setState({
                  wantedDistance: userInput}),
                  this.changeDistance(userInput)}}
              />
              <Text>km</Text>
            </View>
            <View style={styles.actualDistance}>
              <Text style={{ fontSize: 12}}>Distance:</Text>
              <Text>{this.state.actualDistance} km</Text>
            </View>
            <Button
              style={styles.createRouteButtonStyle}
              disabled={this.state.createRoute}
              onPress={() => {this.routeGenerator(this.state.wantedDistance), 
              this.setState({ startButton: false })}}>
                <Text style={{ fontSize: 14 }}>Create Route</Text>
            </Button>
          </View>
          <Button
          block
          success
          //disabled={this.state.startButton}
          style={styles.startButtonStyle}
          onPress={() => {this.setState({ startRunning: true, distanceTravelled: 0 }), 
            this.resetStopwatch(), this.toggleStopwatch()}}>
            <Text>Start</Text>
        </Button>
      </View>
      );
    } 
    else {
      return(
        <View>
          <View style={styles.createRouteContainerStyle}>
          <View style={styles.distanceContainer}>
            <Text style={{ fontSize: 12}}>Distance:</Text>
            <Text style={styles.distanceTravelledStyle}>
              {this.state.distanceTravelled.toFixed(2)} km 
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Icon name='time' style={{fontSize: 25, marginTop: 6}}/>
            <Stopwatch
              start={this.state.stopwatchStart}
              options={options}
              reset={this.state.stopwatchReset}
              getTime={(time) => this.getFormattedTime(time)}
            />
          </View>
          </View>
          <View style={styles.pauseDoneContainer}>
            <Button
              warning
              style={styles.pauseDoneButton}
              onPress={() => {this.setState({ startRunning: true, pauseRunning: !this.state.pauseRunning }),
                this.toggleStopwatch()}}
              >
                <Icon 
                style={{fontSize: 25}}
                type='FontAwesome'
                name={ this.state.pauseRunning ? 'play': 'pause'}
                />
            </Button>
            <Button
              success
              iconLeft
              style={styles.pauseDoneButton}          
              onPress={() =>  {this.setState({ pauseRunning: true, stopwatchStart: false }),
                console.log('does this work? ' + parseFloat(this.state.distanceTravelled.toFixed(2))),
                DISTANCE_TRAVELLED = parseFloat(this.state.distanceTravelled.toFixed(2)), 
                console.log('DISTANCE_TRAVELLED: ' + DISTANCE_TRAVELLED),
                Alert.alert(
                  'Done running?',
                  '', 
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {this.setState({ totalDuration: totalDuration }), 
                      console.log('total duration: ' + this.state.totalDuration), this.toDatabase()}
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

  //JL 17/4: these three functions handle the stopwatch used to track the user's runtime
  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }
  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  getFormattedTime(time) {
    this.currentTime = time;
    totalDuration = time;
  };
  //****//
  
  //JL 11/4: the render function adds markers at all waypoints and draws the route inbetween them
  render() {
    return (
      <View style={styles.containerStyle}>
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
          onPress={this.onMapPress}
         >
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
                /*if (result.distance < parseFloat(this.state.wantedDistance)*0.9){
                  console.log('total_distance: ' + result.distance)
                  this.routeGenerator(this.state.wantedDistance)
                }

                else if (result.distance > parseFloat(this.state.wantedDistance)*1.1) {
                  this.routeGenerator(this.state.wantedDistance)
                }
                else {*/
                  this.setState({ actualDistance: result.distance })
                  console.log('total_distance: ' + result.distance)
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
                 //this.routeGenerator(this.state.wantedDistance)
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
  containerStyle: {
    height: '94%'
  },
  mapStyle: {
    height: '79%'
  },
  createRouteContainerStyle: {
    height: '22%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
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
    marginLeft: 10,
    marginRight: 10
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
    width: '40%',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 5
  },
  actualDistance: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  createRouteButtonStyle: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButtonStyle: {
    margin: 10
  },
  pauseDoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
  },
  pauseDoneButton: {
    width: '30%',
    marginRight: 5,
    marginLeft: 5
  }
}

//This is styling for the clock / JF (18/4)
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

export default Map;

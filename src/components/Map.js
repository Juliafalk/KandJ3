import React, { Component } from 'react';
import { 
  AppRegistry, 
  Dimensions, 
  View } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { MyButton, MyInput } from './common';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 59.3415145;
const LONGITUDE = 18.064416400000027;
const LATITUDE_DELTA = 0.0922; //JL 13/4: 'the angle in which you're viewing', a universal value
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//JL 11/4: the points the route should go through (including start and end point)
const waypoints = [];

const GOOGLE_MAPS_APIKEY = 'AIzaSyDtLXi70mT6q7gwxSgCGiBdxzGXf1NrfPc';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      wayPoints: [],
      wantedDistance: ''
    }

    this.mapView = null;
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
    }
    waypoints[circlePoints+1] = this.state.initialPosition;

    this.setState({
      wayPoints: waypoints
    });
  }
  
  //JL 11/4: the render function adds markers at all waypoints and draws the route inbetween them
  render() {
    return (
      <View style={styles.containerStyle}>
        <MapView
          provider={"google"}
          showsUserLocation={true}
          showsMyLocationButton
          showsCompass
          initialRegion={this.state.initialPosition}
          style={styles.mapStyle}
          ref={c => this.mapView = c}
          onPress={this.onMapPress}>
          
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
              onReady={(result) => {
                console.log('total_distance: ' + result.distance)
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 15),
                    bottom: (height / 15),
                    left: (width / 15),
                    top: (height / 15),
                  }
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <MyInput
          placeholder="Enter distance..."
          label="km"
          value={this.state.wantedDistance}
          onChangeText={userInput => this.setState({ wantedDistance: userInput })}
        />
        <MyButton onPress={() => this.routeGenerator(this.state.wantedDistance)}>Create Route</MyButton>
      </View>
    );
  }
}

/*
  //to add markers at the coords for the waypoints insert this at row ish 155
  //inbetween the <MapView/> and <MapViewDirections/>

  {this.state.wayPoints.map((coordinate, index) =>
    <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
  )}
*/

const styles = {
  containerStyle: {
    height: '100%'
  },
  mapStyle: {
    height: '85%'
  }
}

export default Map;

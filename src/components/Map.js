//this is the map branch

import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Button, Input } from './common';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 59.85090049999999;
const LONGITUDE = 17.630009299999983;
const LATITUDE_DELTA = 0.0922; //JL 11/4: I don't know what this is, probably something to convert lat,lng to distance?
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//JL 11/4: later: retrieve baselocation with google maps geolocation
const BaseLocation = {
  latitude: 59.85090049999999, //use variable LATITUDE from above
  longitude: 17.630009299999983 //use variable LONGITUDE from above
}

//JL 11/4: the points the route should go through (including start and end point)
const waypoints = [];

const routeResult = [];

const GOOGLE_MAPS_APIKEY = 'AIzaSyDtLXi70mT6q7gwxSgCGiBdxzGXf1NrfPc';

class Map extends Component {

  constructor(props) {
    super(props);

    //JL 11/4: the directionsService will create a route through the points in this.state.coordinates
    this.state = {
      coordinates: [],
      distance: ''
    }

    this.mapView = null;
  }

  //JL 11/4: press on the map and add another point that the route will go through
  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  /*JL 11/4: this is a rather complicated function but I will try to explain it in a simple way
  we create a center point of a circle with a radius that is dependent on the length of the route
  from the center point we create [circlePoints] number of waypoints in a perfect circle around the center
  we add the startpoint [BaseLocation], all the generated waypoint and the endpoint [BaseLocation] to
  the array waypoints
  we then set this.state.coordinates to waypoints and when rendered, the directionService will make a route 
  through these points*/
  routeGenerator(length) {
    lengthInMeters = length*1000;
    console.log(lengthInMeters)
    waypoints[0] = BaseLocation;
    const radius = lengthInMeters/2/Math.PI;
    const circlePoints = 5;
    const deg = [];
    const direction = Math.random()*2*Math.PI;  //in radians
    //Locate the point that is radius meters away from the Base Location in the direction chosen.
    //length assumed in meters, and then deltas in degrees.
    var dx = radius*Math.cos(direction);
    var dy = radius*Math.sin(direction);
    var delta_lat = dy/110540;
    var delta_lng = dx/(111320*Math.cos(BaseLocation.latitude*Math.PI/180));
    const center = {
      latitude: BaseLocation.latitude+delta_lat,
      longitude: BaseLocation.longitude+delta_lng
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
    waypoints[circlePoints+1] = BaseLocation;
    console.log('turen blir lite för lång')

    this.setState({
      coordinates: waypoints
    });
  }
  
  /*JL 11/4: the render function adds markers at all waypoints and draws the route inbetween them
  right now I give the routeGenerator a static input of 7000m = 7km
  this will be generically changed when I add an input field for the user to use*/
  render() {
    return (
      <View style={styles.viewStyle}>
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={styles.mapStyle}
        ref={c => this.mapView = c}
        onPress={this.onMapPress}
      >
        {this.state.coordinates.map((coordinate, index) =>
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )}
        {(this.state.coordinates.length >= 2) && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
            destination={this.state.coordinates[this.state.coordinates.length-1]}
            mode={'walking'}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onStart={(params) => {
              //console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={(result) => {
              console.log(result.distance)
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
            
          />
        )}
      </MapView>
      <Input
        placeholder="Enter distance..."
        label="km"
        value={this.state.distance}
        onChangeText={userInput => this.setState({ distance: userInput })}
      />
      <Button onPress={() => this.routeGenerator(this.state.distance)}>Create Route</Button>
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    height: 580
  },
  mapStyle: {
    height: 470
  }
}

export default Map;

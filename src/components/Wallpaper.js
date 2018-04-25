import React, {Component} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';


export default class Wallpaper extends Component {
 render() {
   return (
     <ImageBackground style={styles.picture} source={{ url: 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg'}}>
     >
       {this.props.children}
     </ImageBackground>
   );
 }
}

const styles = StyleSheet.create({
 picture: {
   flex: 1,
   width: null,
   height: null,
   //resizeMode: 'cover',
 },
});

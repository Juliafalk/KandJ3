import React, {Component} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';

export default class Wallpaper extends Component {
 render() {
   return (
     <ImageBackground blurRadius= {7} style={styles.picture} 
     source={require('./images/track.jpg')}
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

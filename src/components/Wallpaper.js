//This file includes the wallpaper that is used in in LoginPage, CreateAccount and on the sidemenu. 
import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

export default class Wallpaper extends Component {
  render() {
    return (
      <ImageBackground blurRadius= {7} style={styles.picture} 
        source={require('./images/track.jpg')}>
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
  },
});

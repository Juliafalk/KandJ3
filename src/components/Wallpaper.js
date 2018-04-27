import React, {Component} from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';


export default class Wallpaper extends Component {
 render() {
   return (
     <ImageBackground blurRadius= {7} style={styles.picture} 
     source={{ url: 'https://iphone-wallpaper.pics/wallpaper/s/4/s4_19349_1_other_wallpapers_motivational_running_path_6845415a56c9909d51b286136fb142e6_raw.jpg'}}>
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

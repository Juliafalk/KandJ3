//This file includes the waiting page before tha users is navigated to log in page or map page
import React, { Component } from 'react';
import { Text, ImageBackground } from 'react-native';
import { Icon } from 'native-base';


class WaitingPage extends React.Component {
   
    render() {
        const {
            imageStyle,
            textStyle,
            iconStyle
        } = styles;

        return(
            <ImageBackground 
                style={imageStyle}
                source={{ url: 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg'}}>
                <Text style={textStyle}>Let's run!</Text>
                <Icon type="MaterialIcons" name="directions-run" style={iconStyle} />
            </ImageBackground>);
    }
}

const styles = {
    imageStyle: {
        width: '100%', 
        height: '100%', 
        justifyContent: 'center'
    },
    textStyle: {
        fontFamily: 'GillSans',
        color: '#fff',
        fontSize:  90,
        alignSelf: 'center',
    },
    iconStyle: {
        color: "#fff",
        alignSelf: 'center',
        fontSize: 300,
        borderColor: "red",
        borderRadius: 20
    }
}

export default WaitingPage;

import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { Icon } from 'native-base';


class WaitingPage extends React.Component {
   
    render() {
        return(
            <ImageBackground 
                style={{width: '100%', height: '100%', justifyContent: 'center'}}
                source={{ url: 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg'}}>
            
            <Text style={styles.textStyle}>Let's run!</Text>
            <Icon type="MaterialIcons" name="directions-run" style={styles.iconStyle} />
            </ImageBackground>);
    }
}

const styles = {
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

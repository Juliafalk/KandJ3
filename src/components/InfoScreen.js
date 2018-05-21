import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { LogCard, LogCardItem } from './common';
import { Icon } from 'native-base';
import firebase from 'firebase';

var username = '';

class InfoScreen extends Component {
  
   static navigationOptions = {
       drawerIcon: (
           <Icon name='ios-information-circle-outline' style={{ color: 'white'}}/>
       )
    }

   render() {

        const {
            viewStyle, 
            labelStyle,
            lineStyle, 
            textStyle,
        } = styles;
       
        const user = firebase.auth().currentUser;

        if (user){
            username = user.displayName    
        }
       
       return (
            <View style={styles.viewBackground}>
                <View style = {styles.viewStyle}>    
                    <Text style={styles.nameHeaderStyle}>Hi, {username}</Text>
                </View>
                <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                <LogCard>
                <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                        }}>
                    <LogCardItem>
                        <Text style={labelStyle}>About runRouter</Text>
                    </LogCardItem>
                </View>
                    <View style={lineStyle} />
                    <View style={{
                        flexDirection: 'row'
                        }}>
                        <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            width: '90%'
                        }}>
                            <LogCardItem>
                                <Text style={textStyle}>Welcome to runRouter, an app developed by team J3 between March and June 2018.
                                </Text>
                            </LogCardItem>
                            <LogCardItem>
                                <Text style={textStyle}>runRouter gives you the opportunity to customize your routes and also keep track of time and distance of the run.</Text>
                            </LogCardItem>
                        </View>
                    </View>
                </LogCard> 
                

                <LogCard>
                    <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                        }}>
                        <LogCardItem>
                            <Text style={labelStyle}>Contact us</Text>
                        </LogCardItem>
                    </View>
                    <View style={lineStyle} />
                    <View style={{
                        flexDirection: 'row'
                        }}>
                        <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            width: '90%'
                        }}>
                            <LogCardItem >
                                <View style={styles.viewIconStyle}>
                                        <Icon name="ios-mail-outline"style={{fontSize: 22 }}/>
                                </View>
                            
                                <Text style={styles.textStyleCenterContact}>runRouter@runRouter.com</Text>
                            </LogCardItem>
                            <LogCardItem >
                                <Text style={textStyle}>We will respond as soon as possible!</Text>
                            </LogCardItem>
                        </View>
                    </View>
                </LogCard> 
            </View>
        </View>
       );
   }
}

const styles = {
    viewIconStyle: { 
        width: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    labelStyle: {
        fontSize: 17,
        paddingLeft: 1, 
        fontFamily: 'GillSans',
        color: 'black',
        
    },
    lineStyle: {
        backgroundColor: 'black',
        height: 0.5, 
        width: '100%',
        marginBottom: 8,
        marginTop: 4,
    },
    textStyle:{
        marginTop: 5,
        fontSize: 15,
        fontFamily: 'GillSans-Light',
        paddingLeft: 10
    },

    nameHeaderStyle: {
        fontSize: 30,
        fontFamily: 'GillSans',
        alignSelf: 'center',
        color: '#fff'
    },
    textStyle: {
        fontFamily: 'GillSans-Light',
        fontSize: 15,
        alignSelf: 'center',
        alignItems: 'center',
    },
    textStyleCenterContact: {
        fontFamily: 'GillSans-Light',
        alignSelf: 'center',
        fontSize: 18
    },
    viewBackground: {
        backgroundColor: '#5c688c',
        height: '100%',
        padding: 20
    },
    viewStyle: {
        padding: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%'
    },
}

export default InfoScreen;

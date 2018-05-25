import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
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
            <ScrollView>
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
                            width: '95%'
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
                        <Text style={labelStyle}>About J3</Text>
                    </LogCardItem>
                </View>
                    <View style={lineStyle} />
                    <View style={{
                        flexDirection: 'row'
                        }}>
                        <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            width: '95%'
                        }}>
                            <LogCardItem>
                                <Text style={textStyle}>
                                We are three dedicated students, studying our third year of the Master programme in Sociotechnical Systems Engineering.
                                </Text>
                            </LogCardItem>
                            <LogCardItem>
                                <Text style={textStyle}>
                                Outside the studies, we are three runnaholics, which was how it all started. 
                                We hope you will enjoy runRouter as much as we do!
                                </Text>
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
                            width: '95%'
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
            </ScrollView>
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
        marginBottom: 7,
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
        padding: 2
    },
    viewStyle: {
        padding: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%'
    },
}

export default InfoScreen;

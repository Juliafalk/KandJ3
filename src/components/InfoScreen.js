import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
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
       
        const user = firebase.auth().currentUser;

        if (user){
            username = user.displayName    
        }
       
       return (
            <View style={styles.viewBackground}>
                <View style = {styles.viewStyle}>    
                    <Text style={styles.nameHeaderStyle}>Hey {username}</Text>
                </View>

                <View style = {styles.viewCardStyle}>    
                    <Text style={styles.textStyle}>
                        Woopa, we are the J3 team. 
                        Three dedicated students, studying the third year in Master Programme in Sociotechnical Systems Engineering.
                        Outside the studies, we are three runnaholics, therefore this app is a big advantage for us. 
                        We hope you will enjoy our app as much as we do!
                    </Text>
                </View>
           
                <View style = {styles.divideSection}>
                    <Image style={styles.imageStyle} 
                    source={require('./images/J3.jpg')} /*Byter till bättre bild imorgon*//>
                </View>
                        
                <View style = {styles.viewStyle}>
                    <Text style={styles.headerStyle}>Contact information</Text>
                    <Text style={styles.textStyleCenter}>For contact or reporting bugs please send us an e-mail: </Text>
                    <Text style={styles.textStyleCenterContact}>runRouter@runRouter.com</Text>
                    <Text style={styles.textStyleCenter}>We will respond as soon as possible!</Text>
                    <Text style={styles.quoteStyle}>Happy running!</Text>
                </View>
            </View>
       );
   }
}

const styles = {
    nameHeaderStyle: {
        fontSize: 30,
        fontFamily: 'GillSans',
        alignSelf: 'center',
        color: '#fff'
    },
    headerStyle: {
        fontFamily: 'GillSans',
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
        paddingBottom: 2,
    },
    textStyle: {
        fontFamily: 'GillSans-Light',
        fontSize: 15,
        alignSelf: 'center',
        alignItems: 'center',
        //color: '#fff'
    },
    textStyleCenter: {
        fontFamily: 'GillSans-Light',
        alignSelf: 'center',
        fontSize: 15
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
    viewCardStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    imageStyle: {
        width: '90%', 
        height: '90%',
        borderRadius: 10,
        opacity: 0.7,
    },
    divideSection: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%'
    },
    quoteStyle: {
        fontSize: 40,
        fontFamily: 'GillSans',
        alignSelf: 'center',
        paddingTop: 30,
        color: '#fff'
    }
}

export default InfoScreen;

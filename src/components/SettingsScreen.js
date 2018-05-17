import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import firebase from 'firebase';

class SettingsScreen extends Component {
  
   static navigationOptions = {
       drawerIcon: (
           <Icon name='ios-settings-outline' style={{ color: 'white'}}/>
       )
   }
  
   render() {
       const user= firebase.auth().currentUser;
       console.log(user)
       return (
           <View>    
            <Text style={{  fontWeight: 'bold' }}>Personal information</Text>
                    <Text>Name:</Text>
                    <Text>Email: {user.email}</Text>
                    <Text style={{  fontWeight: 'bold' }}>The J3 team</Text>
                    <Text>
                        Wopa, we are the J3 team. Three dedicated students, studying the third year in 
                        Master Programme in Sociotechnical Systems Engineering.
                        Outside the studies, we are three runnaholics, therefore this application a great
                        tool for us. 
                        We hope you enjoy our application as much as we do!
                    </Text>
                    <Text>Running solves problems</Text>
                   
                    <Text style={{  fontWeight: 'bold' }}>Contact information</Text>
            </View>
       );
   }
}

const styles = {
    divideSection: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%'
      },
}

export default SettingsScreen;

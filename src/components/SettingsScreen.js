import React, { Component } from 'react';
import { Text } from 'react-native';
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
       return (
           <Container>
                <Content 
                        contentContainerStyle={{
                        marginTop: 50,
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                    <Text style={{  fontWeight: 'bold' }}>Personal information</Text>
                    <Text>Name:</Text>
                    <Text>Email: {user.email}</Text>
                </Content>
           </Container>
       );
   }
}

export default SettingsScreen;

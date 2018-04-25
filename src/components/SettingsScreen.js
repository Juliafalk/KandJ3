import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Container, Header, Content, Left, Title, Right, Body } from 'native-base';
import firebase from 'firebase';

class SettingsScreen extends Component {
  
   static navigationOptions = {
       drawerIcon: (
           <Icon name='ios-settings-outline' />
       )
   }
  
   render() {
       const user= firebase.auth().currentUser;
       return (
           <Container>
               <Header style={{ backgroundColor: '#8CBA80'}}>
                   <Left>
                       <Icon name="ios-menu" onPress={() =>
                       this.props.navigation.navigate('DrawerOpen')}/>
                   </Left>
                   <Body>
                       <Title>Settings</Title>
                   </Body>
                   <Right />
               </Header>
               <Content contentContainerStyle={{
                   marginTop: 50,
                   alignItems: 'center',
                   justifyContent: 'center'
               }}>
                   <Text style={{  fontWeight: 'bold' }}>Personal information</Text>
                   <Text>Name:</Text>
                   <Text>Email: {user.email}</Text>
               </Content>
           </Container>

       );
   }
}
export default SettingsScreen;
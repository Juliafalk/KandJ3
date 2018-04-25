import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title, Right, CardItem, Card } from 'native-base';
import Moment from 'react-moment';
import firebase from 'firebase';
import { MyInputCreateAccount, MyButton } from './common';

const travelled_distance = [];
const actual_distance = [];
const duration = [];
const date = [];
const wayPoints = [];



class LogPage extends Component { 
    static navigationOptions = {
        drawerIcon: (
            <Icon name='ios-list-box-outline' />
        )
    }

    state = { name: '' }

    ButtonPress() {
        firebase.auth().signOut()
    }

    onButtonPress() {
        console.log(this.state)
        const { name } = this.state;
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/routes`)
            .push({ name });
        return(
        this.setState({
            name: ''
        
        })
        
        );
       
    }

   

    routeFetch() {
        var userId = firebase.auth().currentUser.uid;
        
        firebase.database().ref('/users/' + userId + '/routes/').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            travelled_distance.push(childData.DISTANCE_TRAVELLED);
            actual_distance.push(childData.actualDistance);
            duration.push(childData.totalDuration)
            date.push(childData.date)
            wayPoints.push(childData.wayPoints)
           
        });
        
        });
        console.log(travelled_distance)
        console.log(actual_distance)
        console.log(date)
        console.log(wayPoints)
        console.log('')

        return(
            <View style={{ backgroundColor: 'blue' }}>
            <Text>{toString(actual_distance)}</Text>
            </View>
        )
        

    /*const { currentUser } = firebase.auth();
    const { user } = this.state;
    console.log(currentUser)
    var recentPostsRef = firebase.database().ref(`/users/${currentUser.uid}/routes`);
        recentPostsRef.once('value').then(snapshot => {
        this.setState({ user: snapshot.val().users })
        console.log (user)*/
    
    }
    

    render() {
        var dt= new Date().toDateString()
        console.log( dt)
        return (
            <Container>
                <Header style={{ backgroundColor: '#8CBA80'}}>
                    <Left>
                        <Icon name="ios-menu" onPress={() =>
                        this.props.navigation.navigate('DrawerOpen')}/>
                    </Left>
                    <Body>
                        <Title>Log</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Card>
                        <CardItem header bordered style={{ backgroundColor: 'lightgray'}}>
                            <Text style={styles.labelStyle}>Your run on..(todays date)..</Text>
                        </CardItem>
                        <CardItem>
                            <MyInputCreateAccount 
                            label="Name: "
                            placeholder="Enter name"
                            label="Name:"
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                            />
                            <Button onPress={this.onButtonPress.bind(this)}> 
                            <Text>Create route name</Text>
                            </Button>
                        </CardItem>
                        <CardItem>
                            <Icon name='ios-stopwatch-outline'/>
                            <Text>Time:</Text>
                        </CardItem>
                        <CardItem>
                            <Icon name= "ios-walk-outline"/>
                            <Text>Distance:</Text>
                        </CardItem>
                        <CardItem>
                            <Icon name='ios-speedometer-outline'/>
                            <Text>Average Speed:</Text>
                            <MyButton onPress={this.ButtonPress.bind(this)}>
                                 <Text>Log out</Text>
                            </MyButton>
                        </CardItem>
                        <CardItem>
                        <Button onPress={this.routeFetch.bind(this)}> 
                            <Text>Get route info</Text>
                        </Button>
                        </CardItem>
                        {this.routeFetch()}

                    </Card>
                </Content>
                
            </Container>

        );
    }
}

const styles = {  
    labelStyle: {
        fontSize: 17,
        paddingLeft: 1, 
        flex: 1,
        fontWeight: 'bold', 
    },
};

export default LogPage;
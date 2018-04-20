import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title, Right, CardItem, Card } from 'native-base';
import Moment from 'react-moment';
import firebase from 'firebase';
import { MyInputCreateAccount, MyButton } from './common';


class LogPage extends Component { 

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

    /*routeFetch() {
        console.log(snapshot.val())
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/routes`)
            .on('value', snapshot =>{ 
                dispatch({ payload: snapshot.val() })

            });
            <Button onPress={this.routeFetch.bind(this)}> 
                            <Text>Get route info</Text>
                            </Button>
    }*/
    

    render() {
        var dt= new Date().toDateString()
        console.log( dt)
        return (
            <Container>
                <Header>
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
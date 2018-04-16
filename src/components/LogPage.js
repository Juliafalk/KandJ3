import React, { Component } from 'react';
import { View, Text, StyleSheet, Scrollview, Alert } from 'react-native';
import { cardBody, Icon, Button, Container, Header, Content, Left, Body, Title, Right, CardItem, Card } from 'native-base';
import Moment from 'react-moment';

var dt= new Date();

class LogPage extends Component { 

    ShowCurrentDate=()=>{
 
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
       
   
        Alert.alert(date + '-' + month + '-' + year);
        
   
       }
    

    render() {

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
                            <Button onPress={this.ShowCurrentDate}> 
                            <Text>Get Date</Text>
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
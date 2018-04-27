import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Container, Header, Content, Left, Body, Right, Title } from 'native-base';

class FavoritePage extends Component { 
    static navigationOptions = {
        drawerIcon: (
            <Icon name='ios-star-outline' style={{ color: 'white'}}/>
        )
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#7785ad'}}>
                    <Left>
                        <Icon name="ios-menu" style={{color:'white'}}
                        onPress={() =>
                        this.props.navigation.navigate('DrawerOpen')}/>
                    </Left>
                    <Body>
                        <Title style={{color:'white'}}>Favorites</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text>Here you can see your favorite routes</Text>
                </Content>
            </Container>

        );
    }
}
export default FavoritePage;
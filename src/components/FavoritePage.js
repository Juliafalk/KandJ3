import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Container, Header, Content, Left, Body, Right, Title } from 'native-base';

class FavoritePage extends Component { 
    static navigationOptions = {
        drawerIcon: (
            <Icon name='ios-star-outline' />
        )
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#8CBA80'}}>
                    <Left>
                        <Icon name="ios-menu" onPress={() =>
                        this.props.navigation.navigate('DrawerOpen')}/>
                    </Left>
                    <Body>
                        <Title>Favorites</Title>
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
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Right, Title } from 'native-base';

class FavoritePage extends Component { 
    render() {
        return (
            <Container>

                <Header>
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
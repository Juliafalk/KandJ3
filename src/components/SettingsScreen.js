import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Container, Header, Content, Left, Title, Right, Body } from 'native-base';

class SettingsScreen extends Component { 
    render() {
        return (
            <Container>
                <Header>
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
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text>Settings Screen</Text>
                </Content>
            </Container>

        );
    }
}
export default SettingsScreen;
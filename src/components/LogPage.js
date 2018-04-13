import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title, Right } from 'native-base';

class LogPage extends Component { 
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
                 <Content contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text>Here you can see your previous routes</Text>
                </Content>
            </Container>

        );
    }
}
export default LogPage;
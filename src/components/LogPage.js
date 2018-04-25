import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ListView} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title, Right, CardItem, Card } from 'native-base';
import Moment from 'react-moment';
import firebase from 'firebase';
import { MyInputCreateAccount, MyButton } from './common';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';
import { connect } from 'react-redux';
import { routesFetch } from '../actions/RoutesActions';
import ListItem from './ListItem';


class LogPage extends React.Component { 

    componentWillMount() {
        this.props.routesFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(this.props);
    }

    createDataSource({ routes }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(routes)
        console.log('dataSource' + this.dataSource)
    }

    renderRow(route){
        console.log('renderrow?')
        return <ListItem route={route} />;
    }

    render() {
        console.log('render');
        console.log(this.props);
        console.log('dataSource')
        console.log(this.dataSource);
        return (
                <View>
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
                    <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    />
                </View>
        )
    }
}

const mapStateToProps = state => {
    const routes = _.map(state.routes, (val, uid) => {
        return {...val, uid};
    });

    return { routes };
};

export default connect(mapStateToProps, { routesFetch })(LogPage); 
    
/*
    

    ButtonPress() {
        firebase.auth().signOut()
    }

    onButtonPress() {
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
*/



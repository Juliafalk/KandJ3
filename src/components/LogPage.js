import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView} from 'react-native';
import { 
    Icon, 
    Header,  
    Left, 
    Body, 
    Title, 
    Right,
    CardItem 
} from 'native-base';
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
    static navigationOptions = {
        drawerIcon: (
            <Icon name='ios-list-box-outline' style={{ color: 'white'}}/>
        )
    }

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
        const { 
           headerStyle, 
           headerTextStyle,
           iconStyle,
           viewStyle
        } = styles;
        return (
                <View style={viewStyle}>
                    <Header style={headerStyle}>
                        <Left>
                            <Icon name="ios-menu" style={iconStyle} onPress={() =>
                            this.props.navigation.navigate('DrawerOpen')}/>
                        </Left>
                        <Body>
                            <Title style={{color:'white'}} /*style={headerTextStyle}*/>Log</Title>
                        </Body>
                        <Right />
                    </Header>
                    <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    /*style={{
                        //flex: 1,
                        transform: [
                          { scaleY: -1},
                        ]
                      }}*/
                    />
                     <CardItem>
                    </CardItem>
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

const styles = {
    headerStyle: {
        backgroundColor: '#7785ad' 
    },
    headerTextStyle: {
        color: 'white', 
        fontSize: 20,
        fontFamily: 'GillSans',
    }, 
    iconStyle: {
        color: 'white'
    }, 
 
}



export default connect(mapStateToProps, { routesFetch })(LogPage); 
    




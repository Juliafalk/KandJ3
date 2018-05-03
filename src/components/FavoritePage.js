import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, ScrollView, Text} from 'react-native';
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
import FavoriteListItem from './FavoriteListItem';


class FavoritePage extends React.Component { 
    static navigationOptions = {
        drawerIcon: (
            <Icon name='ios-star-outline' style={{ color: 'white'}}/>
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
        routes.reverse();
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(routes)
        
    }

    renderRow(route){
            if (route.favorite == true)
                return <FavoriteListItem route={route} />;
            else
             return null;
       
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
                            <Text style={headerTextStyle}>Favorites</Text>
                        </Body>
                        <Right />
                    </Header>
                    <ScrollView>
                    <View>
                    <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    />
                    </View>
                    </ScrollView>
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
    viewStyle: {
        backgroundColor: '#5c688c',
        height: '100%',
       
        //Padding because of styling and bugs in scrollview 
    },
    headerStyle: {
        backgroundColor: '#7785ad' 
    },
    headerTextStyle: {
        color: 'white', 
        fontSize: 23,
        fontFamily: 'GillSans',
    }, 
    iconStyle: {
        color: 'white'
    }, 
}
export default connect(mapStateToProps, { routesFetch })(FavoritePage); 



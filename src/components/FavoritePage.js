import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, ActivityIndicator } from 'react-native';
import { 
    Icon, 
    Header,  
    Left, 
    Body, 
    Title, 
    Right,
    CardItem,
} from 'native-base';
import Moment from 'react-moment';
import firebase from 'firebase';
import { MyInputCreateAccount, MyButton } from './common';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';
import { connect } from 'react-redux';
import { favoriteFetch } from '../actions/FavoritesAction';
import FavoriteListItem from './FavoriteListItem';


class FavoritePage extends React.Component { 
    static navigationOptions = {
        drawerIcon: (
            <Icon name='ios-heart-outline' style={{ color: 'white', fontSize: 29 }}/>
        )
    }

    state = {loading: true }

    componentWillMount() {
        this.props.favoriteFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.setState({loading: false})
        this.createDataSource(nextProps);
    }

    createDataSource({ favRoutes }) {
        
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        //console.log(ds)

        this.dataSource = ds.cloneWithRows(favRoutes)
        
    }

    renderRow(route){
            //if (route.favorite == true)
                return <FavoriteListItem route={route} />;
            //else
            // return null;
       
    }

    renderSpinner() {
        if (this.state.loading) {
            return (
            <View style={styles.spinnerStyle} >
            <ActivityIndicator size="large"  />
            </View>
            );
        }
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
                    <View >
                        {this.renderSpinner()}
                    </View>
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
    const favRoutes = _.map(state.favRoutes, (val, uid) => {
        return {...val, uid};
    });

    return { favRoutes };
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
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '60%'
    }
}
export default connect(mapStateToProps, { favoriteFetch })(FavoritePage); 



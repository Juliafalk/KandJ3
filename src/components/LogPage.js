import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, ActivityIndicator} from 'react-native';
import { 
    Icon, 
    Header,  
    Left, 
    Body, 
    Title, 
    Right,
    CardItem,
    Button 
} from 'native-base';
import Moment from 'react-moment';
import firebase from 'firebase';
import { MyInputCreateAccount, MyButton } from './common';
import reducers from '../reducers';
import { connect } from 'react-redux';
import { routesFetch } from '../actions';
import ListItem from './ListItem';

class LogPage extends React.Component { 
    static navigationOptions = {
        drawerIcon: (
            <Icon name='ios-list-box-outline' style={{ color: 'white'}}/>
        )
    }
    state = { loading: true };

    componentWillMount() {
        this.props.routesFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.setState({loading: false})
        this.createDataSource(this.props);
        
    }

    createDataSource({ routes }) {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.dataSource = ds.cloneWithRows(routes)
         
    }

    renderRow(route){
            return <ListItem route={route} />;
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
           viewStyle,
           spinnerView
        } = styles;
        return (
            <View style={viewStyle}>
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
                        <Button
                            onPress={() =>
                                this.props.navigation.navigate('Map')}>
                            <Text>To Map</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    const routes = _.map(state.routes, (val, uid) => {
        return {
            ...val, uid
        };
    });

    return { routes };
};

const styles = {
    viewStyle: {
        backgroundColor: '#5c688c',
        height: '100%',
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
    /*spinnerView: {
        flex: 1,   
    },*/
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '60%'
    }

}

export default connect(mapStateToProps, { routesFetch })(LogPage); 
    
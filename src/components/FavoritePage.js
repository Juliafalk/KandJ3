import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { routesFetch } from '../actions';
import FavoriteListItem from './FavoriteListItem';

class FavoritePage extends React.Component { 
    static navigationOptions = {
        drawerIcon: (
            <Icon name='ios-heart-outline' style={{ color: 'white', fontSize: 29 }}/>
        )
    }

    state = {loading: true }

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
            if (route.favorite == true)
                return <FavoriteListItem route={route} />;
            else
             return null;
       
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
        const { viewStyle } = styles;
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
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '60%'
    }
}

export default connect(mapStateToProps, { routesFetch })(FavoritePage); 

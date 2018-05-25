//This file includes the screen where all ListItem will be displayed
import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, ScrollView, ActivityIndicator} from 'react-native';
import { Icon } from 'native-base';
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
        this.createDataSource(nextProps);
    }

    renderRow(route){
            return <ListItem route={route} />;
    }

    createDataSource({ routes }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(routes)
}

    renderSpinner() {

        const {
            spinnerStyle
        } = styles;

        if (this.state.loading) {
            return (
            <View style={spinnerStyle} >
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


const mapStateToProps = state => {
    const routes = _.map(state.routes, (val, uid) => {
        return {
            ...val, uid
        };
    });
    return { routes };
};


export default connect(mapStateToProps, { routesFetch })(LogPage); 
    
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { 
    Icon, 
    Button, 
} from 'native-base';
import {
    LogCard,
    LogCardItem
} from './common';

class ListItem extends Component {
    render() {
        
        const { route } = this.props;
        const { 
            viewStyle,
            labelStyle,
            lineStyle, 
            textStyle,
            viewIconStyle,
            iconStyle, 

        } = styles;
        
        return (
            <View style={viewStyle}>
                <LogCard>
                    <LogCardItem>
                        <Text style={labelStyle}>{route.date.toUpperCase()}</Text>
                    </LogCardItem>
                    <View style={lineStyle} />
                    <LogCardItem>
                    <View style={viewIconStyle}>
                        <Icon style= {iconStyle}name='ios-stopwatch-outline'/>
                    </View>
                        <Text style={textStyle}>Duration: {route.TOTAL_DURATION}</Text>
                    </LogCardItem>
                    <LogCardItem block >
                    <View style={viewIconStyle}>
                        <Icon style= {iconStyle} name="ios-walk-outline"/>
                    </View>
                        <Text style={textStyle}>Route distance: {route.actualDistance.toFixed(2)}</Text>
                    </LogCardItem>
                    <LogCardItem >
                        <View style={viewIconStyle} />
                        <Text style={textStyle}>Your distance: {route.DISTANCE_TRAVELLED.toFixed(2)}</Text>
                    </LogCardItem>
                </LogCard>        
            </View>
        )};
}

const styles = {
    viewStyle: {
        alignItems: 'center',
        backgroundColor: '#5c688c',
        zIndex: -1
    },
    labelStyle: {
        fontSize: 17,
        paddingLeft: 1, 
        flex: 1, 
        fontFamily: 'GillSans-Light',
        //color: '#5c688c',
        color: 'black',
        //color: '#fff',
    },
    lineStyle: {
        backgroundColor: 'black',
        //backgroundColor: '#5c688c',
        //backgroundColor: '#fff',
        height: 0.5, 
        width: '100%',
        marginBottom: 8,
    },
    textStyle:{
        marginTop: 5,
        fontSize: 17,
        fontFamily: 'GillSans-Light',
        paddingLeft: 10
    },
    iconStyle: {
    
    },
    viewIconStyle: { 
        width: '7%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
};

const otherStyles = StyleSheet.create({
    cardStyle: {
        width: '92%', 
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',

    },  
})

export default ListItem;
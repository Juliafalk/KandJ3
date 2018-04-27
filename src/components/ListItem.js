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
            buttonStyle,
            textButtonStyle,
            favoriteButtonStyle,
            favoriteStyle 

        } = styles;
        
        return (
            <View style={viewStyle}>
                <LogCard>
                    <LogCardItem>
                        <Text style={labelStyle}>{route.date.toUpperCase()}</Text>
                    </LogCardItem>
                    <View style={lineStyle} />
                    <View style={{
                        flexDirection: 'row'

                    }}>
                        <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            width: '65%'
                        }}>
                            <LogCardItem>
                                <View style={viewIconStyle}>
                                    <Icon name='ios-stopwatch-outline'/>
                                </View>
                                <Text style={textStyle}>Duration: {route.TOTAL_DURATION}</Text>
                            </LogCardItem>
                            <LogCardItem >
                                <View style={viewIconStyle}>
                                    <Icon name="ios-walk-outline"/>
                                </View>
                                <Text style={textStyle}>Route distance: {route.actualDistance.toFixed(2)} km</Text>
                            </LogCardItem>
                            <LogCardItem >
                                <View style={viewIconStyle} />
                                <Text style={textStyle}>Your distance: {route.DISTANCE_TRAVELLED.toFixed(2)} km</Text>
                            </LogCardItem>
                        </View>
                        <View style= {{
                            width: '35%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '2%',
                            marginRight: '2%'
                            }}>
                            <Button transparent style={favoriteButtonStyle}>
                                <Icon type="MaterialIcons" name="favorite-border" style={{ color:'black'}} />
                                <Text style={favoriteStyle}>Add to favorite</Text>
                            </Button>
                            <Button full style={buttonStyle}>
                                <Text style={textButtonStyle}>Run again</Text>
                            </Button>
                        </View>
                    </View>
                </LogCard>        
            </View>
        )};
}

const styles = {
    viewStyle: {
        alignItems: 'center',
    },
    labelStyle: {
        fontSize: 17,
        paddingLeft: 1, 
        flex: 1, 
        fontFamily: 'GillSans-Light',
        color: 'black',
    },
    lineStyle: {
        backgroundColor: 'black',
        height: 0.5, 
        width: '100%',
        marginBottom: 8,
    },
    textStyle:{
        marginTop: 5,
        fontSize: 15,
        fontFamily: 'GillSans-Light',
        paddingLeft: 10
    },
    buttonStyle: {
        marginTop: 10,
        height: 35,
        width: '100%',
        backgroundColor: '#7785ad',  
    },
    textButtonStyle: {
        fontSize: 17,
        fontFamily: 'GillSans-Light',
        color: 'white'
    },
    favoriteButtonStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    favoriteStyle: {
        fontFamily: 'GillSans-Light',
        fontSize: 10, 
    },
    viewIconStyle: { 
        width: '12%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
};


export default ListItem;
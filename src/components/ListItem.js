import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { 
    Icon, 
    Button, 
    Container, 
    Header, 
    Content, 
    Left, 
    Body, 
    Title, 
    Right, 
    CardItem, 
    Card } from 'native-base';
class ListItem extends Component {
    render() {
        
        const { route } = this.props;
        const { 
            viewStyle,
            labelStyle, 
            textStyle
        } = styles;
        
        return (
            <View style={viewStyle}>
                <Card style={{ width: '92%'}}>
                <CardItem header bordered style={{ backgroundColor: '#7c7c7c'}}>
                    <Text style={labelStyle}>{route.date.toUpperCase()}</Text>
                </CardItem>
                <CardItem>
                    <Icon name='ios-stopwatch-outline'/>
                    <Text style={textStyle}>Duration: {route.TOTAL_DURATION}</Text>
                </CardItem>
                <CardItem>
                    <Icon name="ios-walk-outline"/>
                    <Text style={textStyle}>Route distance: {route.actualDistance.toFixed(2)}</Text>
                </CardItem>
                <CardItem>
                    
                    <Icon />
                    <Text style={textStyle}>Your distance: {route.DISTANCE_TRAVELLED.toFixed(2)}</Text>
                </CardItem>
        
                </Card>
                
               
                        
            </View>
        )};
}

const styles = {
    viewStyle: {
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingBottom: 5, 
        paddingTop: 5
    },  
    labelStyle: {
        fontSize: 17,
        paddingLeft: 1, 
        flex: 1, 
        fontFamily: 'GillSans',
        color: '#ededed'
    },
    textStyle:{
        fontSize: 17,
        fontFamily: 'GillSans-Light',

    }
};

export default ListItem;
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
        
        return (
        <View>
                    <CardItem header bordered style={{ backgroundColor: 'lightgray'}}>
                        <Text style={styles.labelStyle}>{route.date}</Text>
                    </CardItem>
                    <CardItem>
                        <Icon name='ios-stopwatch-outline'/>
                        <Text>Duration: {route.TOTAL_DURATION}</Text>
                    </CardItem>
                    <CardItem>
                        <Icon name= "ios-walk-outline"/>
                        <Text>Route distance: {route.actualDistance.toFixed(2)}</Text>
                    </CardItem>
                    <CardItem>
                        <Icon name= "ios-walk-outline"/>
                        <Text>Your distance: {route.DISTANCE_TRAVELLED.toFixed(2)}</Text>
                    </CardItem>
                    
            </View>
        )}
}

const styles = {  
    labelStyle: {
        fontSize: 17,
        paddingLeft: 1, 
        flex: 1,
        fontWeight: 'bold', 
    },
};
export default ListItem;
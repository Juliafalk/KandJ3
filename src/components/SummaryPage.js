/*Here a summare for the runner will be displayed,
a map, distance and total duration will be displayed.
Currently not is used, have to figure out how to send props and state 
between diffrent pages / JF (18/4) */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


class SummaryPage extends React.Component { 
    
    render() {
        const { params } = this.props.navigation.state;
        console.log(this.props.navigation.state)
        console.log('hellu')
        console.log('data?' + data)
        return (
            <View style={{ height: '90%', marginTop: 60}}>
            <View style={styles.divideSection}>
                <Text>Here should be a Map</Text>
            </View>
            <View style={styles.divideSection}>
                <Text>Here should be some distance and time info</Text>
            </View>
            <View style={styles.divideSection}>
                <Text>Here should be some sharing function (if it is possible..</Text>
            </View>

            </View>
            
        );
       
    }
}

const styles = {
    divideSection: {
        height: '30%',
        justifyContent: 'center',
    }
}
export default SummaryPage;
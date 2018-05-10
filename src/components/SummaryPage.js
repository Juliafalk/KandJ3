/*Here a summare for the runner will be displayed,
a map, distance and total duration will be displayed.
Currently not is used, have to figure out how to send props and state 
between diffrent pages / JF (18/4) */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class SummaryPage extends React.Component { 
    
    render() {
        return (
            <View style={{ height: '90%', marginTop: 60}}>
            <View style={{ marginLeft: 15, marginTop: 10 }}>
            <Icon name='close' 
            onPress={() => {Actions.Map()}} 
            style={{ fontSize: 50, color: 'red' }}
            />
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
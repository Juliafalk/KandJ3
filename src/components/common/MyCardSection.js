//CardSection för att kunna dela upp i olika sektioner. 
import React from 'react';
import { View } from 'react-native';

const MyCardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
        {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        padding: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',

    }
};

export { MyCardSection };

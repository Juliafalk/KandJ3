//För rubriker
// Import libraries for making decodeURIComponent
import React from 'react';
import { Text, View } from 'react-native';

// Make component
// props-object, what we want to display as header, i.e. "rubrik"

const Header = (props) => {
    const { textStyle } = styles;
    return (
        <View style={styles.viewStyle}> 
            <Text style={textStyle}> {props.headerText} </Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#4286f4',
        height: 80,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2a3b63',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 35,
        color: '#fff',
        fontFamily: 'Futura'
    }
};

// Make the component available
export { Header };
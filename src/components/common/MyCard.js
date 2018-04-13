//För att kunna skapa olika Card att placera komponeter i.
import React from 'react';
import { View, Text } from 'react-native';

//Could use the textStyle around the {props.children}, however
//this does not work with CardSection.js something abouth height and widht
const MyCard = (props) => {
    return (
        <View style={styles.containerStyle}>
        {props.children} 
        </View>
    );
};

const styles = {
    containerStyle: {
        elevation: 1,
        marginLeft: 10,
        padding: 5,
        marginRight: 10, 
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }, 
    textStyle: {
        fontSize: 20,
        color: '#53607c',
        fontFamily: 'Futura',
        textAlign: 'center',
        letterSpacing: 4,
    }
};

export { MyCard };

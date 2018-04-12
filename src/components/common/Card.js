//För att kunna skapa olika Card att placera komponeter i.
import React from 'react';
import { View, Text } from 'react-native';

//Could use the textStyle around the {props.children}, however
//this does not work with CardSection.js something abouth height and widht
const Card = (props) => {
    return (
        <View style={styles.containerStyle}>
        {props.children} 
        </View>
    );
};

const styles = {
    containerStyle: {
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: '#fff',
        //borderBottomWidth: 0,
        shadowColor: '#53607c',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 6, 
        elevation: 1,
        marginLeft: 10,
        padding: 5,
        marginRight: 10, 
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        //height: null,
        //width: null
    }, 
    textStyle: {
        fontSize: 20,
        color: '#53607c',
        fontFamily: 'Futura',
        textAlign: 'center',
        letterSpacing: 4,
    }
};

export { Card };

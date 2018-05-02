//För att kunna skapa olika Card att placera komponeter i.
import React from 'react';
import { View } from 'react-native';

//Could use the textStyle around the {props.children}, however
//this does not work with CardSection.js something abouth height and widht
const LogCard = (props) => {
    return (
        <View style={styles.containerStyle}>
        {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: '90%',
        elevation: 1,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 100
        
    }, 
};

export { LogCard };

//Denna knapp är för login och start. 
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

//onPress from AlbumDetalied, passed from album...
const Button = ({ onPress, children }) => {
    return (
        <TouchableOpacity onPress={(onPress)} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>
        {children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        fontSize: 16, 
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1, 
        width: null,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 5,
        marginRight: 5,
        height: 50
    }
};

export { Button };
///Styling for the LogCard that is used in several files. 
import React from 'react';
import { View } from 'react-native';

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

//En spinner, om vi vill ha som i exempel projekt
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({size }) => {
    return ( 
        <View style={styles.spinnerStyle}> 
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

//to make sure that the AcitivtyIndicator is centerd on screen
const styles = {
    spinnerStyle: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { Spinner };

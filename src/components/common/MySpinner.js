//A spinner that is used when a user logs in to the application
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const MySpinner = ({size }) => {
    return ( 
        <View style={styles.spinnerStyle}> 
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { MySpinner };

//LogCardItem to be able to split the LogCard into several sections
import React from 'react';
import { View } from 'react-native';

const LogCardItem = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
    }
};

export { LogCardItem };

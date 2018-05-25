//MyCardSection is similiar to LogCardItem, which makes it possible to split something to several sections. 
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

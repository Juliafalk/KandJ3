//För att kunna hantera input från användaren.

import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerStyle } = styles; 
    return (
        <View style={containerStyle}>
            <TextInput
                secureTextEntry={secureTextEntry} //for passwords it should only show * in the input area
                placeholder={placeholder}
                autoCorrect={false} //we don't want to autocorrect the emails
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
            <Text style={labelStyle}>{label}</Text>
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23, //how much space is inbetween each line of text
        flex: 1 //flex, inputStyle and labelStyle are children of the view tag. 
        //we are allocating 2/3 of the space to one and 1/3 to the other
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };
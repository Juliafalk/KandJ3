import React from 'react';
import { View, Text, TextInput } from 'react-native';

const InputLogin = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={false}
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = {  
    inputStyle: {
        backgroundColor: '#fff',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 16,
        lineHeight: 23,
        flex: 2.5,
        borderRadius: 5
    },
    labelStyle: {
        fontSize: 16,
        paddingLeft: 5, 
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }   
    };

export { InputLogin };

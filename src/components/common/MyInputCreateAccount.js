import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon } from 'native-base';

const MyInputCreateAccount = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, containerStyle, labelStyle } = styles;

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
        backgroundColor: '#ededed',
        padding: 5,
        fontSize: 16,
        lineHeight: 23,
        width: '70%',
        marginRight: 26,
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
    },
    labelStyle: {
        fontSize: 17,
        paddingLeft: 1, 
        flex: 1,
        fontFamily: 'GillSans',
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 1
    },
};

export { MyInputCreateAccount };



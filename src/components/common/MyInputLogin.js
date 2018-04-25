import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon } from 'native-base';

const MyInputLogin = ({ value, onChangeText, placeholder, secureTextEntry, iconType, iconName }) => {
    const { inputStyle, containerStyle, iconStyle } = styles;

    return (
        <View style={containerStyle}>
            <Icon 
            type={iconType}
            name={iconName}
            style={iconStyle}
            />
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginRight: 25*1.1 + 5,
        width: '60%',
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: 'black',
        /*backgroundColor: '#ededed',
        //To get the text in the center, because of the icon
        //Remeber to change the margin if you change the iconStyle / JF (13/4)
        marginRight: 25*1.1 + 5,
        padding: 5,
        fontSize: 16,
        lineHeight: 23,
        width: '60%',
        borderRadius: 5,
        height: 40,
        alignItems: 'center',*/

    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    iconStyle: {
        marginTop: 5, 
        marginRight: 5,
        fontSize: 25,
        width: 25*1.1
    }   
    };

export { MyInputLogin };


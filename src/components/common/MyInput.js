
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Icon } from 'native-base';

const MyInput = ({secureTextEntry, placeholder, value, onChangeText, iconType, iconName  }) => {
    const { inputField, iconStyle, inputContainer, viewStyle } = styles; 
    return (
        <View style={viewStyle}>
            <View style={inputContainer}>
                <Icon type={iconType} name={iconName}
                    style={iconStyle}/>
                <TextInput
                    secureTextEntry={secureTextEntry} //for passwords it should only show * in the input area
                    placeholder={placeholder}
                    autoCorrect={false} //we don't want to autocorrect the emails
                    style={inputField}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
};

const styles = {
    viewStyle: {
        height: 40,
        flex: 1
    },
    inputContainer: {
        backgroundColor: 'white',
        opacity: 0.78,
        padding: 8,
        flexDirection: 'row',
        borderRadius: 5
    },
    iconStyle: {
        fontSize: 22,
        fontFamily: 'GillSans-Light',
        width: 30,
        paddingRight: 8
    },
    inputField: {
        fontSize: 15,
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: '#5c688c',
        flex: 1
    }
};

export { MyInput };


import React from 'react';
import { Text, TextInput, View } from 'react-native';

export const DistanceInput = ({ value, placeholder, onChangeText }) => {
    const { inputField, textStyle, inputContainer, viewStyle } = styles; 
    return (
        <View style={viewStyle}>
            <View style={inputContainer}>
                <TextInput
                    keyboardType='number-pad'
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={2}
                    style={inputField}
                />
                <Text style={textStyle}>km</Text>
            </View>
        </View>
    );
};

const styles = {
    viewStyle: {
        height: 40,
        flex: 1,
    },
    inputContainer: {
        width: 80,
        backgroundColor: 'white',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 8,
        flexDirection: 'row',
        borderRadius: 5
    },
    textStyle: {
        fontSize: 20,
        fontFamily: 'GillSans-Light',
        width: 28,
        paddingLeft: 5,
        paddingRight: 5
    },
    inputField: {
        fontSize: 15,
        textAlign: 'center',
        padding: 0,
        borderRightWidth: 1,
        borderRightColor: '#5c688c',
        flex: 1
    }
};




/*
<TextInput
                keyboardType='number-pad'
                placeholder='..km'
                style={textInputStyle}
                maxLength={2}
                value={wantedDistance}
                onChangeText={userInput => 
                  {this.setState({
                  wantedDistance: userInput}),
                  this.changeDistance(userInput)}}
              />
              */
import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface EnvironmentButtonProps extends TouchableOpacityProps {
    title: string;
    active?: boolean;
}


export default function EnvironmentButton(props : EnvironmentButtonProps) {
    const {title, active, ...rest} = props;
    return (
        <TouchableOpacity
            style={[style.container, active && style.containerActive]}
            {...rest}
        >
            <Text
                style={[style.text, active && style.textActive]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 10
    },
    containerActive: {
        backgroundColor: colors.green_light
    },
    text: {
        fontFamily: fonts.text,
        color: colors.heading,
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    }
});

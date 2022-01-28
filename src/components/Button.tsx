import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, StyleSheet, Text} from 'react-native';
import colors from '../styles/colors';
import MinhasFontes from '../styles/fonts';


interface ButtonProps extends TouchableOpacityProps {
    titulo: string,
}

export default function Button(props: ButtonProps){
    const {titulo, ...rest} = props;

    return(
        <TouchableOpacity style={style.container} {...rest}>
            <Text style={style.text}>{titulo}</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 16,
        marginBottom: 10, 
        height: 56, 
        width: '70%',
    },
    text: {
        fontSize: 16, 
        fontFamily: MinhasFontes.heading,
        color: colors.white,
    }
});
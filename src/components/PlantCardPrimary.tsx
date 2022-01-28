import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity, 
    TouchableOpacityProps
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends TouchableOpacityProps {
    data: {
        name: string;
        photo: string;
    },
}

export const PlantCardPrimary = ({ data, ...rest }: PlantProps) => {
    return (
        <TouchableOpacity
            style={style.container}
            {...rest}>
            <SvgFromUri uri={data.photo}
                width={70}
                height={70}/>

                <Text style={style.text}>
                {data.name}
            </Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },
    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    }
});
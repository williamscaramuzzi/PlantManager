import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { deletarPlant, PlantProps } from '../libs/storage';

interface CardProps {
    data: {
        name: string,
        photo: string,
        id: string,
        hour: string;
    },
    handleRemove: ()=>void
}

export const PlantCardSecondary = ({data, handleRemove, ...rest} : CardProps) => {

    function deletar(id: string){
        deletarPlant(id);

    }

    return (
        <TouchableOpacity
            style={style.container}
        >
            <SvgFromUri uri={data.photo}
                width={50}
                height={50}
            />
            <Text style={style.title}>
                {data.name}
            </Text>
            <View style={style.details}>
                <Text style={style.timeLabel}>
                    Regar às
                </Text>
                <Text style={style.time}>
                    {data.hour}
                </Text>
            </View>
            <TouchableOpacity style={style.feather} onPress={handleRemove}>
                <View >
                    <Feather
                        name='trash'
                        color={colors.white}
                        size={20}
                    />
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: colors.shape,
        marginVertical: 5,
        height: 100,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
    },
    details: {
        width: 90,
        alignItems: 'center',
    },
    timeLabel: {
        marginTop: 5,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    feather: {
        backgroundColor: colors.red,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 40,
    }
});


{/* <SvgFromUri uri={data.photo}
                        width={70}
                        height={70}
                    />
                    <Text style={style.title}>
                        {data.name}
                    </Text>
                    <View style={style.details}>
                        <Text style={style.timeLabel}>
                            Regar às
                        </Text>
                        <Text style={style.time}>
                            {data.hour}
                        </Text>
                    </View> */}
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image,} from 'react-native';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userImg from '../assets/meu-avatar-github.jpg';
import fonts from '../styles/fonts';

export default function Header(){
    const [username, setUsername] = useState<string>("");
    useEffect(()=>{
        async function getName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUsername(user || '');
        }
        getName();
    }, [username]);
    return (
        <View style={style.container}>
            <View>
                <Text style={style.greeting}>Olá,</Text>
                <Text style={style.username}>{username}</Text>
            </View>
                <Image style={style.image} source={userImg}/>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    username: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
});
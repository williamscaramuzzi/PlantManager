import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Dimensions, StatusBar } from 'react-native';
import colors from '../styles/colors';
import MinhasFontes from '../styles/fonts';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';

const emojis = {
    hug: '🤗',
    smile: '😄'
}
interface Params {
    title: string,
    subtitle: string,
    buttonTitle: string,
    icon: 'smile' | 'hug',
    nextScreen: string
}

export default function Confirmation() {
    const routes = useRoute();
    const {title, subtitle, buttonTitle, icon, nextScreen} = routes.params as Params
    const navigation = useNavigation();

    function handleMoveOn(){
        navigation.navigate(nextScreen as never);
    }

    return (
        <View style={style.welcomecontainer}>
            <View style={style.content}>
                <Text style={style.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={style.title}>
                    {title}
                </Text>
                <Text style={style.subtitle}>
                    {subtitle}
                </Text>
                <View style={style.footer}>
                    <Button titulo={buttonTitle} onPress={handleMoveOn}/>
                </View>
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    welcomecontainer: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        lineHeight: 38,
        marginTop: 15,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: MinhasFontes.heading
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: MinhasFontes.text
    },
    emoji: {
        fontSize: 72,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 40,
        width: '100%',
    }
});
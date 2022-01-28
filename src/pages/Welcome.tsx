import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Dimensions, StatusBar} from 'react-native';

import wateringImg from '../assets/watering.png'; //esse import foi corrigido com a criação do custom.d.ts
import { Feather } from '@expo/vector-icons'; //pacote de ícones vetorizados já prontos como componentes
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import MinhasFontes from '../styles/fonts';

export default function Welcome() {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate("UserIdentification" as never);
        //react-navigation com problema no typescript, ele espera um tipo never, deveria esperar tipo string
        //ele funciona com string, mas fica dando erro, coloquei "as never" pra parar o erro
    }

    return (
        <View style={style.welcomecontainer}>
            <Text style={style.title}>Gerencie {'\n'} suas plantas {'\n'}de forma fácil</Text>

            <Image source={wateringImg} style={style.image}/>

            <Text style={style.subtitle}>
                Não esqueca mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>
            

            <TouchableOpacity onPress={handleStart} style={style.button}>
            <Text>
                <Feather name='chevron-right' style={style.buttonIcon}/>
            </Text>
        </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    welcomecontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    title: {
        fontSize: 32,
        lineHeight: 40,
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
    button: {        
        backgroundColor: colors.green,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 16,
        marginBottom: 10, 
        height: 56, 
        width: 56,
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 20,
    },
    image: {
        height: Dimensions.get('window').width*0.7,
    },
    
});
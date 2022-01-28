import React, { useState } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Platform, 
    StatusBar,
    Alert,
    } from 'react-native';
import Button from '../components/Button';
import colors from '../styles/colors';
import MinhasFontes from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>("");
    const navigation = useNavigation();

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }
    function handleInputFocus(){
        setIsFocused(true);
    }
    function handleInputChange(nome: string){
        setIsFilled(!!nome);
        setName(nome);
    }
    async function handleSubmit(){
        if(!name) return Alert.alert("Digite seu nome");
        await AsyncStorage.setItem('@plantmanager:user', name)
        navigation.navigate("Confirmation" as never, {
            title: 'Prontinho',
            subtitle: 'Agora vamos começar a cuidar das suas plantinhas!',
            buttonTitle: "Começar",
            icon: "smile",
            nextScreen: 'PaginaInicial'
        } as never);
    }

    return (
        <View style={style.welcomecontainer}>
            <View style={style.content}>
                <View style={style.form}>
                    <Text style={style.emoji}>
                        {isFilled? '😄' : '🙂'}
                    </Text>
                    <Text style={style.title}>
                        Como podemos {'\n'}chamar você?
                    </Text>
                    <TextInput 
                        style={[
                            style.input, 
                            (isFocused || isFilled) && {borderColor: colors.green}
                        ]} 
                        placeholder='Digite o nome'
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        onChangeText={(e)=>handleInputChange(e)}
                        />
                    <View style={style.footer}>
                        <Button titulo='Confirmar' onPress={handleSubmit}/>
                    </View>

                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    welcomecontainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
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
    emoji: {
        fontSize: 44
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

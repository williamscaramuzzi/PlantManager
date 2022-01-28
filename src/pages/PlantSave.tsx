import React, { useState } from 'react';
import {
    Alert,
    StyleSheet, Text,
    View, Image, 
    Platform,
    ScrollView,
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterDrop from '../assets/waterdrop.png';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { PlantProps, savePlant } from '../libs/storage';
import { format } from 'date-fns';


interface Params {
    plant: PlantProps
}


export default function PlantSave() {
    const navigation = useNavigation(); //esse cara me permite navegar entre as páginas, passo ele por Provider lá no app
    const route = useRoute(); //esse cara que me deixa recuperar os parametros passados pela rota passada
    const [selectedDateTime, setSelectedDateTime] = useState(new Date);
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
    const { plant } = route.params as Params;

    function handleChangeTime(event: Event, pickedDate: Date | undefined){
        if(!pickedDate) {
            pickedDate = new Date();
            setSelectedDateTime(pickedDate);
            return;
        }
        setSelectedDateTime(pickedDate);
        setShowDatePicker(false);
    }

    async function handleSave(){
        try {
            await savePlant({
                ...plant, 
                dateTimeNotification: selectedDateTime
            });
            navigation.navigate("Confirmation" as never, {
                title: 'Tudo certo',
                subtitle: 'Vamos sempre lembrar você de cuidar da sua plantinha',
                buttonTitle: "Muito Obrigado!",
                icon: "hug",
                nextScreen: 'PaginaInicial'
            } as never);
        } catch (error: any) {
            Alert.alert('Deu erro pra salvar a planta: ', error);
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={estilo.container}>
            <View style={estilo.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />
                <Text style={estilo.plantName}>
                    {plant.name}
                </Text>

                <Text style={estilo.plantAbout}>
                    {plant.about}
                </Text>
            </View>
            <View style={estilo.controller}>
                <View style={estilo.tipContainer}>
                    <Image
                        source={waterDrop}
                        style={estilo.tipImage}
                    />
                    <Text style={estilo.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>
                <Text style={estilo.alertLabel}>
                    Escolha o melhor horário para ser lembrado
                </Text>

                {showDatePicker && (<DateTimePicker
                    value={selectedDateTime}
                    mode="time"
                    display="spinner"
                    onChange={handleChangeTime}
                />)}
                {(Platform.OS ==='android') && (
                    <Button titulo={`Lembrete: ${format(selectedDateTime, 'HH:mm')}`}
                    onPress={()=>{setShowDatePicker(true)}}    
                    />
                )}

                <Button
                    titulo='Cadastrar planta'
                    onPress={handleSave}
                />
            </View>
        </View>
        </ScrollView>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 19,
        marginBottom: 5,
    },
});
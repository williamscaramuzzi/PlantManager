import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import Header from '../components/Header';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterDrop from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { deletarPlant, loadPlant, PlantProps, StoragePlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

export default function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>("");

    function handleRemove(planta: PlantProps){
        Alert.alert('Remover', `Tem certeza que quer excluir a ${planta.name}?`,[
            {text:"Não", style: 'cancel'},
            {text:"Sim", style: 'destructive', onPress: async ()=>{
                try {
                    await deletarPlant(planta.id);

                    setMyPlants((oldData)=>{
                        return oldData.filter((item)=>item.id!=planta.id);
                    })
                } catch (error) {
                    
                }
            }},
        ]);
    }


    useEffect(()=>{
        async function loadStorageData() {
            const salvadas = await loadPlant();
            if(salvadas.length<1){
                setNextWatered("Nenhuma planta salva");
                setMyPlants([]);
                setLoading(false);
                return;
            }
            const nextTime = formatDistance(
                new Date(salvadas[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );

            setNextWatered(`Não esqueça de regar a ${salvadas[0].name} daqui a ${nextTime} .`)
            setMyPlants(salvadas);
            setLoading(false);
        }

        loadStorageData();
    },[]);

    return(
        <View style={estilo.container}>
            <Header/>
            <View style={estilo.spotLight}>
                    <Image
                        source={waterDrop}
                        style={estilo.spotLightImage}
                    />
                    <Text style={estilo.spotLightText}>
                        {nextWatered}
                    </Text>
                </View>

                <View style={estilo.plants}>
                    <Text style={estilo.plantstitle}>
                        Próximas regadas
                    </Text>

                    <FlatList
                    data={myPlants}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({item})=>(
                        <PlantCardSecondary
                            data={item}
                            handleRemove={()=>{handleRemove(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 50, 
        backgroundColor: colors.background
    },
    spotLight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    spotLightImage: {
        width: 60,
        height: 60,

    },
    spotLightText:{
        flex: 1, 
        color: colors.blue,
        paddingHorizontal: 20,
    }, 
    plants: {
        flex: 1,
        width: '100%',
        height: '50%'
    }, 
    plantstitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})
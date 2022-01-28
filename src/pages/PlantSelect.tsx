import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import colors from '../styles/colors';
import Header from '../components/Header';
import fonts from '../styles/fonts';
import EnvironmentButton from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import Load from '../components/Load';
import { useNavigation } from '@react-navigation/native';
import { PlantProps } from '../libs/storage';


interface EnvironmentProps {
    key: string;
    title: string;
    //isso aqui é a tipagem do objeto que vou receber da minha API
}



export function PlantSelect() {
    const navigation = useNavigation(); 
    const [environments, setEnvironments] = useState<EnvironmentProps[]>();
    const [plants, setPlants] = useState<PlantProps[]>();
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>();
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    const [spinner, setSpinner] = useState(false);
    const [loadedAll, setLoadedall] = useState(true);

    const URL = "http://192.168.1.9";

    async function fetchPlants() {
        fetch(`${URL}:3333/plants?_sort=name&_order=asc`)
            .then((dados) => dados.json())
            .then(djeison => {
                console.log("Plantas buscadas no server: ", djeison.length);
                setLoading(false);
                if(djeison.length===0) {
                    setLoadedall(true);
                   
                    return;
                } else {
                    setPlants(djeison);
                    if(environmentSelected==='all') setFilteredPlants(djeison);
                }
            })
            .catch(error => console.error(error));
    }

    function handleEnvironmentSelected(selecionado: string) {
        setEnvironmentSelected(selecionado);

        if (selecionado === 'all') return setFilteredPlants(plants);

        const filtradas = plants!.filter((plant) => (
            plant.environments.includes(selecionado)
        ));

        setFilteredPlants(filtradas);
    }

    // function handleFetchMore(distance: number) {
    //     console.log("entrou no handlefetchmore")
    //     if (distance<0.5 && !loadedAll) {
    //         setSpinner(true);
    //         fetchPlants();
    //     } else {
    //         setSpinner(false);
            
    //     }

    // }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave' as never, {plant} as never);
    }

    //vamos usar {o useEffect pra deixar a API pronta
    useEffect(() => {
        async function fetchEnvironment() {
            fetch(`${URL}:3333/plants_environments?_sort=title&_order=asc`)
                .then((dados) => dados.json())
                .then(djeison => setEnvironments([
                    {
                        key: 'all',
                        title: 'Todos'
                    },
                    ...djeison
                ]))
                .catch(error => console.error(error));
        }
        //fiz um server de mentira com json-sever pra fornecer os dados de API
        // preciso dar fetch com o ip correto, levando em conta que meu celular deve enxergar meu
        //pc na rede. Preciso startar o json-server da maneira correta com meu ip da rede, da seguinte forma: 
        //json-server ./src/services/server.json --host 192.168.0.102 --port 3333 --delay 1000
        //json-server ./src/services/server.json --host 192.168.1.9 --port 3333 --delay 1000
        //o delay serve pra simular um atraso e triggar nossas animações de loading
        fetchEnvironment();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);
    if (loading) return (<Load />);
    return (
        <View style={style.container}>

            <View style={style.header}>
                <Header />
                <Text style={style.title}>Em qual ambiente</Text>
                <Text style={style.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList
                    data={environments}
                    keyExtractor={item=>item.key as string}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            active={item.key === environmentSelected}
                            title={item.title}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    contentContainerStyle={style.environmentList}
                />
            </View>

            <View style={style.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={item=>item.id as string}
                    renderItem={({ item }) => 
                        <PlantCardPrimary data={item} 
                        onPress={(e)=>handlePlantSelect(item)}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    // onEndReachedThreshold={0.1}
                    // onEndReached={obj => handleFetchMore(obj.distanceFromEnd)}
                    ListFooterComponent={
                        spinner
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                />
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    header: {
        padding: 30,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },
    environmentList: {
        height: 40,
        justifyContent: 'space-around',
        paddingBottom: 1,
        marginHorizontal: 2,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32
    },
});
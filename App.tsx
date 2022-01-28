import React, {useEffect} from 'react';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/routes/stack.routes';
import * as Notifications from 'expo-notifications';
import { PlantProps } from './src/libs/storage';


export default function App() {
  const [carregouFontes, erro] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(()=>{
    //observar notificacoes    
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) =>{
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      });
      return ()=> subscription.remove();

      //mostra todas as notificações
      // const data = await Notifications.getAllScheduledNotificationsAsync();
      // console.log(data)

      //deleta todas as notificacoes:
      //await Notifications.cancelAllScheduledNotificationsAsync();
  },[]);

  if (!carregouFontes) return (
    <View>
      <Text>...carregando</Text>
    </View>
  );
  return (
    <NavigationContainer>
      <AppRoutes/>
    </NavigationContainer>
  )
}
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';
import PlantSave from '../pages/PlantSave';
import MyPlants from '../pages/MyPlants';
import AuthRoutes from '../routes/tab.routes';

const stackRoutes = createNativeStackNavigator();

const AppRoutes = () => (
    <stackRoutes.Navigator screenOptions={{ headerShown: false }} >
        <stackRoutes.Screen name="Welcome" component={Welcome} />
        <stackRoutes.Screen name="UserIdentification" component={UserIdentification} />
        <stackRoutes.Screen name="Confirmation" component={Confirmation} />
        <stackRoutes.Screen name="PaginaInicial" component={AuthRoutes} />
        <stackRoutes.Screen name="PlantSave" component={PlantSave} />
        <stackRoutes.Screen name="MyPlants" component={MyPlants} />
    </stackRoutes.Navigator>
);


export default AppRoutes;


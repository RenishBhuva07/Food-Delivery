"use client"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { navigationRef } from "./Navigator"
import Splash from "../Screens/Splash"
import Intro from "../Screens/Intro"
import Login from "../Screens/Login"

const Stack = createNativeStackNavigator()

export default function AppNavigator() {

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
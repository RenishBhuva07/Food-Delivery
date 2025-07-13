import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./HomeScreen"
import CartScreen from "./CartScreen"
import ChatListScreen from "./ChatListScreen"
import ProfileScreen from "./ProfileScreen"
import { Image, Text, View } from "react-native"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import { Colors } from "../Assets/StyleUtilities/Colors"
import { IMAGES } from "../Assets/Images"

const Tab = createBottomTabNavigator()

const Dashboard = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }: { route: { name: string } }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.DefaultWhite,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 80,
                    paddingTop: ResponsivePixels.size10,
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",

                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 10,
                },
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                    let icon: any = IMAGES.ic_home;
                    if (route.name === "Cart") icon = IMAGES.ic_cart;
                    if (route.name === "Chat") icon = IMAGES.ic_chat;
                    if (route.name === "Profile") icon = IMAGES.ic_profile;
                    return (
                        <View>
                            <Image source={icon} style={{
                                width: 32,
                                height: 32,
                                transform: [{ translateY: focused ? 0 : 10 }],
                                tintColor: focused ? Colors.SunburstFlame : Colors.SilverHaze,
                            }} />
                        </View>
                    )
                },
                tabBarLabel: ({ focused }: { focused: boolean }) => {
                    if (!focused) return null
                    return (
                        <Text style={{ fontSize: 15, color: focused ? Colors.SunburstFlame : Colors.SilverHaze, fontWeight: "bold" }}>
                            {route?.name}
                        </Text>
                    )
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Chat" component={ChatListScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default Dashboard;
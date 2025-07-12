"use client"

import type React from "react"
import { useState } from "react"
import { View, StyleSheet } from "react-native"
import HomeScreen from "./HomeScreen"
import CartScreen from "./CartScreen"
import ChatListScreen from "./ChatListScreen"
import ProfileScreen from "./ProfileScreen"
import BottomTabNavigator from "../Navigators/BottomTabNavigator"
import { Colors } from "../Assets/StyleUtilities/Colors"

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Home")

    const renderActiveScreen = () => {
        switch (activeTab) {
            case "Home":
                return <HomeScreen />
            case "Cart":
                return <CartScreen />
            case "Chat":
                return <ChatListScreen />
            case "Profile":
                return <ProfileScreen />
            default:
                return <HomeScreen />
        }
    }

    return (
        <View style={styles.container}>
            {renderActiveScreen()}
            <BottomTabNavigator activeTab={activeTab} onTabPress={setActiveTab} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.SunburstFlameLight,
    },
})

export default Dashboard

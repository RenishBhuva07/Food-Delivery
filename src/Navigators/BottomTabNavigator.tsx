import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import { Colors } from "../Assets/StyleUtilities/Colors"

interface BottomTabNavigatorProps {
    activeTab: string
    onTabPress: (tab: string) => void
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ activeTab, onTabPress }) => {
    const tabs = [
        { id: "Home", icon: "🏠", label: "Home" },
        { id: "Cart", icon: "🛒", label: "Cart" },
        { id: "Chat", icon: "💬", label: "Chat" },
        { id: "Profile", icon: "👤", label: "Profile" },
    ]

    return (
        <View style={styles.tabBar}>
            {tabs?.map((tab) => (
                <TouchableOpacity key={tab.id} style={styles.tabItem} onPress={() => onTabPress(tab.id)}>
                    <Text style={[styles.tabIcon, activeTab === tab.id && styles.activeTabIcon]}>{tab.icon}</Text>
                    <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabel]}>{tab.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: ResponsivePixels.size12,
        backgroundColor: Colors.DefaultWhite,
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,

        shadowColor: Colors.ErrorRed,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 40,
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    tabIcon: {
        fontSize: ResponsivePixels.size24,
        marginBottom: ResponsivePixels.size4,
        opacity: 0.6,
    },
    activeTabIcon: {
        opacity: 1,
    },
    tabLabel: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
        fontWeight: "500",
    },
    activeTabLabel: {
        color: Colors.SunburstFlame,
        fontWeight: "600",
    },
})

export default BottomTabNavigator

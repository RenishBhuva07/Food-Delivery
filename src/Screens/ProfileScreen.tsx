import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import MainContainer from "../common/MainContainer"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"

const ProfileScreen: React.FC = () => {
    const menuItems = [
        {
            id: 1,
            icon: "👤",
            title: "Personal Data",
            section: "profile",
        },
        {
            id: 2,
            icon: "⚙️",
            title: "Settings",
            section: "profile",
        },
        {
            id: 3,
            icon: "💳",
            title: "Extra Card",
            section: "profile",
        },
        {
            id: 4,
            icon: "ℹ️",
            title: "Help Center",
            section: "support",
        },
        {
            id: 5,
            icon: "🗑️",
            title: "Request Account Deletion",
            section: "support",
        },
        {
            id: 6,
            icon: "👥",
            title: "Add another account",
            section: "support",
        },
    ]

    const renderMenuItem = (item: any) => (
        <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
    )

    return (
        <MainContainer
            statusBarStyle="dark-content"
            statusBarBackgroundColor="transparent"
            containerBackgroundColor={Colors.SunburstFlameLight}
            translucent={true}
        >
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Profile Settings</Text>
                </View>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: "/placeholder.svg?height=100&width=100" }} style={styles.avatar} />
                        <View style={styles.editBadge}>
                            <Text style={styles.editIcon}>📷</Text>
                        </View>
                    </View>
                    <Text style={styles.userName}>Albert Stevano Bajefski</Text>
                    <Text style={styles.userEmail}>Albertstevano@gmail.com</Text>
                </View>

                {/* My Orders Section */}
                <View style={styles.ordersSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>My Orders</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <Text style={styles.orderIdLabel}>Order ID</Text>
                            <Text style={styles.orderId}>888333777</Text>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>In Delivery</Text>
                            </View>
                        </View>

                        <View style={styles.orderContent}>
                            <Image source={{ uri: "/placeholder.svg?height=60&width=60" }} style={styles.orderImage} />
                            <View style={styles.orderDetails}>
                                <Text style={styles.orderItemName}>Burger With Meat</Text>
                                <Text style={styles.orderPrice}>$12,230</Text>
                            </View>
                            <Text style={styles.orderQuantity}>14 Items</Text>
                        </View>
                    </View>
                </View>

                {/* Profile Menu */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>Profile</Text>
                    {menuItems.filter((item) => item.section === "profile").map(renderMenuItem)}
                </View>

                {/* Support Menu */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>Support</Text>
                    {menuItems.filter((item) => item.section === "support").map(renderMenuItem)}
                </View>

                {/* Sign Out Button */}
                <TouchableOpacity style={styles.signOutButton}>
                    <Text style={styles.signOutIcon}>🚪</Text>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>

                <View style={styles.bottomSpacing} />
            </ScrollView>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    header: {
        alignItems: "center",
        paddingVertical: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size24,
    },
    title: {
        fontSize: ResponsivePixels.size24,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    profileSection: {
        alignItems: "center",
        paddingHorizontal: ResponsivePixels.size24,
        paddingVertical: ResponsivePixels.size20,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: ResponsivePixels.size16,
    },
    avatar: {
        width: ResponsivePixels.size100,
        height: ResponsivePixels.size100,
        borderRadius: ResponsivePixels.size50,
    },
    editBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: ResponsivePixels.size32,
        height: ResponsivePixels.size32,
        backgroundColor: Colors.SunburstFlame,
        borderRadius: ResponsivePixels.size16,
        alignItems: "center",
        justifyContent: "center",
    },
    editIcon: {
        fontSize: ResponsivePixels.size16,
    },
    userName: {
        fontSize: ResponsivePixels.size20,
        fontWeight: "600",
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size4,
    },
    userEmail: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
    },
    ordersSection: {
        paddingHorizontal: ResponsivePixels.size24,
        marginBottom: ResponsivePixels.size30,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: ResponsivePixels.size16,
    },
    sectionTitle: {
        fontSize: ResponsivePixels.size18,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    seeAllText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SunburstFlame,
        fontWeight: "500",
    },
    orderCard: {
        backgroundColor: Colors.FrostedHaze,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
    },
    orderHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: ResponsivePixels.size12,
    },
    orderIdLabel: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
        marginRight: ResponsivePixels.size8,
    },
    orderId: {
        fontSize: ResponsivePixels.size12,
        fontWeight: "600",
        color: Colors.NoirBlack,
        flex: 1,
    },
    statusBadge: {
        backgroundColor: Colors.SunburstFlame,
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size4,
        borderRadius: ResponsivePixels.size12,
    },
    statusText: {
        fontSize: ResponsivePixels.size12,
        color: Colors.DefaultWhite,
        fontWeight: "500",
    },
    orderContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    orderImage: {
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size50,
        borderRadius: ResponsivePixels.size8,
        marginRight: ResponsivePixels.size12,
    },
    orderDetails: {
        flex: 1,
    },
    orderItemName: {
        fontSize: ResponsivePixels.size14,
        fontWeight: "600",
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size2,
    },
    orderPrice: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SunburstFlame,
        fontWeight: "600",
    },
    orderQuantity: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
    },
    menuSection: {
        paddingHorizontal: ResponsivePixels.size24,
        marginBottom: ResponsivePixels.size30,
    },
    menuSectionTitle: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size16,
        textTransform: "uppercase",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: ResponsivePixels.size16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.CloudWhisper,
    },
    menuItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    menuIcon: {
        fontSize: ResponsivePixels.size20,
        marginRight: ResponsivePixels.size16,
    },
    menuTitle: {
        fontSize: ResponsivePixels.size16,
        color: Colors.NoirBlack,
        fontWeight: "500",
    },
    chevron: {
        fontSize: ResponsivePixels.size20,
        color: Colors.SteelMist,
    },
    signOutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: ResponsivePixels.size24,
        paddingVertical: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size12,
        borderWidth: 1,
        borderColor: "#FF4444",
        backgroundColor: "rgba(255, 68, 68, 0.1)",
    },
    signOutIcon: {
        fontSize: ResponsivePixels.size20,
        marginRight: ResponsivePixels.size8,
    },
    signOutText: {
        fontSize: ResponsivePixels.size16,
        color: "#FF4444",
        fontWeight: "600",
    },
    bottomSpacing: {
        height: ResponsivePixels.size100,
    },
})

export default ProfileScreen

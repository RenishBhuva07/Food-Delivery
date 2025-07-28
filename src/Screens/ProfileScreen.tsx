import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import MainContainer from "../common/MainContainer"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import { IMAGES } from "../Assets/Images"
import { useState } from "react"
import { themes } from "../Assets/StyleUtilities/CommonStyleSheets/theme"

const ProfileScreen: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false),

        menuItems = [
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
        ],

        handleScroll = (event: { nativeEvent: { contentOffset: { y: any } } }) => {
            const y = event.nativeEvent.contentOffset.y;
            setIsScrolled(y > 0);
        };

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
            statusBarBackgroundColor={!isScrolled ? "transparent" : Colors.SunburstFlame}
            containerBackgroundColor={Colors.SunburstFlameLight}
            translucent={true}
            showHeader
            header={{
                headerBackgroundColor: !isScrolled ? Colors.SunburstFlameLight : Colors.SunburstFlame,
                headerTitle: "Profile",
                headerTitleColor: Colors.NoirBlack,
            }}
        >
            <View style={styles.container}>

                <View style={[styles.profileSection, isScrolled ? styles.profileSectionSticky : {}]}>
                    <View style={[styles.avatarContainer, { borderColor: !isScrolled ? Colors.SunburstFlame : Colors.DefaultWhite }]}>
                        <Image source={IMAGES.user_two} style={styles.avatar} />
                        <View style={[styles.editBadge, { backgroundColor: !isScrolled ? Colors.SunburstFlame : Colors.DefaultWhite }]}>
                            <Text style={styles.editIcon}>📷</Text>
                        </View>
                    </View>
                    <Text style={styles.userName}>Albert Stevano Bajefski</Text>
                    <Text style={[styles.userEmail, { color: !isScrolled ? Colors.SteelMist : Colors.DefaultWhite }]}>Albertstevano@gmail.com</Text>
                </View>

                <ScrollView onScroll={handleScroll} scrollEventThrottle={16} >
                    <View style={styles.ordersSection}>
                        <View style={[styles.orderCard]}>

                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>My Orders</Text>
                                <TouchableOpacity>
                                    <Text style={styles.seeAllText}>See All</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.orderHeader}>
                                <Text style={styles.orderIdLabel}>Order ID</Text>
                                <Text style={styles.orderId}>888333777</Text>
                                <View style={[styles.statusBadge]}>
                                    <Text style={styles.statusText}>In Delivery</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.orderContent}>
                                <View style={styles.foodImageContainer}>
                                    <Image source={IMAGES.ordinary_burgers} style={styles.orderImage} />
                                </View>
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
                    <TouchableOpacity style={[styles.signOutButton, styles.bottomSpacing]}>
                        <Text style={styles.signOutIcon}>🚪</Text>
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        paddingVertical: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size20,
    },
    title: {
        fontSize: ResponsivePixels.size24,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    profileSection: {
        alignItems: "center",
        paddingHorizontal: ResponsivePixels.size20,
        paddingVertical: ResponsivePixels.size10,
    },
    profileSectionSticky: {
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        backgroundColor: Colors.SunburstFlame,
    },
    avatarContainer: {
        position: "relative",
        borderRadius: 60,
        borderWidth: 2,
        borderColor: Colors.SunburstFlame,
        marginBottom: ResponsivePixels.size16,
        ...themes.shadows.regular
    },
    avatar: {
        width: ResponsivePixels.size100,
        height: ResponsivePixels.size100,
        borderRadius: 50,
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
        ...themes.shadows.regular
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
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size10,
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
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        ...themes.shadows.regular
    },
    orderHeader: {
        flexDirection: "row",
        alignItems: "center",
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
        paddingHorizontal: ResponsivePixels.size10,
        paddingVertical: ResponsivePixels.size4,
        borderRadius: ResponsivePixels.size12,
        ...themes.shadows.regular
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
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    foodImageContainer: {
        width: ResponsivePixels.size54,
        height: ResponsivePixels.size54,
        overflow: "hidden",
        position: "relative",
        marginRight: ResponsivePixels.size14,
    },
    orderDetails: {
        flex: 1,
        gap: ResponsivePixels.size4,
    },
    orderItemName: {
        fontSize: ResponsivePixels.size14,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    orderPrice: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SunburstFlame,
        fontWeight: "600",
    },
    orderQuantity: {
        fontSize: ResponsivePixels.size12,
        color: Colors.NoirBlack,
    },
    menuSection: {
        paddingHorizontal: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size30,
    },
    menuSectionTitle: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size8,
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
        marginHorizontal: ResponsivePixels.size20,
        paddingVertical: ResponsivePixels.size16,
        backgroundColor: Colors.DefaultWhite,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: Colors.MoonDust,
        ...themes.shadows.light
    },
    signOutIcon: {
        fontSize: ResponsivePixels.size20,
        marginRight: ResponsivePixels.size8,
    },
    signOutText: {
        fontSize: ResponsivePixels.size16,
        color: Colors.ErrorRedLight,
        fontWeight: "600",
    },
    bottomSpacing: {
        marginBottom: ResponsivePixels.size100,
    },
    divider: {
        borderTopWidth: 1,
        borderTopColor: Colors.FrostedMist,
        flex: 1,
        marginVertical: ResponsivePixels.size12,
    },
})

export default ProfileScreen;
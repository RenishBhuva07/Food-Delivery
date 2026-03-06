import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import MainContainer from "../common/MainContainer"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import { IMAGES } from "../Assets/Images"
import { useRef, useState } from "react"
import { themes } from "../Assets/StyleUtilities/CommonStyleSheets/theme"
import CustomModal, { CustomModalRef, ModalButton } from "../common/CustomModal"
import { navigate, resetNavigation } from "../Navigators/Navigator"
import { Typography } from "../Theme/Typographys"
import { Camera, ChevronRight, CreditCard, HelpCircle, LogOut, Settings, Trash2, User, UserPlus } from "lucide-react-native"
import AddAccountSheet, { AddAccountSheetRef } from "../Components/AddAccountSheet"

const ProfileScreen: React.FC = () => {
    const signOutModalRef = useRef<CustomModalRef>(null);
    const accountDeletionModalRef = useRef<CustomModalRef>(null);
    const addAccountSheetRef = useRef<AddAccountSheetRef>(null);
    const [isScrolled, setIsScrolled] = useState(false),

        menuItems = [
            {
                id: 1,
                Icon: User,
                title: "Personal Data",
                section: "profile",
                onPress: () => navigate("PersonalData"),
            },
            {
                id: 2,
                Icon: Settings,
                title: "Settings",
                section: "profile",
                onPress: () => navigate("SettingsScreen"),
            },
            {
                id: 3,
                Icon: CreditCard,
                title: "Extra Card",
                section: "profile",
                onPress: () => navigate("ExtraCardListScreen"),
            },
            {
                id: 4,
                Icon: HelpCircle,
                title: "Help Center",
                section: "support",
                onPress: () => navigate("HelpCenterScreen"),
            },
            {
                id: 5,
                Icon: Trash2,
                title: "Request Account Deletion",
                section: "support",
                onPress: () => accountDeletionModalRef.current?.show(),
            },
            {
                id: 6,
                Icon: UserPlus,
                title: "Add another account",
                section: "support",
                onPress: () => addAccountSheetRef.current?.show(),
            },
        ],

        signOutButtons: ModalButton[] = [
            {
                text: 'Cancel',
                style: 'secondary',
                onPress: () => {
                    console.log('Cancel pressed');
                    signOutModalRef.current?.hide();
                },
            },
            {
                text: 'Log Out',
                style: 'primary',
                onPress: () => {
                    console.log('Log out pressed');
                    signOutModalRef.current?.hide();
                    resetNavigation("Login");
                },
            },
        ],

        accountDeletionButtons: ModalButton[] = [
            {
                text: 'Cancel',
                style: 'secondary',
                onPress: () => {
                    console.log('Cancel deletion pressed');
                    accountDeletionModalRef.current?.hide();
                },
            },
            {
                text: 'Delete',
                style: 'primary',
                onPress: () => {
                    console.log('Delete account pressed');
                    accountDeletionModalRef.current?.hide();
                    // Handle account deletion logic
                },
            },
        ],

        handleScroll = (event: { nativeEvent: { contentOffset: { y: any } } }) => {
            const y = event.nativeEvent.contentOffset.y;
            setIsScrolled(y > 0);
        };

    const renderMenuItem = (item: any) => (
        <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item?.onPress}>
            <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                    <item.Icon size={20} color={Colors.NoirBlack} style={styles.menuIcon} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <ChevronRight size={24} color={Colors.NoirBlack} />
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
                            <Camera size={16} color={!isScrolled ? Colors.DefaultWhite : Colors.SunburstFlame} />
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
                                <TouchableOpacity onPress={() => navigate("MyOrdersScreen")}>
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
                        {menuItems.filter((item) => item.section === "profile")?.map(renderMenuItem)}
                    </View>

                    {/* Support Menu */}
                    <View style={styles.menuSection}>
                        <Text style={styles.menuSectionTitle}>Support</Text>
                        {menuItems.filter((item) => item.section === "support")?.map(renderMenuItem)}
                    </View>

                    {/* Sign Out Button */}
                    <TouchableOpacity style={[styles.signOutButton, styles.bottomSpacing]} onPress={() => signOutModalRef?.current?.show()}>
                        <LogOut size={20} color={Colors.ErrorRedLight} style={styles.signOutIcon} />
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
            {/* Sign Out Modal */}
            <CustomModal
                ref={signOutModalRef}
                title="Sign Out"
                message="Do you want to log out?"
                buttons={signOutButtons}
                animationType="scale"
            />

            <CustomModal
                ref={accountDeletionModalRef}
                title="Account Deletion"
                message="Are you sure you want to delete your account? This action cannot be undone."
                buttons={accountDeletionButtons}
                animationType="scale"
            />

            <AddAccountSheet
                ref={addAccountSheetRef}
                onAccountSwitch={(account) => {
                    console.log('Switched to account:', account.email);
                }}
                onAccountAdded={(account) => {
                    console.log('New account added:', account.email);
                }}
            />
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
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size4,
        ...Typography.bodyLargeBold,
    },
    userEmail: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumRegular,
    },
    ordersSection: {
        paddingHorizontal: ResponsivePixels.size12,
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
        ...Typography.bodyLargeSemiBold,
    },
    seeAllText: {
        ...Typography.bodyMediumSemiBold,
        color: Colors.SunburstFlame,
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
        color: Colors.SteelMist,
        marginRight: ResponsivePixels.size8,
        ...Typography.bodySmallSemiBold,
    },
    orderId: {
        color: Colors.NoirBlack,
        flex: 1,
        ...Typography.bodySmallSemiBold,
    },
    statusBadge: {
        backgroundColor: Colors.SunburstFlame,
        paddingHorizontal: ResponsivePixels.size10,
        paddingVertical: ResponsivePixels.size4,
        borderRadius: ResponsivePixels.size12,
        ...themes.shadows.regular
    },
    statusText: {
        color: Colors.DefaultWhite,
        ...Typography.bodySuperSmallMedium,
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
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    orderPrice: {
        color: Colors.SunburstFlame,
        ...Typography.bodyMediumBold,
    },
    orderQuantity: {
        color: Colors.NoirBlack,
        ...Typography.bodySmallMedium,
    },
    menuSection: {
        paddingHorizontal: ResponsivePixels.size12,
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
        paddingVertical: ResponsivePixels.size12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.CloudWhisper,
    },
    menuItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: ResponsivePixels.size16,
    },
    menuIcon: {
        fontSize: ResponsivePixels.size20,
    },
    menuIconContainer: {
        backgroundColor: Colors.FrostedLilacMist,
        padding: 5,
        borderRadius: 8,
    },
    menuTitle: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumMedium,
    },
    chevron: {
        fontSize: ResponsivePixels.size20,
        color: Colors.SteelMist,
    },
    signOutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size10,
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
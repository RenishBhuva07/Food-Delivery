
import React from 'react';
import { View, Text, StyleSheet, SectionList, Image, TouchableOpacity } from 'react-native';
import MainContainer from '../common/MainContainer';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';
import { goBack } from '../Navigators/Navigator';
import { Typography, ShadowStyles } from '../Theme/Typographys';

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    date?: string;
    icon: any;
    iconBgColor: string;
    iconColor: string;
    isNew?: boolean;
}

interface SectionData {
    title: string;
    data: NotificationItem[];
}

const NOTIFICATIONS: SectionData[] = [
    {
        title: "Today",
        data: [
            {
                id: '1',
                title: "30% Special Discount!",
                description: "Special promotion only valid today",
                icon: IMAGES.ic_promo_code,
                iconBgColor: "rgba(255, 59, 48, 0.1)",
                iconColor: Colors.ErrorRed
            },
            {
                id: '2',
                title: "Your Order Has Been Taken by the Driver",
                description: "Recently",
                icon: IMAGES.ic_Double_Tick,
                iconBgColor: "rgba(76, 175, 80, 0.1)",
                iconColor: "#4CAF50"
            },
            {
                id: '3',
                title: "Your Order Has Been Canceled",
                description: "19 Jun 2023",
                icon: IMAGES.ic_Delete,
                iconBgColor: "rgba(255, 59, 48, 0.1)",
                iconColor: Colors.ErrorRed
            }
        ]
    },
    {
        title: "Yesterday",
        data: [
            {
                id: '4',
                title: "35% Special Discount!",
                description: "Special promotion only valid today",
                icon: IMAGES.ic_Email,
                iconBgColor: "rgba(254, 173, 29, 0.1)",
                iconColor: Colors.SunburstFlame
            },
            {
                id: '5',
                title: "Account Setup Clean!",
                description: "Special promotion only valid today",
                icon: IMAGES.ic_profile,
                iconBgColor: "rgba(76, 175, 80, 0.1)",
                iconColor: "#4CAF50"
            },
            {
                id: '6',
                title: "Special Offer! 60% Off",
                description: "Special offer for new account, valid until 20 Nov 2022",
                icon: IMAGES.ic_promo_code,
                iconBgColor: "rgba(254, 173, 29, 0.1)",
                iconColor: Colors.SunburstFlame
            },
            {
                id: '7',
                title: "Credit Card Connected",
                description: "Special promotion only valid today",
                icon: IMAGES.ic_promo_code,
                iconBgColor: "rgba(255, 193, 7, 0.1)",
                iconColor: "#FFC107"
            }
        ]
    }
];

const NotificationScreen = () => {

    const renderItem = ({ item }: { item: NotificationItem }) => (
        <TouchableOpacity style={styles.notificationItem} activeOpacity={1}>
            <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor }]}>
                <Image
                    source={item.icon}
                    style={[styles.icon, { tintColor: item.iconColor }]}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderSectionHeader = ({ section: { title } }: { section: SectionData }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    return (
        <MainContainer
            statusBarStyle="dark-content"
            containerBackgroundColor={Colors.DefaultWhite}
            header={{
                headerTitle: "Notification",
                headerTitleColor: Colors.NoirBlack,
                headerBackgroundColor: Colors.DefaultWhite,
                headerLeft: {
                    icon: IMAGES.ic_Back,
                    onPress: () => goBack()
                }
            }}
            showHeader={true}
        >
            <SectionList
                sections={NOTIFICATIONS}
                keyExtractor={(item, index) => item.id + index}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
            />
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: ResponsivePixels.size12,
        paddingBottom: ResponsivePixels.size20,
    },
    sectionHeader: {
        marginTop: ResponsivePixels.size10,
        marginBottom: ResponsivePixels.size16,
    },
    sectionHeaderText: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumSemiBold,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size15,
        backgroundColor: Colors.DefaultWhite,
        borderRadius: 14,

        ...ShadowStyles.shadow,
        marginBottom: ResponsivePixels.size10,
        paddingHorizontal: ResponsivePixels.size15,
    },
    iconContainer: {
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size15,
    },
    icon: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size4,
        ...Typography.bodyLargeSemiBold,
    },
    description: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumRegular,
    },

});

export default NotificationScreen;

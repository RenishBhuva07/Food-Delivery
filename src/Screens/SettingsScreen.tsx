import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, FlatList } from 'react-native';
import { Bell, MapPin, Globe, Info, Shield, FileText, ChevronRight, Check, type LucideIcon } from 'lucide-react-native';
import MainContainer from '../common/MainContainer';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../Theme/Typographys';
import { IMAGES } from '../Assets/Images';
import { goBack, navigate } from '../Navigators/Navigator';
import CustomActionSheet from '../common/CustomActionSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';
import CustomButton from '../common/CustomButton';

const CMS_DATA: Record<string, { title: string; lastUpdated: string; sections: { heading?: string; body: string }[] }> = {
    'About Us': {
        title: 'About Us',
        lastUpdated: 'January 15, 2026',
        sections: [
            {
                heading: 'Who We Are',
                body: 'Welcome to FoodDelivery — your go-to platform for discovering and ordering delicious meals from the best local restaurants. We are a passionate team of food lovers and tech enthusiasts committed to making food ordering fast, simple, and delightful.',
            },
            {
                heading: 'Our Mission',
                body: 'Our mission is to connect people with the food they love, delivered right to their doorstep. We believe that great food should be accessible to everyone, anytime, anywhere.',
            },
            {
                heading: 'What We Offer',
                body: 'We partner with a wide variety of restaurants and kitchens to bring you an extensive menu — from everyday meals to gourmet dishes. Whether you\'re craving comfort food or looking to try something new, we\'ve got you covered.',
            },
            {
                heading: 'Why Choose Us',
                body: '• Fast & reliable delivery\n• Wide selection of restaurants\n• Easy-to-use app with real-time tracking\n• Secure payment options\n• Dedicated customer support',
            },
            {
                heading: 'Contact Us',
                body: 'Have questions or feedback? We\'d love to hear from you!\n\nEmail: support@fooddelivery.com\nPhone: +1 (800) 123-4567',
            },
        ],
    },
    'Privacy Policy': {
        title: 'Privacy Policy',
        lastUpdated: 'December 10, 2025',
        sections: [
            {
                body: 'This Privacy Policy describes how FoodDelivery collects, uses, and shares your personal information when you use our mobile application and services.',
            },
            {
                heading: '1. Information We Collect',
                body: 'We collect information you provide directly to us, such as your name, email address, phone number, delivery address, and payment information. We also automatically collect certain information when you use our app, including device information, location data, and usage analytics.',
            },
            {
                heading: '2. How We Use Your Information',
                body: 'We use the information we collect to:\n\n• Process and deliver your orders\n• Communicate with you about your orders and account\n• Personalize your experience and provide recommendations\n• Improve and optimize our services\n• Ensure the security of our platform\n• Comply with legal obligations',
            },
            {
                heading: '3. Information Sharing',
                body: 'We may share your information with restaurant partners to fulfill your orders, delivery personnel for order delivery, payment processors for transaction processing, and service providers who assist us in operating our platform. We do not sell your personal information to third parties.',
            },
            {
                heading: '4. Data Security',
                body: 'We implement industry-standard security measures to protect your personal information. This includes encryption of sensitive data, secure server infrastructure, and regular security audits. However, no method of transmission over the internet is 100% secure.',
            },
            {
                heading: '5. Your Rights',
                body: 'You have the right to access, update, or delete your personal information at any time through the app settings. You may also opt out of marketing communications by adjusting your notification preferences.',
            },
            {
                heading: '6. Contact Us',
                body: 'If you have any questions about this Privacy Policy, please contact us at privacy@fooddelivery.com.',
            },
        ],
    },
    'Terms and Conditions': {
        title: 'Terms and Conditions',
        lastUpdated: 'November 20, 2025',
        sections: [
            {
                body: 'Please read these Terms and Conditions carefully before using the FoodDelivery mobile application. By accessing or using our service, you agree to be bound by these terms.',
            },
            {
                heading: '1. Acceptance of Terms',
                body: 'By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.',
            },
            {
                heading: '2. Account Registration',
                body: 'To use our services, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
            },
            {
                heading: '3. Orders and Payments',
                body: 'All orders placed through the app are subject to acceptance and availability. Prices displayed are inclusive of applicable taxes unless stated otherwise. Payment must be made at the time of placing the order using the available payment methods.',
            },
            {
                heading: '4. Delivery',
                body: 'We strive to deliver your orders within the estimated delivery time. However, delivery times are estimates and may vary due to factors beyond our control such as weather conditions, traffic, and restaurant preparation times.',
            },
            {
                heading: '5. Cancellations and Refunds',
                body: 'Orders can be cancelled within a limited time window after placement. Refunds will be processed according to our refund policy and may take 5-7 business days to reflect in your account. Refund eligibility depends on the order status at the time of cancellation.',
            },
            {
                heading: '6. User Conduct',
                body: 'You agree not to misuse our services, provide false information, harass delivery personnel or restaurant partners, or engage in any fraudulent activities. Violation of these terms may result in account suspension or termination.',
            },
            {
                heading: '7. Limitation of Liability',
                body: 'FoodDelivery shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you for the specific order in question.',
            },
            {
                heading: '8. Changes to Terms',
                body: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes constitutes acceptance of the modified terms.',
            },
        ],
    },
};


interface LanguageOption {
    id: number;
    flag: string;
    name: string;
    code: string;
}

const LANGUAGES: LanguageOption[] = [
    { id: 1, flag: '🇮🇩', name: 'Indonesia', code: 'id' },
    { id: 2, flag: '🇺🇸', name: 'English (US)', code: 'en' },
    { id: 3, flag: '🇹🇭', name: 'Thailand', code: 'th' },
    { id: 4, flag: '🇨🇳', name: 'Chinese', code: 'zh' },
];

interface SettingsItemProps {
    title: string;
    type: 'toggle' | 'navigation';
    Icon: LucideIcon;
    value?: boolean;
    rightText?: string;
    onToggle?: (value: boolean) => void;
    onPress?: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
    title,
    type,
    Icon,
    value,
    rightText,
    onToggle,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.settingsItem}
            onPress={type === 'navigation' ? onPress : undefined}
            activeOpacity={type === 'navigation' ? 0.7 : 1}
            disabled={type === 'toggle'}
        >
            <View style={styles.itemLeft}>
                <View style={styles.iconContainer}>
                    <Icon size={20} color={Colors.NoirBlack} />
                </View>
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
            <View style={styles.itemRight}>
                {type === 'toggle' && (
                    <Switch
                        value={value}
                        onValueChange={onToggle}
                        trackColor={{
                            false: Colors.MoonDust,
                            true: Colors.SunburstFlame,
                        }}
                        thumbColor={Colors.DefaultWhite}
                    />
                )}
                {type === 'navigation' && (
                    <>
                        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
                        <ChevronRight size={20} color={Colors.NoirBlack} />
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

const SettingsScreen: React.FC = () => {
    const [pushNotification, setPushNotification] = useState(false);
    const [location, setLocation] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(LANGUAGES[1]); // Default to English (US)
    const [tempSelectedLanguage, setTempSelectedLanguage] = useState<LanguageOption>(LANGUAGES[1]);
    const languageSheetRef = useRef<ActionSheetRef>(null);

    const openLanguageSheet = () => {
        setTempSelectedLanguage(selectedLanguage);
        languageSheetRef.current?.show();
    };

    const handleLanguageSelect = () => {
        setSelectedLanguage(tempSelectedLanguage);
        languageSheetRef.current?.hide();
    };

    const renderLanguageItem = ({ item }: { item: LanguageOption }) => {
        const isSelected = tempSelectedLanguage.code === item.code;
        return (
            <TouchableOpacity
                style={[
                    styles.languageCard,
                    isSelected && styles.languageCardSelected
                ]}
                onPress={() => setTempSelectedLanguage(item)}
                activeOpacity={0.7}
            >
                <View style={styles.languageContent}>
                    <View style={styles.flagContainer}>
                        <Text style={styles.flagText}>{item.flag}</Text>
                    </View>
                    <Text style={[
                        styles.languageName,
                        isSelected && styles.languageNameSelected
                    ]}>
                        {item.name}
                    </Text>
                    {isSelected && (
                        <View style={styles.checkmark}>
                            <Check size={16} color={Colors.DefaultWhite} strokeWidth={3} />
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <MainContainer
                statusBarStyle="dark-content"
                containerBackgroundColor={Colors.DefaultWhite}
                showHeader
                header={{
                    headerTitle: "Settings",
                    headerTitleColor: Colors.NoirBlack,
                    headerBackgroundColor: Colors.DefaultWhite,
                    headerLeft: {
                        icon: IMAGES.ic_Back,
                        onPress: () => goBack(),
                        color: Colors.NoirBlack,
                    },
                }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* PROFILE Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>PROFILE</Text>

                        <SettingsItem
                            title="Push Notification"
                            type="toggle"
                            Icon={Bell}
                            value={pushNotification}
                            onToggle={setPushNotification}
                        />

                        <SettingsItem
                            title="Location"
                            type="toggle"
                            Icon={MapPin}
                            value={location}
                            onToggle={setLocation}
                        />

                        <SettingsItem
                            title="Language"
                            type="navigation"
                            Icon={Globe}
                            rightText={selectedLanguage.name}
                            onPress={openLanguageSheet}
                        />
                    </View>

                    {/* OTHER Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>OTHER</Text>

                        <SettingsItem
                            title="About Us"
                            type="navigation"
                            Icon={Info}
                            onPress={() => navigate('CMSScreen', CMS_DATA['About Us'])}
                        />

                        <SettingsItem
                            title="Privacy Policy"
                            type="navigation"
                            Icon={Shield}
                            onPress={() => navigate('CMSScreen', CMS_DATA['Privacy Policy'])}
                        />

                        <SettingsItem
                            title="Terms and Conditions"
                            type="navigation"
                            Icon={FileText}
                            onPress={() => navigate('CMSScreen', CMS_DATA['Terms and Conditions'])}
                        />
                    </View>
                </ScrollView>
            </MainContainer>

            {/* Language Selection Action Sheet */}
            <CustomActionSheet ref={languageSheetRef}>
                <View style={ActionSheetStyles.actionSheetContent}>
                    <Text style={ActionSheetStyles.actionSheetTitle}>Select Language</Text>

                    <View style={styles.languageList}>
                        <FlatList
                            data={LANGUAGES}
                            renderItem={renderLanguageItem}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                        />
                    </View>

                    <CustomButton title="Select" onPress={handleLanguageSelect} />
                </View>
            </CustomActionSheet>
        </>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingTop: ResponsivePixels.size10,
    },
    section: {
        paddingHorizontal: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size30,
    },
    sectionTitle: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size8,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: ResponsivePixels.size12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.CloudWhisper,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: ResponsivePixels.size16,
    },
    iconContainer: {
        backgroundColor: Colors.FrostedLilacMist,
        padding: 5,
        borderRadius: 8,
    },
    itemTitle: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumMedium,
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightText: {
        color: Colors.NoirBlack,
        marginRight: ResponsivePixels.size8,
        ...Typography.bodyMediumRegular,
    },
    // Language Action Sheet Styles
    languageList: {
        marginTop: ResponsivePixels.size10,
        marginBottom: ResponsivePixels.size20,
    },
    languageCard: {
        borderWidth: 1,
        borderColor: Colors.CloudWhisper,
        borderRadius: 16,
        padding: ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size12,
        backgroundColor: Colors.DefaultWhite,
    },
    languageCardSelected: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.SunlitAlmond,
    },
    languageContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagContainer: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 20,
        backgroundColor: Colors.FrostedHaze,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ResponsivePixels.size16,
    },
    flagText: {
        fontSize: ResponsivePixels.size20,
    },
    languageName: {
        flex: 1,
        fontSize: ResponsivePixels.size16,
        fontWeight: '500',
        color: Colors.NoirBlack,
    },
    languageNameSelected: {
        color: Colors.NoirBlack,
    },
    checkmark: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: 12,
        backgroundColor: Colors.SunburstFlame,
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectButtonWrapper: {
        marginBottom: ResponsivePixels.size10,
    },
});

export default SettingsScreen;

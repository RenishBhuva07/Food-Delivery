import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, FlatList } from 'react-native';
import MainContainer from '../common/MainContainer';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';
import { goBack } from '../Navigators/Navigator';
import CustomActionSheet from '../common/CustomActionSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';
import CustomButton from '../common/CustomButton';

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
    value?: boolean;
    rightText?: string;
    onToggle?: (value: boolean) => void;
    onPress?: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
    title,
    type,
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
            <Text style={styles.itemTitle}>{title}</Text>
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
                        ios_backgroundColor={Colors.MoonDust}
                    />
                )}
                {type === 'navigation' && (
                    <>
                        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
                        <Text style={styles.chevron}>›</Text>
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
                            <Text style={styles.checkmarkText}>✓</Text>
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
                            value={pushNotification}
                            onToggle={setPushNotification}
                        />

                        <SettingsItem
                            title="Location"
                            type="toggle"
                            value={location}
                            onToggle={setLocation}
                        />

                        <SettingsItem
                            title="Language"
                            type="navigation"
                            rightText={selectedLanguage.name}
                            onPress={openLanguageSheet}
                        />
                    </View>

                    {/* OTHER Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>OTHER</Text>

                        <SettingsItem
                            title="About Ticketis"
                            type="navigation"
                            onPress={() => console.log('About pressed')}
                        />

                        <SettingsItem
                            title="Privacy Policy"
                            type="navigation"
                            onPress={() => console.log('Privacy Policy pressed')}
                        />

                        <SettingsItem
                            title="Terms and Conditions"
                            type="navigation"
                            onPress={() => console.log('Terms and Conditions pressed')}
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

                    <View style={styles.selectButtonWrapper}>
                        <CustomButton title="Select" onPress={handleLanguageSelect} />
                    </View>
                </View>
            </CustomActionSheet>
        </>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size10,
    },
    section: {
        marginBottom: ResponsivePixels.size24,
    },
    sectionTitle: {
        fontSize: ResponsivePixels.size12,
        fontWeight: '500',
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size16,
        letterSpacing: 0.5,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: ResponsivePixels.size16,
    },
    itemTitle: {
        fontSize: ResponsivePixels.size16,
        fontWeight: '400',
        color: Colors.NoirBlack,
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.NoirBlack,
        marginRight: ResponsivePixels.size8,
    },
    chevron: {
        fontSize: ResponsivePixels.size24,
        color: Colors.NoirBlack,
        fontWeight: '300',
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
    checkmarkText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size14,
        fontWeight: 'bold',
    },
    selectButtonWrapper: {
        marginBottom: ResponsivePixels.size10,
    },
});

export default SettingsScreen;

import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IMAGES } from '../Assets/Images';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Colors } from '../Assets/StyleUtilities/Colors';

interface HeaderOption {
    icon?: string;
    onPress?: () => void;
    color?: string;
}

interface CustomHeaderProps {
    headerTitle?: string;
    headerTitleColor?: string;
    backgroundColor?: string;
    headerLeft?: HeaderOption;
    headerRight?: HeaderOption;
    showHeader?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
    headerTitle = "Header Title",
    headerTitleColor = Colors.NoirBlack,
    backgroundColor = Colors.DefaultWhite,
    headerLeft = {
        icon: IMAGES.ic_Back,
        onPress: () => console.log("Back pressed"),
        color: Colors.NoirBlack
    },
    headerRight,
    showHeader = false
}) => {

    if (!showHeader) return null;

    const renderLeftOption = () => {
        if (!headerLeft) return <View style={styles.placeholder} />;

        return (
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={headerLeft?.onPress}
                activeOpacity={0.7}
            >
                <Image
                    source={headerLeft?.icon}
                    style={{ width: ResponsivePixels.size24, height: ResponsivePixels.size24 }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    };

    const renderRightOption = () => {
        if (!headerRight) return <View style={styles.placeholder} />;

        return (
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={headerRight?.onPress}
                activeOpacity={0.7}
            >
                <Image
                    source={headerRight?.icon}
                    style={{ width: ResponsivePixels.size24, height: ResponsivePixels.size24 }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.headerContainer, { backgroundColor }]}>
            <StatusBar
                backgroundColor={backgroundColor}
                barStyle="dark-content"
                translucent={false}
            />
            <SafeAreaView edges={['top']}>
                <View style={styles.headerContent}>
                    <View style={styles.leftSection}>
                        {renderLeftOption()}
                    </View>

                    <View style={styles.centerSection}>
                        <Text style={[styles.titleText, { color: headerTitleColor }]}>
                            {headerTitle}
                        </Text>
                    </View>

                    <View style={styles.rightSection}>
                        {renderRightOption()}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: ResponsivePixels.size20,
        paddingVertical: ResponsivePixels.size15,
        minHeight: ResponsivePixels.size56,
    },
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
        color: Colors.NoirBlack,
        textAlign: 'center',
    },
    placeholder: {
        // width: ResponsivePixels.size40,
        // height: ResponsivePixels.size40,
    },
});

export default CustomHeader;

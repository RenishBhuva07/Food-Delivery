import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import MainContainer from '../common/MainContainer';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';
import { goBack } from '../Navigators/Navigator';
import { Typography, ShadowStyles } from '../Theme/Typographys';
import { Search, LayoutGrid, CircleDollarSign, ShoppingCart, UserRound, type LucideIcon } from 'lucide-react-native';

interface HelpCategory {
    id: number;
    icon: LucideIcon;
    iconColor: string;
    title: string;
    description: string;
}

const HELP_CATEGORIES: HelpCategory[] = [
    {
        id: 1,
        icon: LayoutGrid,
        iconColor: '#4A90D9',
        title: 'General',
        description: 'Basic questions about FoodDelivery',
    },
    {
        id: 2,
        icon: CircleDollarSign,
        iconColor: '#FE8C00',
        title: 'Orders',
        description: 'All you need to know about placing and managing orders',
    },
    {
        id: 3,
        icon: ShoppingCart,
        iconColor: '#E74C3C',
        title: 'Payments',
        description: 'Everything you need to know about payment methods',
    },
    {
        id: 4,
        icon: UserRound,
        iconColor: '#9B59B6',
        title: 'Account',
        description: 'How to manage your account and profile settings',
    },
];

const HelpCenterScreen: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCategories = HELP_CATEGORIES.filter(
        category =>
            category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCategoryPress = (category: HelpCategory) => {
        console.log(`Selected category: ${category.title}`);
        // Navigate to category details screen
    };

    return (
        <MainContainer
            statusBarStyle="dark-content"
            containerBackgroundColor={Colors.DefaultWhite}
            showHeader
            header={{
                headerTitle: "Help Center",
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
                {/* Greeting */}
                <Text style={styles.greeting}>Hi, how we can help you?</Text>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search size={ResponsivePixels.size20} color={Colors.SteelMist} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor={Colors.SteelMist}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Help Categories */}
                <View style={styles.categoriesContainer}>
                    {filteredCategories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryCard}
                            onPress={() => handleCategoryPress(category)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.categoryContent}>
                                <View style={[styles.iconContainer, { backgroundColor: `${category.iconColor}15` }]}>
                                    <category.icon size={24} color={category.iconColor} />
                                </View>
                                <View style={styles.categoryTextContainer}>
                                    <Text style={styles.categoryTitle}>{category.title}</Text>
                                    <Text style={styles.categoryDescription}>{category.description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size10,
    },
    greeting: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size20,
        marginTop: ResponsivePixels.size10,
        ...Typography.bodyLargeSemiBold,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.DefaultWhite,
        borderWidth: 1,
        borderColor: Colors.CloudWhisper,
        borderRadius: ResponsivePixels.size12,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size14,
        marginBottom: ResponsivePixels.size24,
    },
    searchIcon: {
        marginRight: ResponsivePixels.size12,
    },
    searchInput: {
        flex: 1,
        color: Colors.NoirBlack,
        padding: 0,
        ...Typography.bodyMediumMedium
    },
    categoriesContainer: {
        gap: ResponsivePixels.size12,
    },
    categoryCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: 14,
        paddingVertical: ResponsivePixels.size15,
        paddingHorizontal: ResponsivePixels.size15,
        ...ShadowStyles.shadow,
    },
    categoryContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        padding: ResponsivePixels.size10,
        borderRadius: ResponsivePixels.size12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ResponsivePixels.size16,
    },

    categoryTextContainer: {
        flex: 1,
    },
    categoryTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size6,
        ...Typography.bodyLargeSemiBold,
    },
    categoryDescription: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumRegular
    },
});

export default HelpCenterScreen;

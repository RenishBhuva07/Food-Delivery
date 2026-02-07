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

interface HelpCategory {
    id: number;
    icon: string;
    iconColor: string;
    title: string;
    description: string;
}

const HELP_CATEGORIES: HelpCategory[] = [
    {
        id: 1,
        icon: '🔷',
        iconColor: '#4A90D9',
        title: 'General',
        description: 'Basic questions about FoodDelivery',
    },
    {
        id: 2,
        icon: '💰',
        iconColor: '#FE8C00',
        title: 'Orders',
        description: 'All you need to know about placing and managing orders',
    },
    {
        id: 3,
        icon: '🛒',
        iconColor: '#E74C3C',
        title: 'Payments',
        description: 'Everything you need to know about payment methods',
    },
    {
        id: 4,
        icon: '👤',
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
                    <Text style={styles.searchIcon}>🔍</Text>
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
                                    <Text style={styles.iconText}>{category.icon}</Text>
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
        fontSize: ResponsivePixels.size22,
        fontWeight: '600',
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size20,
        marginTop: ResponsivePixels.size10,
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
        fontSize: ResponsivePixels.size18,
        marginRight: ResponsivePixels.size12,
        opacity: 0.5,
    },
    searchInput: {
        flex: 1,
        fontSize: ResponsivePixels.size16,
        color: Colors.NoirBlack,
        padding: 0,
    },
    categoriesContainer: {
        gap: ResponsivePixels.size12,
    },
    categoryCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.FrostedMist,
    },
    categoryContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: ResponsivePixels.size12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ResponsivePixels.size16,
    },
    iconText: {
        fontSize: ResponsivePixels.size22,
    },
    categoryTextContainer: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: ResponsivePixels.size17,
        fontWeight: '600',
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size6,
    },
    categoryDescription: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
        lineHeight: ResponsivePixels.size20,
    },
});

export default HelpCenterScreen;

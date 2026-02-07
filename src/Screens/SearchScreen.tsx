import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';
import { FOOD_ITEMS } from '../Database/FoodItems';
import MainContainer from '../common/MainContainer';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("Burger");
    const [recentSearches, setRecentSearches] = useState(["Burgers", "Fast food", "Dessert", "French", "Fastry"]);

    const categories = [
        { id: 1, name: "Burger", icon: "🍔" },
        { id: 2, name: "Taco", icon: "🌮" },
        { id: 3, name: "Drink", icon: "🥤" },
        { id: 4, name: "Pizza", icon: "🍕" },
    ];

    const removeRecentSearch = (item: string) => {
        setRecentSearches(prev => prev.filter(search => search !== item));
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
    };

    const recentOrders = FOOD_ITEMS.slice(0, 3); // Mocking recent orders with first 3 items

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={IMAGES.ic_Back} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Search Food</Text>
            <View style={styles.placeholderView} />
        </View>
    );

    const renderSearchBar = () => (
        <View style={styles.searchBarContainer}>
            <Image source={IMAGES.ic_Search} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search Food"
                placeholderTextColor={Colors.SteelMist}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TouchableOpacity>
                <Image source={IMAGES.ic_Menu} style={styles.filterIcon} />
            </TouchableOpacity>
        </View>
    );

    const renderCategories = () => (
        <View style={styles.categoriesContainer}>
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat.id}
                    style={[
                        styles.categoryChip,
                        selectedCategory === cat.name && styles.categoryChipSelected
                    ]}
                    onPress={() => setSelectedCategory(cat.name)}
                >
                    <Text style={styles.categoryEmoji}>{cat.icon}</Text>
                    <Text style={[
                        styles.categoryLabel,
                        selectedCategory === cat.name && styles.categoryLabelSelected
                    ]}>
                        {cat.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderRecentSearches = () => {
        if (recentSearches.length === 0) return null;
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent searches</Text>
                    <TouchableOpacity onPress={clearRecentSearches}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                {recentSearches.map((item, index) => (
                    <View key={index} style={styles.recentSearchItem}>
                        <View style={styles.recentSearchLeft}>
                            <Image source={IMAGES.ic_Search} style={styles.recentSearchIcon} />
                            <Text style={styles.recentSearchText}>{item}</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeRecentSearch(item)}>
                            <Text style={styles.closeIcon}>✕</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };

    const renderRecentOrders = () => (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { marginBottom: ResponsivePixels.size16 }]}>My recent orders</Text>
            {recentOrders.map((item) => (
                <TouchableOpacity key={item.id} style={styles.orderCard}>
                    <Image source={item.image} style={styles.orderImage} />
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderName}>{item.name}</Text>
                        <Text style={styles.restaurantName}>Burger Restaurant</Text>
                        <View style={styles.ratingRow}>
                            <Text style={styles.starIcon}>⭐</Text>
                            <Text style={styles.ratingText}>{item.rating}</Text>
                            <View style={styles.dotSeparator} />
                            <Image source={IMAGES.ic_location_small} style={styles.locationIcon} />
                            <Text style={styles.distanceText}>{item.distance}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <MainContainer
            statusBarStyle="dark-content"
            statusBarBackgroundColor="transparent"
            containerBackgroundColor={Colors.DefaultWhite}
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {renderHeader()}
                {renderSearchBar()}
                {renderCategories()}
                {renderRecentSearches()}
                {renderRecentOrders()}
            </ScrollView>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    contentContainer: {
        paddingHorizontal: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size24,
    },
    backButton: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.FrostedHaze,
        borderRadius: 12,
    },
    backIcon: {
        width: ResponsivePixels.size20,
        height: ResponsivePixels.size20,
        resizeMode: 'contain',
        tintColor: Colors.NoirBlack,
    },
    headerTitle: {
        fontSize: ResponsivePixels.size18,
        fontWeight: 'bold',
        color: Colors.NoirBlack,
    },
    placeholderView: {
        width: ResponsivePixels.size40,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.FrostedHaze,
        borderRadius: 12,
        paddingHorizontal: ResponsivePixels.size16,
        height: ResponsivePixels.size50,
        marginBottom: ResponsivePixels.size24,
    },
    searchIcon: {
        width: ResponsivePixels.size20,
        height: ResponsivePixels.size20,
        resizeMode: 'contain',
        tintColor: Colors.SteelMist,
        marginRight: ResponsivePixels.size12,
    },
    searchInput: {
        flex: 1,
        fontSize: ResponsivePixels.size14,
        color: Colors.NoirBlack,
        height: '100%',
    },
    filterIcon: {
        width: ResponsivePixels.size20,
        height: ResponsivePixels.size20,
        resizeMode: 'contain',
        tintColor: Colors.SteelMist,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: ResponsivePixels.size30,
    },
    categoryChip: {
        width: (width - ResponsivePixels.size40 - ResponsivePixels.size30) / 4,
        aspectRatio: 0.8,
        backgroundColor: Colors.DefaultWhite,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,

        // Border for unselected
        borderWidth: 1,
        borderColor: Colors.FrostedMist,
    },
    categoryChipSelected: {
        backgroundColor: Colors.SunburstFlame,
        borderColor: Colors.SunburstFlame,
    },
    categoryEmoji: {
        fontSize: ResponsivePixels.size24,
        marginBottom: ResponsivePixels.size8,
    },
    categoryLabel: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
        fontWeight: '500',
    },
    categoryLabelSelected: {
        color: Colors.DefaultWhite,
    },
    sectionContainer: {
        marginBottom: ResponsivePixels.size30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ResponsivePixels.size16,
    },
    sectionTitle: {
        fontSize: ResponsivePixels.size18,
        fontWeight: 'bold',
        color: Colors.NoirBlack,
    },
    deleteText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SunburstFlame,
    },
    recentSearchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size12,
    },
    recentSearchLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentSearchIcon: {
        width: ResponsivePixels.size20,
        height: ResponsivePixels.size20,
        resizeMode: 'contain',
        tintColor: Colors.SteelMist,
        marginRight: ResponsivePixels.size16,
    },
    recentSearchText: {
        fontSize: ResponsivePixels.size16,
        color: Colors.SteelMist, // Or darker if needed
    },
    closeIcon: {
        fontSize: ResponsivePixels.size16,
        color: Colors.SteelMist,
        fontWeight: 'bold',
    },
    orderCard: {
        flexDirection: 'row',
        marginBottom: ResponsivePixels.size20,
        alignItems: 'center',
    },
    orderImage: {
        width: ResponsivePixels.size60,
        height: ResponsivePixels.size60,
        borderRadius: 12,
        marginRight: ResponsivePixels.size16,
    },
    orderInfo: {
        flex: 1,
    },
    orderName: {
        fontSize: ResponsivePixels.size16,
        fontWeight: 'bold',
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size4,
    },
    restaurantName: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        fontSize: ResponsivePixels.size12,
        marginRight: ResponsivePixels.size4,
        color: '#FFD700',
    },
    ratingText: {
        fontSize: ResponsivePixels.size12,
        fontWeight: 'bold',
        color: Colors.NoirBlack,
        marginRight: ResponsivePixels.size10,
    },
    dotSeparator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.SteelMist,
        marginRight: ResponsivePixels.size10,
    },
    locationIcon: {
        width: ResponsivePixels.size12,
        height: ResponsivePixels.size12,
        resizeMode: 'contain',
        tintColor: Colors.SunburstFlame,
        marginRight: ResponsivePixels.size4,
    },
    distanceText: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
    },
});

export default SearchScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { Search, SlidersHorizontal, X, Star, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';
import { FOOD_ITEMS } from '../Database/FoodItems';
import MainContainer from '../common/MainContainer';
import { CATEGORIES } from '../Database/Categories';
import { Typography } from '../Theme/Typographys';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("Burger");
    const [recentSearches, setRecentSearches] = useState(["Burgers", "Fast food", "Dessert", "French", "Fastry"]);

    const removeRecentSearch = (item: string) => {
        setRecentSearches(prev => prev.filter(search => search !== item));
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
    };

    const recentOrders = FOOD_ITEMS.slice(0, 3); // Mocking recent orders with first 3 items

    const renderSearchBar = () => (
        <View style={styles.searchBarContainer}>
            <Search size={ResponsivePixels.size20} color={Colors.SteelMist} style={{ marginRight: ResponsivePixels.size12 }} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search Food"
                placeholderTextColor={Colors.SteelMist}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TouchableOpacity>
                <SlidersHorizontal size={ResponsivePixels.size20} color={Colors.SteelMist} />
            </TouchableOpacity>
        </View>
    );

    const renderCategoryCard = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.categoryCard, selectedCategory === item?.name && styles.selectedCategoryCard]}
            onPress={() => setSelectedCategory(item?.name)}
        >
            <Text style={styles.categoryIcon}>{item?.icon}</Text>
            <Text style={[styles.categoryText, selectedCategory === item?.name && styles.selectedCategoryText]}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    );

    const renderCategories = () => (
        <View style={styles.categoriesSection}>
            <FlatList
                data={CATEGORIES}
                renderItem={renderCategoryCard}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
            />
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
                            <Search size={ResponsivePixels.size20} color={Colors.SteelMist} style={{ marginRight: ResponsivePixels.size16 }} />
                            <Text style={styles.recentSearchText}>{item}</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeRecentSearch(item)}>
                            <X size={ResponsivePixels.size16} color={Colors.SteelMist} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };

    const renderRecentOrders = () => (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { marginBottom: ResponsivePixels.size16 }]}>My recent orders</Text>
            {recentOrders?.map((item) => (
                <TouchableOpacity key={item.id} style={styles.orderCard}>
                    <Image source={item.image} style={styles.orderImage} />
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderName}>{item.name}</Text>
                        <Text style={styles.restaurantName}>Burger Restaurant</Text>
                        <View style={styles.ratingRow}>
                            <Star size={ResponsivePixels.size12} color={Colors.SunburstFlame} fill={Colors.SunburstFlame} style={{ marginRight: ResponsivePixels.size4 }} />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                            <View style={styles.dotSeparator} />
                            <MapPin size={ResponsivePixels.size12} color={Colors.SunburstFlame} style={{ marginRight: ResponsivePixels.size4 }} />
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
            showHeader={true}
            header={{
                headerTitle: "Search Food",
                headerTitleColor: Colors.NoirBlack,
                headerBackgroundColor: Colors.DefaultWhite,
                headerLeft: {
                    icon: IMAGES.ic_Back,
                    onPress: () => navigation.goBack(),
                    color: Colors.NoirBlack,
                },
            }}
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

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
        paddingBottom: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size10,
    },

    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.FrostedHaze,
        borderRadius: 12,
        paddingHorizontal: ResponsivePixels.size16,
        height: ResponsivePixels.size50,
        marginHorizontal: ResponsivePixels.size12,
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
    categoriesSection: {},
    seeAllText: {
        color: Colors.SunburstFlame,
        ...Typography.bodyMediumMedium,
    },
    categoriesList: {
        gap: ResponsivePixels.size10,
        paddingVertical: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size12,
    },
    categoryCard: {
        alignItems: "center",
        justifyContent: "center",
        width: ResponsivePixels.size60,
        height: ResponsivePixels.size60,
        borderRadius: 16,
        backgroundColor: Colors.DefaultWhite,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    selectedCategoryCard: {
        backgroundColor: Colors.SunburstFlame,
    },
    categoryIcon: {
        fontSize: ResponsivePixels.size24,
    },
    categoryText: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumMedium,
    },
    selectedCategoryText: {
        color: Colors.DefaultWhite,
    },
    sectionContainer: {
        marginBottom: ResponsivePixels.size30,
        paddingHorizontal: ResponsivePixels.size12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        color: Colors.NoirBlack,
        ...Typography.bodyLargeSemiBold,
    },
    deleteText: {
        color: Colors.SunburstFlame,
        ...Typography.bodyMediumMedium,
    },
    recentSearchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size8,
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
        color: Colors.SteelMist,
        ...Typography.bodyLargeRegular,
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
        color: Colors.NoirBlack,
        ...Typography.bodyLargeSemiBold,
    },
    restaurantName: {
        color: Colors.SteelMist,
        ...Typography.bodySmallRegular,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: ResponsivePixels.size4,
    },
    starIcon: {
        fontSize: ResponsivePixels.size12,
        marginRight: ResponsivePixels.size4,
        color: Colors.SunburstFlame,
    },
    ratingText: {
        color: Colors.NoirBlack,
        ...Typography.bodySmallMedium,
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
        color: Colors.SteelMist,
        ...Typography.bodySmallMedium,
    },
});

export default SearchScreen;

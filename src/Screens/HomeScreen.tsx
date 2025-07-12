import type React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, Dimensions } from "react-native";
import { Colors } from "../Assets/StyleUtilities/Colors";
import MainContainer from "../common/MainContainer";
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels";
import { IMAGES } from "../Assets/Images";

const ScreenWidth = Dimensions.get('window').width;

const HomeScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("Burger");

    const categories = [
        { id: 1, name: "Burger", icon: "🍔", isSelected: false },
        { id: 2, name: "Taco", icon: "🌮", isSelected: false },
        { id: 3, name: "Drink", icon: "🥤", isSelected: false },
        { id: 4, name: "Pizza", icon: "🍕", isSelected: false },
        { id: 5, name: "Fries", icon: "🍟", isSelected: false },
    ]

    const foodItems = [
        {
            id: 1,
            name: "Ordinary Burgers",
            rating: 4.9,
            distance: "190m",
            price: "$17,230",
            image: "/placeholder.svg?height=120&width=120",
            isFavorite: false,
        },
        {
            id: 2,
            name: "Burger With Meat",
            rating: 4.9,
            distance: "190m",
            price: "$17,230",
            image: "/placeholder.svg?height=120&width=120",
            isFavorite: false,
        },
        {
            id: 3,
            name: "Deluxe Burger",
            rating: 4.8,
            distance: "250m",
            price: "$19,500",
            image: "/placeholder.svg?height=120&width=120",
            isFavorite: false,
        },
        {
            id: 4,
            name: "Classic Burger",
            rating: 4.7,
            distance: "300m",
            price: "$15,800",
            image: "/placeholder.svg?height=120&width=120",
            isFavorite: false,
        },
    ]

    const renderCategory = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.categoryCard, selectedCategory === item.name && styles.selectedCategoryCard]}
            onPress={() => setSelectedCategory(item.name)}
        >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={[styles.categoryText, selectedCategory === item.name && styles.selectedCategoryText]}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    )

    const renderFoodItem = ({ item }: any) => (
        <View style={styles.foodCard}>
            <View style={styles.foodImageContainer}>
                <Image source={{ uri: item.image }} style={styles.foodImage} />
                <TouchableOpacity style={styles.favoriteButton}>
                    <Text style={styles.favoriteIcon}>♡</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item.name}</Text>
                <View style={styles.foodDetails}>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.starIcon}>⭐</Text>
                        <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                    <View style={styles.distanceContainer}>
                        <Text style={styles.locationIcon}>📍</Text>
                        <Text style={styles.distance}>{item.distance}</Text>
                    </View>
                </View>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </View>
    )

    return (
        <MainContainer
            statusBarStyle="light-content"
            statusBarBackgroundColor="transparent"
            containerBackgroundColor={Colors.SunburstFlameLight}
            translucent={true}
        >
            <View style={styles.container}>

                <View style={styles.heroWrapper}>
                    <ImageBackground
                        source={IMAGES.hero_background}
                        resizeMode="cover"
                        style={styles.heroImageBackground}
                    >
                        <View style={styles.heroSection}>
                            <View style={styles.headerRow}>
                                <View style={styles.locationContainer}>
                                    <View style={[styles.locationRow, { gap: ResponsivePixels.size8 }]}>
                                        <Text style={styles.locationLabel}>Your Location</Text>
                                        <Image source={IMAGES.ic_down_arrow} style={{ width: ResponsivePixels.size16, height: ResponsivePixels.size16 }} />
                                    </View>
                                    <View style={[styles.locationRow, { gap: ResponsivePixels.size8 }]}>
                                        <Image source={IMAGES.ic_location} style={{ width: ResponsivePixels.size24, height: ResponsivePixels.size24 }} />
                                        <Text style={styles.locationText}>New York City</Text>
                                    </View>
                                </View>
                                <View style={styles.headerIcons}>
                                    <TouchableOpacity style={styles.iconButton}>
                                        <Image source={IMAGES.ic_Search} style={{ width: "100%", height: "100%" }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.iconButton}>
                                        <Image source={IMAGES.ic_Notification} style={{ width: "100%", height: "100%" }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.heroTitle}>Provide the best food for you</Text>
                        </View>
                    </ImageBackground>
                </View>

                {/* Categories Section */}
                <View style={styles.categoriesSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Find by Category</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={categories}
                        renderItem={renderCategory}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesList}
                    />
                </View>

                {/* Food Items Grid */}
                <View style={styles.foodGrid}>
                    <FlatList
                        data={foodItems}
                        renderItem={renderFoodItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.foodRow}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heroWrapper: {
        borderBottomLeftRadius: ResponsivePixels.size20,
        borderBottomRightRadius: ResponsivePixels.size20,
        overflow: 'hidden',

        elevation: 10,
    },
    heroSection: {
        paddingHorizontal: ResponsivePixels.size24,
        paddingTop: ResponsivePixels.size50,
        paddingBottom: ResponsivePixels.size20,
    },
    heroImageBackground: {
        width: ScreenWidth,
        justifyContent: 'flex-end',
        borderBottomStartRadius: ResponsivePixels.size20,
        borderBottomEndRadius: ResponsivePixels.size20,
        overflow: 'hidden',
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: ResponsivePixels.size24,
    },
    locationContainer: {
        flex: 1,
        gap: ResponsivePixels.size5,
    },
    locationLabel: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size14,
        marginBottom: ResponsivePixels.size4,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationIcon: {
        fontSize: ResponsivePixels.size16,
        marginRight: ResponsivePixels.size8,
    },
    locationText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size18,
        fontWeight: "600",
        marginRight: ResponsivePixels.size8,
    },
    dropdownIcon: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size12,
    },
    headerIcons: {
        flexDirection: "row",
        gap: ResponsivePixels.size12,
    },
    iconButton: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        fontSize: ResponsivePixels.size20,
    },
    heroTitle: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size32,
        fontWeight: "bold",
        lineHeight: ResponsivePixels.size40,
    },
    categoriesSection: {
        paddingTop: ResponsivePixels.size24,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: ResponsivePixels.size16,
        paddingHorizontal: ResponsivePixels.size24,
    },
    sectionTitle: {
        fontSize: ResponsivePixels.size20,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    seeAllText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SunburstFlame,
        fontWeight: "500",
    },
    categoriesList: {
        gap: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size24,
    },
    categoryCard: {
        alignItems: "center",
        justifyContent: "center",
        width: ResponsivePixels.size60,
        height: ResponsivePixels.size60,
        borderRadius: ResponsivePixels.size16,
        backgroundColor: Colors.DefaultWhite,
    },
    selectedCategoryCard: {
        backgroundColor: Colors.SunburstFlame,
    },
    categoryIcon: {
        fontSize: ResponsivePixels.size24,
    },
    categoryText: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
        fontWeight: "bold",
    },
    selectedCategoryText: {
        color: Colors.DefaultWhite,
    },
    foodGrid: {
        paddingHorizontal: ResponsivePixels.size24,
        paddingTop: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size100,
    },
    foodRow: {
        justifyContent: "space-between",
        marginBottom: ResponsivePixels.size20,
    },
    foodCard: {
        width: "48%",
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        shadowColor: Colors.NoirBlack,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    foodImageContainer: {
        position: "relative",
    },
    foodImage: {
        width: "100%",
        height: ResponsivePixels.size120,
        borderTopLeftRadius: ResponsivePixels.size16,
        borderTopRightRadius: ResponsivePixels.size16,
    },
    favoriteButton: {
        position: "absolute",
        top: ResponsivePixels.size12,
        right: ResponsivePixels.size12,
        width: ResponsivePixels.size32,
        height: ResponsivePixels.size32,
        borderRadius: ResponsivePixels.size16,
        backgroundColor: Colors.DefaultWhite,
        alignItems: "center",
        justifyContent: "center",
    },
    favoriteIcon: {
        fontSize: ResponsivePixels.size16,
        color: Colors.SteelMist,
    },
    foodInfo: {
        padding: ResponsivePixels.size16,
    },
    foodName: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "600",
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size8,
    },
    foodDetails: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: ResponsivePixels.size8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: ResponsivePixels.size16,
    },
    starIcon: {
        fontSize: ResponsivePixels.size12,
        marginRight: ResponsivePixels.size4,
    },
    rating: {
        fontSize: ResponsivePixels.size12,
        color: Colors.NoirBlack,
        fontWeight: "500",
    },
    distanceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    distance: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
    },
    price: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "600",
        color: Colors.SunburstFlame,
    },
})

export default HomeScreen

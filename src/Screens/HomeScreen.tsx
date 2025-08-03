import type React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, Dimensions } from "react-native";
import { Colors } from "../Assets/StyleUtilities/Colors";
import MainContainer from "../common/MainContainer";
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels";
import { IMAGES } from "../Assets/Images";
import { FOOD_ITEMS } from "../Database/FoodItems";
import { navigate } from "../Navigators/Navigator";

const ScreenWidth = Dimensions.get('window').width,
    foodCardWidth = ScreenWidth / 2 - ResponsivePixels.size25;

type FoodItems = {
    id: number | string;
    name: string;
    rating: number;
    distance: string;
    price: string;
    image: any;
    isFavorite: boolean;
    category: string;
};

const HomeScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("Burger"),
        [selectedFoodItem, setSelectedFoodItem] = useState<FoodItems[]>([]);

    useEffect(() => {
        const filteredItems = FOOD_ITEMS?.filter(item => item.category === selectedCategory);
        setSelectedFoodItem(filteredItems);
    }, [selectedCategory]);

    const categories = [
        { id: 1, name: "Burger", icon: "🍔", isSelected: false, },
        { id: 2, name: "Taco", icon: "🌮", isSelected: false },
        { id: 3, name: "Drink", icon: "🥤", isSelected: false },
        { id: 4, name: "Pizza", icon: "🍕", isSelected: false },
        { id: 5, name: "Fries", icon: "🍟", isSelected: false },
        { id: 6, name: "Salad", icon: "🥗", isSelected: false },
        { id: 7, name: "Dessert", icon: "🍰", isSelected: false },
        { id: 8, name: "Sushi", icon: "🍣", isSelected: false },
        { id: 9, name: "Pasta", icon: "🍝", isSelected: false },
        { id: 10, name: "Sandwich", icon: "🥪", isSelected: false },
    ];

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
    ), navigateToFoodDetails = (item: any) => navigate("FoodDetailScreen", { foodItem: item });

    const renderFoodCard = ({ item }: any) => (
        <TouchableOpacity style={styles.foodCard} onPress={() => navigateToFoodDetails(item)}>
            <View style={styles.foodImageContainer}>
                <Image source={item?.image} style={styles.foodImage} />
                <TouchableOpacity style={styles.favoriteButton}>
                    <Image source={IMAGES.ic_Like} style={{ width: 27, height: 27 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item?.name}</Text>
                <View style={styles.foodDetails}>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.starIcon}>⭐</Text>
                        <Text style={styles.rating}>{item?.rating}</Text>
                    </View>
                    <View style={styles.distanceContainer}>
                        <Image source={IMAGES.ic_location_small} style={{ width: 15, height: 15 }} />
                        <Text style={styles.distance}>{item?.distance}</Text>
                    </View>
                </View>
                <Text style={styles.price}>{item?.price}</Text>
            </View>
        </TouchableOpacity>
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
                        renderItem={renderCategoryCard}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesList}
                    />
                </View>

                {/* Food Items Grid */}
                <View style={styles.foodGrid}>
                    <FlatList
                        data={selectedFoodItem}
                        renderItem={renderFoodCard}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.foodRow}
                        contentContainerStyle={{
                            // flexGrow: 1,
                            paddingBottom: 480,
                        }}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled
                        nestedScrollEnabled
                        ListEmptyComponent={() => (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.NoirBlack,
                                        fontSize: ResponsivePixels.size16,
                                        textAlign: 'center',
                                    }}
                                >
                                    No food items available in this category.
                                </Text>
                            </View>
                        )}
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
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',

        elevation: 10,
    },
    heroSection: {
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size50,
        paddingBottom: ResponsivePixels.size20,
    },
    heroImageBackground: {
        width: ScreenWidth,
        justifyContent: 'flex-end',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
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
        marginRight: ResponsivePixels.size50,
    },
    categoriesSection: {
        paddingTop: ResponsivePixels.size20,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: ResponsivePixels.size20,
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
        gap: ResponsivePixels.size10,
        paddingHorizontal: ResponsivePixels.size20,
        paddingVertical: ResponsivePixels.size10,
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
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
        fontWeight: "bold",
    },
    selectedCategoryText: {
        color: Colors.DefaultWhite,
    },
    foodGrid: {
        // flex: 1,
    },
    foodRow: {
        justifyContent: "space-between",
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size10,
    },
    foodCard: {
        width: foodCardWidth,
        backgroundColor: Colors.DefaultWhite,
        borderRadius: 16,
        padding: ResponsivePixels.size10,

        shadowColor: Colors.NoirBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    foodImageContainer: {
        // width: ResponsivePixels.size135,
        height: ResponsivePixels.size120,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
    },
    foodImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 12,
    },
    favoriteButton: {
        position: "absolute",
        top: ResponsivePixels.size8,
        right: ResponsivePixels.size8,
        padding: 3,
        borderRadius: 50,
        backgroundColor: Colors.DefaultWhite,
        alignItems: "center",
        justifyContent: "center",
    },
    favoriteIcon: {
        fontSize: ResponsivePixels.size16,
        color: Colors.SteelMist,
    },
    foodInfo: {
        paddingTop: ResponsivePixels.size10,
    },
    foodName: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "600",
        color: Colors.NoirBlack,
        // marginBottom: ResponsivePixels.size4,
    },
    foodDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: ResponsivePixels.size4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: ResponsivePixels.size4,
    },
    starIcon: {
        fontSize: ResponsivePixels.size12,
        // marginRight: ResponsivePixels.size4,
    },
    rating: {
        fontSize: ResponsivePixels.size12,
        color: Colors.NoirBlack,
        fontWeight: "500",
    },
    distanceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: ResponsivePixels.size4,
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

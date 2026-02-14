import React, { useEffect, useRef, useState } from 'react';
import { Clock, Star, Truck, Plus, Minus } from 'lucide-react-native';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Animated,
    Dimensions,
} from 'react-native';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import CustomButton from '../common/CustomButton';
import { goBack } from '../Navigators/Navigator';
import { Colors } from '../Assets/StyleUtilities/Colors';
import CustomHeader from '../common/CustomHeader';
import { IMAGES } from '../Assets/Images';
import { themes } from '../Assets/StyleUtilities/CommonStyleSheets/theme';
import { Typography } from '../Theme/Typographys';

const { width: screenWidth } = Dimensions.get('window');

interface FoodDetailScreenProps {
    navigation: any;
    route: any;
}

const FoodDetailScreen: React.FC<FoodDetailScreenProps> = (props) => {
    const { foodItem } = props?.route?.params;
    const [quantity, setQuantity] = useState(4);
    const [isFavorite, setIsFavorite] = useState(foodItem?.isFavorite);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const basePrice = 12230;
    const totalPrice = basePrice * quantity;

    const handleQuantityChange = (increment: boolean) => {
        if (increment) {
            setQuantity(prev => prev + 1);
        } else if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
    };

    // Handle scroll and update current index
    const handleScroll = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / screenWidth);
        setCurrentImageIndex(index);
    };

    // Navigate to specific image
    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
        flatListRef.current?.scrollToIndex({ index, animated: true });
    };

    // Auto-scroll functionality (optional)
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImageIndex < foodItem?.sliderImages?.length - 1) {
                goToImage(currentImageIndex + 1);
            } else {
                goToImage(0);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [currentImageIndex]);

    const renderImageItem = ({ item, index }: { item: any; index: number }) => (
        <View style={styles.imageSlide}>
            <Image
                source={item}
                style={styles.foodImage}
                resizeMode="cover"
            />

            {/* Gradient overlay for better text visibility */}
            {/* <View style={styles.gradientOverlay} /> */}


        </View>
    );

    const renderIndicator = (index: number) => {
        const inputRange = [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
        ];

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1, 1],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity
                key={index}
                onPress={() => goToImage(index)}
                style={styles.indicatorContainer}
            >
                <Animated.View
                    style={[
                        styles.indicator,
                        index === currentImageIndex ? styles.activeIndicator : styles.inactiveIndicator,
                        {
                            transform: [{ scale }],
                            opacity,
                        },
                    ]}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header with Image */}
            <View style={styles.imageContainer}>
                <Animated.FlatList
                    ref={flatListRef}
                    data={foodItem?.sliderImages}
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {
                            useNativeDriver: false,
                            listener: handleScroll,
                        }
                    )}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToInterval={screenWidth}
                    snapToAlignment="center"
                />

                {/* Header Controls */}
                <View style={styles.headerControls}>
                    <CustomHeader
                        showHeader={true}
                        headerTitle={"About This Menu"}
                        headerTitleColor={Colors.DefaultWhite}
                        headerLeft={{
                            icon: IMAGES.ic_Back_light,
                            onPress: () => goBack(),
                        }}
                        headerRight={{
                            icon: isFavorite ? IMAGES.ic_Like_Fill : IMAGES.ic_Favorite,
                            onPress: () => setIsFavorite(!isFavorite),
                        }}
                        headerBackgroundColor={"transparent"}
                    />
                    {/* <TouchableOpacity
                        onPress={() => goBack()}
                        style={styles.headerButton}
                    >
                        <Text style={styles.headerButtonText}>←</Text>
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>About This Menu</Text>

                    <TouchableOpacity
                        onPress={() => setIsFavorite(!isFavorite)}
                        style={[styles.headerButton, isFavorite && styles.favoriteActive]}
                    >
                        <Text style={[
                            styles.headerButtonText,
                            { color: isFavorite ? '#FF8C42' : Colors.DefaultWhite }
                        ]}>
                            ♥
                        </Text>
                    </TouchableOpacity> */}
                </View>

                {/* Custom Indicators */}
                <View style={styles.indicatorsContainer}>
                    <View style={styles.indicators}>
                        {foodItem?.sliderImages?.map((_: string, index: number) => renderIndicator(index))}
                    </View>
                </View>

                {/* Image Counter */}
                <View style={styles.imageCounterContainer}>
                    <View style={styles.imageCounter}>
                        <Text style={styles.imageCounterText}>
                            {currentImageIndex + 1} / {foodItem?.sliderImages?.length}
                        </Text>
                    </View>
                </View>

                {/* Thumbnail Navigation (Optional) */}
                <View style={styles.thumbnailContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.thumbnailScrollContainer}
                    >
                        {foodItem?.sliderImages?.map((image: any, index: number) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => goToImage(index)}
                                style={[
                                    styles.thumbnail,
                                    index === currentImageIndex && styles.activeThumbnail
                                ]}
                            >
                                <Image
                                    source={image}
                                    style={styles.thumbnailImage}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Content */}
                <View style={styles.contentContainer}>
                    <View style={styles.titleSection}>
                        <Text style={styles.foodTitle}>{foodItem?.name}</Text>
                        <Text style={styles.price}>{foodItem?.price}</Text>
                    </View>

                    {/* Info Row */}
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Truck color={Colors.SunburstFlame} size={ResponsivePixels.size20} />
                            <Text style={styles.infoText}>Free Delivery</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Clock color={Colors.SunburstFlame} size={ResponsivePixels.size20} />
                            <Text style={styles.infoText}>20 - 30</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Star color={Colors.SunburstFlame} size={ResponsivePixels.size20} fill={Colors.SunburstFlame} />
                            <Text style={styles.infoText}>4.5</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>
                            Burger With Meat is a typical food from our restaurant that is much in demand by many people, this is very recommended for you.
                        </Text>
                    </View>

                    {/* Quantity and Total */}
                    <View style={styles.quantitySection}>
                        <View style={styles.quantityControls}>
                            <TouchableOpacity
                                onPress={() => handleQuantityChange(false)}
                                style={styles.quantityButton}
                            >
                                <Minus color={Colors.NoirBlack} size={ResponsivePixels.size20} />
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>{quantity}</Text>

                            <TouchableOpacity
                                onPress={() => handleQuantityChange(true)}
                                style={styles.quantityButton}
                            >
                                <Plus color={Colors.NoirBlack} size={ResponsivePixels.size20} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.totalPrice}>${totalPrice.toLocaleString()}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Add to Cart Button */}
            <View style={styles.buttonContainer}>
                <CustomButton
                    icon="Cart"
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    style={styles.addToCartButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    imageContainer: {
        position: 'relative',
        // height: ResponsivePixels.size300,
    },
    foodImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: ResponsivePixels.size20,
        borderBottomRightRadius: ResponsivePixels.size20,
    },
    headerControls: {
        position: 'absolute',
        left: 0,
        right: 0,
        // top: ResponsivePixels.size50,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // paddingHorizontal: ResponsivePixels.size20,
    },
    headerButton: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
    },
    headerTitle: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
    },
    indicators: {
        position: 'absolute',
        bottom: ResponsivePixels.size20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: ResponsivePixels.size8,
    },
    indicator: {
        width: ResponsivePixels.size30,
        height: ResponsivePixels.size4,
        borderRadius: ResponsivePixels.size2,
    },
    activeIndicator: {
        backgroundColor: Colors.SunburstFlame,
    },
    inactiveIndicator: {
        backgroundColor: Colors.DefaultWhite,
    },
    contentContainer: {
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size100,
    },
    titleSection: {
        marginBottom: ResponsivePixels.size16,
    },
    foodTitle: {
        color: '#333333',
        marginBottom: ResponsivePixels.size8,
        ...Typography.h5SemiBold
    },
    price: {
        color: Colors.SunburstFlame,
        ...Typography.h6Bold
    },
    infoRow: {
        borderRadius: 8,
        backgroundColor: Colors.SunburstFlameFaded,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: ResponsivePixels.size12,
        ...themes.shadows.light,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size8,
    },

    infoText: {
        color: Colors.SteelMist,
        ...Typography.bodyLargeRegular
    },
    descriptionSection: {
        marginVertical: ResponsivePixels.size20,
    },
    sectionTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size4,
        ...Typography.bodyLargeSemiBold,
    },
    description: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumRegular,
    },
    quantitySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size20,
    },
    quantityButton: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },

    quantityText: {
        color: Colors.NoirBlack,
        ...Typography.h6SemiBold
    },
    totalPrice: {
        color: Colors.SunburstFlame,
        ...Typography.h5Medium
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: ResponsivePixels.size12,
        paddingBottom: ResponsivePixels.size20,
        backgroundColor: "transparent",
    },
    addToCartButton: {
        backgroundColor: Colors.SunburstFlame,
    },
    imageSlide: {
        width: screenWidth,
        height: ResponsivePixels.size400,
        position: 'relative',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: ResponsivePixels.size100,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    favoriteActive: {
        backgroundColor: 'rgba(255,140,66,0.2)',
    },
    indicatorsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    imageCounterContainer: {
        position: 'absolute',
        bottom: ResponsivePixels.size10,
        right: ResponsivePixels.size10,
        alignItems: 'center',
    },
    indicatorContainer: {
        padding: ResponsivePixels.size4,
    },
    imageCounter: {
        backgroundColor: Colors.BlackTransparent,
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size4,
        borderRadius: ResponsivePixels.size12,
    },
    imageCounterText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size12,
        fontWeight: '500',
    },
    thumbnailContainer: {
        position: 'absolute',
        bottom: ResponsivePixels.size50,
        right: 0,
    },
    thumbnailScrollContainer: {
        paddingHorizontal: ResponsivePixels.size10,
        gap: ResponsivePixels.size8,
    },
    thumbnail: {
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size8,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activeThumbnail: {
        borderColor: Colors.SunburstFlame,
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
        borderRadius: ResponsivePixels.size8,
    },
});

export default FoodDetailScreen;
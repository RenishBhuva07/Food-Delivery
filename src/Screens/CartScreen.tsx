import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import MainContainer from "../common/MainContainer"
import CustomButton from "../common/CustomButton"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import { IMAGES } from "../Assets/Images"
import { navigate } from "../Navigators/Navigator"

interface ICartScreenProps {
    route: any;
}

const CartScreen: React.FC<ICartScreenProps> = (props) => {
    // const { } = props?.route?.params,
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Burger With Meat",
            price: 12230,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
            isSelected: true,
        },
        {
            id: 2,
            name: "Ordinary Burgers",
            price: 12230,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
            isSelected: true,
        },
        {
            id: 3,
            name: "Ordinary Burgers",
            price: 12230,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
            isSelected: true,
        },
        {
            id: 4,
            name: "Ordinary Burgers",
            price: 12230,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
            isSelected: true,
        },
    ])

    const [promoCode, setPromoCode] = useState("")

    const updateQuantity = (id: number, increment: boolean) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1) } : item,
            ),
        )
    }

    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }

    const toggleItemSelection = (id: number) => {
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item)))
    }

    const calculateTotal = () => {
        const subtotal = cartItems?.filter((item) => item.isSelected)?.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const discount = 10900
        return subtotal - discount
    }

    const renderCartItem = ({ item }: any) => (
        <View style={styles.cartItem}>

            <View style={{
                // flex: 1,
                flexDirection: "row",
                alignItems: "center",
            }}>
                <TouchableOpacity
                    style={[styles.checkbox, item.isSelected && styles.checkedBox]}
                    onPress={() => toggleItemSelection(item.id)}
                >
                    {item.isSelected && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>

                <View style={{
                    borderRadius: ResponsivePixels.size8,
                    marginRight: ResponsivePixels.size12,
                }}>
                    <Image source={IMAGES.ordinary_burgers} style={styles.itemImage} />
                </View>
            </View>

            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item?.name}</Text>
                <Text style={styles.itemPrice}>$ {item.price.toLocaleString()}</Text>
                <View style={styles.quantityControls}>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, false)}>
                            <Image source={IMAGES.ic_Minus} style={{ width: ResponsivePixels.size28, height: ResponsivePixels.size28, tintColor: Colors.NoirBlack }} />
                        </TouchableOpacity>

                        <Text style={styles.quantity}>{item.quantity}</Text>

                        <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, true)}>
                            <Image source={IMAGES.ic_Add} style={{ width: ResponsivePixels.size28, height: ResponsivePixels.size28, tintColor: Colors.NoirBlack }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(item.id)}>
                        <Image source={IMAGES.ic_Delete} style={{ width: ResponsivePixels.size25, height: ResponsivePixels.size25 }} />
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )

    if (cartItems.length === 0) {
        return (
            <MainContainer
                statusBarStyle="dark-content"
                statusBarBackgroundColor="transparent"
                containerBackgroundColor={Colors.SunburstFlameLight}
                showHeader
                translucent={true}
                header={{
                    headerTitle: "My Cart",
                    headerTitleColor: Colors.NoirBlack,
                    headerRight: {
                        icon: IMAGES.ic_Menu,
                        onPress: () => console.log("Menu pressed"),
                    },
                }}
            >
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIllustration}>
                        {/* <View style={[styles.circle, styles.circle1]} /> */}
                        {/* <View style={[styles.circle, styles.circle2]} /> */}
                        {/* <View style={[styles.circle, styles.circle3]} /> */}
                        {/* <View style={[styles.circle, styles.circle4]} /> */}
                        {/* <View style={[styles.circle, styles.circle5]} /> */}
                        {/* <View style={styles.searchIconContainer}>
                            <Text style={styles.searchIcon}>🔍</Text>
                        </View> */}
                        <Image
                            source={IMAGES.no_order_Illustration}
                            style={{ width: ResponsivePixels.size278, height: ResponsivePixels.size207 }}
                        />
                    </View>
                    <Text style={styles.emptyTitle}>Ouch! Hungry</Text>
                    <Text style={styles.emptySubtitle}>Seems like you have not ordered any food yet</Text>
                    <View style={styles.findFoodsButtonContainer}>
                        <CustomButton title="Find Foods" onPress={() => console.log("Find Foods")} />
                    </View>
                </View>
            </MainContainer>
        )
    }

    return (
        <MainContainer
            statusBarStyle="dark-content"
            statusBarBackgroundColor="transparent"
            containerBackgroundColor={Colors.SunburstFlameLight}
            translucent={true}
            showHeader
            header={{
                headerBackgroundColor: Colors.SunburstFlameLight,
                headerTitle: "My Cart",
                headerTitleColor: Colors.NoirBlack,
                headerRight: {
                    icon: IMAGES.ic_Menu,
                    onPress: () => console.log("Menu pressed"),
                },
            }}
        >
            <View style={styles.container}>
                {/* Delivery Location */}
                <View style={styles.deliverySection}>

                    <View style={styles.deliveryRow}>
                        <View style={styles.locationWrapper}>
                            <Text style={styles.deliveryLabel}>Delivery Location</Text>
                            <Text style={styles.deliveryLocation}>Home</Text>
                        </View>
                        <TouchableOpacity style={styles.changeLocationButton}>
                            <Text style={styles.changeLocationText}>Change Location</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Promo Code */}
                <View style={styles.promoSection}>
                    <View style={styles.promoRow}>
                        <View style={styles.promoLeft}>
                            <View style={{
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 8,
                                elevation: 5,
                            }}>
                                <Image
                                    source={IMAGES.ic_promo_code}
                                    style={{ width: ResponsivePixels.size25, height: ResponsivePixels.size25 }}
                                />

                            </View>
                            <TextInput
                                style={styles.promoInput}
                                placeholder="Promo Code . . ."
                                placeholderTextColor={Colors.SilverHaze}
                                value={promoCode}
                                onChangeText={setPromoCode}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <TouchableOpacity style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Cart Items */}
                <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.cartList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.cartItemsContainer}
                    scrollEnabled
                    ListFooterComponent={
                        <>
                            {/* Payment Summary */}
                            <View style={styles.summarySection}>
                                <Text style={styles.summaryTitle}>Payment Summary</Text>

                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Total Items (3)</Text>
                                    <Text style={styles.summaryValue}>$48,900</Text>
                                </View>

                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Delivery Fee</Text>
                                    <Text style={styles.summaryValue}>Free</Text>
                                </View>

                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Discount</Text>
                                    <Text style={[styles.summaryValue, styles.discountValue]}>-$10,900</Text>
                                </View>

                                <View style={[styles.summaryRow, styles.totalRow]}>
                                    <Text style={styles.totalLabel}>Total</Text>
                                    <Text style={styles.totalValue}>${calculateTotal().toLocaleString()}</Text>
                                </View>
                            </View>

                            {/* Order Button */}
                            <View style={styles.orderButtonContainer}>
                                <CustomButton title="Order Now" onPress={() => navigate('Home')} />
                            </View>
                        </>
                    }
                />

            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: ResponsivePixels.size20,
    },
    deliverySection: {
        marginTop: ResponsivePixels.size10,
        marginBottom: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size20,
    },
    deliveryLabel: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
    },
    locationWrapper: {
        gap: ResponsivePixels.size4,
    },
    deliveryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    deliveryLocation: {
        fontSize: ResponsivePixels.size18,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    changeLocationButton: {
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size8,
        borderRadius: ResponsivePixels.size20,
        borderWidth: 1,
        borderColor: Colors.SunburstFlame,
    },
    changeLocationText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SunburstFlame,
        fontWeight: "500",
    },
    promoSection: {
        paddingHorizontal: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size20,
    },
    promoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.DefaultWhite,
        borderRadius: 50,
        borderColor: Colors.FrostedMist,
        borderWidth: 1,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size12,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    promoLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: ResponsivePixels.size8,
    },
    promoInput: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "bold",
        color: Colors.SteelMist,
        flex: 1,
        paddingVertical: 0,
        letterSpacing: 1,
    },
    promoText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
    },
    applyButton: {
        backgroundColor: Colors.SunburstFlame,
        paddingHorizontal: ResponsivePixels.size22,
        paddingVertical: ResponsivePixels.size8,
        borderRadius: 50,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    applyButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size14,
        fontWeight: "600",
    },
    cartList: {
        flex: 1,
    },
    cartItemsContainer: {
        gap: ResponsivePixels.size16,
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size10,
        paddingBottom: 100,
    },
    cartItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.DefaultWhite,
        borderRadius: 16,
        padding: ResponsivePixels.size12,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    checkbox: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Colors.SteelMist,
        marginRight: ResponsivePixels.size12,
        alignItems: "center",
        justifyContent: "center",
    },
    checkedBox: {
        backgroundColor: Colors.SunburstFlame,
        borderColor: Colors.SunburstFlame,
    },
    checkmark: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size12,
        fontWeight: "bold",
    },
    itemImage: {
        width: ResponsivePixels.size100,
        borderRadius: ResponsivePixels.size8,
    },
    itemDetails: {
        flex: 1,
        gap: ResponsivePixels.size4,
        justifyContent: "space-between",
    },
    itemName: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "bold",
        color: Colors.NoirBlack,
    },
    itemPrice: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SunburstFlame,
        fontWeight: "bold",
        marginBottom: ResponsivePixels.size4,
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    quantityButton: {
        width: ResponsivePixels.size32,
        height: ResponsivePixels.size32,
        borderRadius: ResponsivePixels.size16,
        backgroundColor: Colors.FrostedHaze,
        alignItems: "center",
        justifyContent: "center",
    },
    quantity: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "600",
        color: Colors.NoirBlack,
        marginHorizontal: ResponsivePixels.size16,
    },
    deleteButton: {
        paddingBottom: 4,
        justifyContent: "flex-end",
    },
    summarySection: {
        backgroundColor: Colors.SunburstFlame,
        borderRadius: 16,
        padding: ResponsivePixels.size20,
        marginVertical: ResponsivePixels.size20,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    summaryTitle: {
        fontSize: ResponsivePixels.size18,
        fontWeight: "600",
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size16,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: ResponsivePixels.size12,
    },
    summaryLabel: {
        fontSize: ResponsivePixels.size14,
        color: Colors.DefaultWhite,
    },
    summaryValue: {
        fontSize: ResponsivePixels.size14,
        fontWeight: "600",
        color: Colors.DefaultWhite,
    },
    discountValue: {
        color: Colors.SunburstFlame,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: Colors.CloudWhisper,
        paddingTop: ResponsivePixels.size12,
        marginTop: ResponsivePixels.size8,
    },
    totalLabel: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    totalValue: {
        fontSize: ResponsivePixels.size18,
        fontWeight: "bold",
        color: Colors.NoirBlack,
    },
    orderButtonContainer: {
        marginBottom: ResponsivePixels.size20,
    },
    // Empty state styles
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: ResponsivePixels.size20,
    },
    emptyIllustration: {
        // position: "relative",
        // width: ResponsivePixels.size200,
        // height: ResponsivePixels.size200,
        marginBottom: ResponsivePixels.size40,
    },
    circle: {
        position: "absolute",
        borderRadius: 100,
    },
    circle1: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        backgroundColor: Colors.SunburstFlame,
        top: ResponsivePixels.size20,
        left: ResponsivePixels.size20,
    },
    circle2: {
        width: ResponsivePixels.size60,
        height: ResponsivePixels.size60,
        backgroundColor: "#FFE4B5",
        top: ResponsivePixels.size10,
        right: ResponsivePixels.size30,
    },
    circle3: {
        width: ResponsivePixels.size80,
        height: ResponsivePixels.size80,
        backgroundColor: "#FFF8DC",
        bottom: ResponsivePixels.size40,
        left: ResponsivePixels.size10,
    },
    circle4: {
        width: ResponsivePixels.size100,
        height: ResponsivePixels.size100,
        backgroundColor: "#FFEFD5",
        top: ResponsivePixels.size50,
        right: ResponsivePixels.size10,
    },
    circle5: {
        width: ResponsivePixels.size120,
        height: ResponsivePixels.size120,
        backgroundColor: "#FFF5EE",
        bottom: ResponsivePixels.size20,
        right: ResponsivePixels.size20,
    },
    searchIconContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -25 }, { translateY: -25 }],
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size50,
        backgroundColor: Colors.SunburstFlame,
        borderRadius: ResponsivePixels.size25,
        alignItems: "center",
        justifyContent: "center",
    },
    searchIcon: {
        fontSize: ResponsivePixels.size24,
        color: Colors.DefaultWhite,
    },
    emptyTitle: {
        fontSize: ResponsivePixels.size28,
        fontWeight: "bold",
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size12,
    },
    emptySubtitle: {
        fontSize: ResponsivePixels.size16,
        color: Colors.SteelMist,
        textAlign: "center",
        lineHeight: ResponsivePixels.size24,
        marginBottom: ResponsivePixels.size40,
        paddingHorizontal: ResponsivePixels.size45,
    },
    findFoodsButtonContainer: {
        width: "100%",
    },
})

export default CartScreen

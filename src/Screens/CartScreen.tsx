"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import MainContainer from "../common/MainContainer"
import CustomButton from "../common/CustomButton"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"

const CartScreen: React.FC = () => {
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
        const subtotal = cartItems
            .filter((item) => item.isSelected)
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
        const discount = 10900
        return subtotal - discount
    }

    const renderCartItem = ({ item }: any) => (
        <View style={styles.cartItem}>
            <TouchableOpacity
                style={[styles.checkbox, item.isSelected && styles.checkedBox]}
                onPress={() => toggleItemSelection(item.id)}
            >
                {item.isSelected && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>

            <Image source={{ uri: item.image }} style={styles.itemImage} />

            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toLocaleString()}</Text>
            </View>

            <View style={styles.quantityControls}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, false)}>
                    <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.quantity}>{item.quantity}</Text>

                <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, true)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(item.id)}>
                <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
        </View>
    )

    if (cartItems.length === 0) {
        return (
            <MainContainer
                statusBarStyle="dark-content"
                statusBarBackgroundColor={Colors.DefaultWhite}
                showHeader={true}
                header={{
                    headerTitle: "My Cart",
                    headerTitleColor: Colors.NoirBlack,
                    headerLeft: {
                        icon: "←",
                        onPress: () => console.log("Back pressed"),
                        color: Colors.NoirBlack,
                    },
                    headerRight: {
                        icon: "⋯",
                        onPress: () => console.log("Menu pressed"),
                        color: Colors.NoirBlack,
                    },
                }}
            >
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIllustration}>
                        <View style={[styles.circle, styles.circle1]} />
                        <View style={[styles.circle, styles.circle2]} />
                        <View style={[styles.circle, styles.circle3]} />
                        <View style={[styles.circle, styles.circle4]} />
                        <View style={[styles.circle, styles.circle5]} />
                        <View style={styles.searchIconContainer}>
                            <Text style={styles.searchIcon}>🔍</Text>
                        </View>
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
            containerBackgroundColor={Colors.SunburstFlameLight}
            statusBarBackgroundColor={Colors.DefaultWhite}
            showHeader={true}
            header={{
                headerTitle: "My Cart",
                headerTitleColor: Colors.NoirBlack,
                headerLeft: {
                    icon: "←",
                    onPress: () => console.log("Back pressed"),
                    color: Colors.NoirBlack,
                },
                headerRight: {
                    icon: "⋯",
                    onPress: () => console.log("Menu pressed"),
                    color: Colors.NoirBlack,
                },
            }}
        >
            <View style={styles.container}>
                {/* Delivery Location */}
                <View style={styles.deliverySection}>
                    <Text style={styles.deliveryLabel}>Delivery Location</Text>
                    <View style={styles.deliveryRow}>
                        <Text style={styles.deliveryLocation}>Home</Text>
                        <TouchableOpacity style={styles.changeLocationButton}>
                            <Text style={styles.changeLocationText}>Change Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Promo Code */}
                <View style={styles.promoSection}>
                    <View style={styles.promoRow}>
                        <View style={styles.promoLeft}>
                            <Text style={styles.promoIcon}>%</Text>
                            <Text style={styles.promoText}>Promo Code...</Text>
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
                />

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
                    <CustomButton title="Order Now" onPress={() => console.log("Order placed")} />
                </View>
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: ResponsivePixels.size24,
    },
    deliverySection: {
        marginTop: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size20,
    },
    deliveryLabel: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size4,
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
        marginBottom: ResponsivePixels.size20,
    },
    promoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.FrostedHaze,
        borderRadius: ResponsivePixels.size12,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size12,
    },
    promoLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    promoIcon: {
        fontSize: ResponsivePixels.size16,
        color: Colors.SunburstFlame,
        marginRight: ResponsivePixels.size12,
    },
    promoText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
    },
    applyButton: {
        backgroundColor: Colors.SunburstFlame,
        paddingHorizontal: ResponsivePixels.size20,
        paddingVertical: ResponsivePixels.size8,
        borderRadius: ResponsivePixels.size20,
    },
    applyButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size14,
        fontWeight: "600",
    },
    cartList: {
        flex: 1,
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: ResponsivePixels.size16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.CloudWhisper,
    },
    checkbox: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: ResponsivePixels.size4,
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
        width: ResponsivePixels.size60,
        height: ResponsivePixels.size60,
        borderRadius: ResponsivePixels.size8,
        marginRight: ResponsivePixels.size12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "600",
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size4,
    },
    itemPrice: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SunburstFlame,
        fontWeight: "600",
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: ResponsivePixels.size12,
    },
    quantityButton: {
        width: ResponsivePixels.size32,
        height: ResponsivePixels.size32,
        borderRadius: ResponsivePixels.size16,
        backgroundColor: Colors.FrostedHaze,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityButtonText: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    quantity: {
        fontSize: ResponsivePixels.size16,
        fontWeight: "600",
        color: Colors.NoirBlack,
        marginHorizontal: ResponsivePixels.size16,
    },
    deleteButton: {
        padding: ResponsivePixels.size8,
    },
    deleteIcon: {
        fontSize: ResponsivePixels.size16,
    },
    summarySection: {
        backgroundColor: Colors.FrostedHaze,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size20,
        marginVertical: ResponsivePixels.size20,
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
        color: Colors.SteelMist,
    },
    summaryValue: {
        fontSize: ResponsivePixels.size14,
        fontWeight: "600",
        color: Colors.NoirBlack,
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
        paddingHorizontal: ResponsivePixels.size40,
    },
    emptyIllustration: {
        position: "relative",
        width: ResponsivePixels.size200,
        height: ResponsivePixels.size200,
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
    },
    findFoodsButtonContainer: {
        width: "100%",
    },
})

export default CartScreen

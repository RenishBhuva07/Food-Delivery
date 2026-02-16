import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import MainContainer from '../common/MainContainer';
import CustomButton from '../common/CustomButton';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { navigate } from '../Navigators/Navigator';
import { Typography, ShadowStyles } from '../Theme/Typographys';
import { CustomAnimation } from '../common/CustomAnimation';
import { ANIMATIONS } from '../Animations';
import {
    ShoppingBag,
    MapPin,
    Clock,
    CreditCard,
} from 'lucide-react-native';

interface OrderSuccessScreenProps {
    route: any;
}

const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({ route }) => {
    const orderData = route?.params?.orderData;

    // Animations
    const cardSlideAnim = useRef(new Animated.Value(60)).current;
    const cardOpacityAnim = useRef(new Animated.Value(0)).current;
    const buttonSlideAnim = useRef(new Animated.Value(100)).current;
    const buttonOpacityAnim = useRef(new Animated.Value(0)).current;

    const orderId = orderData?.orderId ?? '#A8B2C1';
    const totalAmount = orderData?.totalAmount ?? '$38,000';
    const totalItems = orderData?.totalItems ?? 3;
    const paymentMethod = orderData?.paymentMethod ?? 'MasterCard';

    useEffect(() => {
        // Card slide up
        Animated.parallel([
            Animated.timing(cardSlideAnim, {
                toValue: 0,
                duration: 500,
                delay: 700,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
            Animated.timing(cardOpacityAnim, {
                toValue: 1,
                duration: 500,
                delay: 700,
                useNativeDriver: true,
            }),
        ]).start();

        // Buttons entrance
        Animated.parallel([
            Animated.timing(buttonSlideAnim, {
                toValue: 0,
                duration: 500,
                delay: 1000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(buttonOpacityAnim, {
                toValue: 1,
                duration: 500,
                delay: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <MainContainer
            statusBarStyle="dark-content"
            statusBarBackgroundColor="transparent"
            containerBackgroundColor={Colors.SunburstFlameLight}
            translucent={true}
        >
            <View style={styles.container}>
                {/* Success Animation Section */}
                <View style={styles.successSection}>
                    {/* Success Animation */}
                    <View style={styles.animationContainer}>
                        <CustomAnimation
                            animationFile={ANIMATIONS.Success}
                            animationStyle={{
                                width: ResponsivePixels.size200,
                                height: ResponsivePixels.size200,
                            }}
                        />
                    </View>

                    {/* Success Text */}
                    <Animated.View
                        style={{
                            opacity: cardOpacityAnim,
                            transform: [{ translateY: cardSlideAnim }],
                        }}
                    >
                        <Text style={styles.successTitle}>Order Placed!</Text>
                        <Text style={styles.successSubtitle}>
                            Your order has been placed successfully.{'\n'}
                            Sit back and relax while we prepare your meal!
                        </Text>
                    </Animated.View>
                </View>

                {/* Order Details Card */}
                <Animated.View
                    style={[
                        styles.orderCard,
                        {
                            opacity: cardOpacityAnim,
                            transform: [{ translateY: cardSlideAnim }],
                        },
                    ]}
                >
                    <View style={styles.orderCardHeader}>
                        <View style={styles.orderIdRow}>
                            <Text style={styles.orderIdLabel}>Order ID</Text>
                            <Text style={styles.orderIdValue}>{orderId}</Text>
                        </View>
                        <View style={styles.orderStatusBadge}>
                            <Text style={styles.orderStatusText}>Confirmed</Text>
                        </View>
                    </View>

                    <View style={styles.orderDetailsDivider} />

                    <View style={styles.orderDetailsGrid}>
                        <View style={styles.orderDetailItem}>
                            <View style={styles.orderDetailIconContainer}>
                                <ShoppingBag size={ResponsivePixels.size16} color={Colors.SunburstFlame} />
                            </View>
                            <View>
                                <Text style={styles.orderDetailLabel}>Items</Text>
                                <Text style={styles.orderDetailValue}>{totalItems} items</Text>
                            </View>
                        </View>

                        <View style={styles.orderDetailItem}>
                            <View style={styles.orderDetailIconContainer}>
                                <CreditCard size={ResponsivePixels.size16} color={Colors.SunburstFlame} />
                            </View>
                            <View>
                                <Text style={styles.orderDetailLabel}>Payment</Text>
                                <Text style={styles.orderDetailValue}>{paymentMethod}</Text>
                            </View>
                        </View>

                        <View style={styles.orderDetailItem}>
                            <View style={styles.orderDetailIconContainer}>
                                <MapPin size={ResponsivePixels.size16} color={Colors.SunburstFlame} />
                            </View>
                            <View>
                                <Text style={styles.orderDetailLabel}>Delivery</Text>
                                <Text style={styles.orderDetailValue}>Home</Text>
                            </View>
                        </View>

                        <View style={styles.orderDetailItem}>
                            <View style={styles.orderDetailIconContainer}>
                                <Clock size={ResponsivePixels.size16} color={Colors.SunburstFlame} />
                            </View>
                            <View>
                                <Text style={styles.orderDetailLabel}>Estimated</Text>
                                <Text style={styles.orderDetailValue}>25-30 min</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.orderDetailsDivider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Paid</Text>
                        <Text style={styles.totalValue}>{totalAmount}</Text>
                    </View>
                </Animated.View>

                {/* Action Buttons */}
                <Animated.View
                    style={[
                        styles.buttonsContainer,
                        {
                            opacity: buttonOpacityAnim,
                            transform: [{ translateY: buttonSlideAnim }],
                        },
                    ]}
                >
                    <CustomButton
                        title="Track Order"
                        onPress={() => navigate('TrackOrderScreen', {
                            order: {
                                orderId: orderId.replace('#', ''),
                                totalAmount,
                                totalItems,
                            },
                        })}
                    />
                    <CustomButton
                        title="Back to Home"
                        onPress={() => navigate('Dashboard')}
                        bordered
                        disableAllCaps
                        style={styles.backToHomeButton}
                    />
                </Animated.View>
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: ResponsivePixels.size12,
        justifyContent: 'center',
    },

    // Success Section
    successSection: {
        alignItems: 'center',
        marginBottom: ResponsivePixels.size30,
    },
    animationContainer: {
        marginBottom: ResponsivePixels.size5,
    },
    successTitle: {
        color: Colors.NoirBlack,
        textAlign: 'center',
        marginBottom: ResponsivePixels.size8,
        ...Typography.h5Bold,
    },
    successSubtitle: {
        color: Colors.SteelMist,
        textAlign: 'center',
        paddingHorizontal: ResponsivePixels.size20,
        ...Typography.bodyMediumRegular,
        lineHeight: 22,
    },

    // Order Card
    orderCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size20,
        padding: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size24,
        ...ShadowStyles.shadow,
    },
    orderCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderIdRow: {
        gap: ResponsivePixels.size4,
    },
    orderIdLabel: {
        color: Colors.SteelMist,
        ...Typography.bodySmallRegular,
    },
    orderIdValue: {
        color: Colors.NoirBlack,
        ...Typography.bodyLargeBold,
    },
    orderStatusBadge: {
        backgroundColor: '#2ECC7120',
        paddingHorizontal: ResponsivePixels.size14,
        paddingVertical: ResponsivePixels.size6,
        borderRadius: ResponsivePixels.size20,
    },
    orderStatusText: {
        color: '#2ECC71',
        ...Typography.bodySmallSemiBold,
    },
    orderDetailsDivider: {
        borderTopWidth: 1,
        borderTopColor: Colors.FrostedMist,
        marginVertical: ResponsivePixels.size14,
    },
    orderDetailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: ResponsivePixels.size14,
    },
    orderDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '46%',
        gap: ResponsivePixels.size10,
    },
    orderDetailIconContainer: {
        width: ResponsivePixels.size36,
        height: ResponsivePixels.size36,
        borderRadius: ResponsivePixels.size10,
        backgroundColor: Colors.SunburstFlameFaded,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderDetailLabel: {
        color: Colors.SteelMist,
        ...Typography.bodySuperSmallRegular,
    },
    orderDetailValue: {
        color: Colors.NoirBlack,
        ...Typography.bodySmallSemiBold,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        color: Colors.NoirBlack,
        ...Typography.bodyLargeBold,
    },
    totalValue: {
        color: Colors.SunburstFlame,
        ...Typography.h6Bold,
    },

    // Buttons
    buttonsContainer: {
        gap: ResponsivePixels.size12,
    },
    backToHomeButton: {
        borderColor: Colors.SunburstFlame,
    },
});

export default OrderSuccessScreen;

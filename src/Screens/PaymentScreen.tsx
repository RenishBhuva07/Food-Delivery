import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    TextInput,
} from 'react-native';
import MainContainer from '../common/MainContainer';
import CustomButton from '../common/CustomButton';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';
import { goBack, navigate } from '../Navigators/Navigator';
import { Typography, ShadowStyles } from '../Theme/Typographys';
import {
    CreditCard,
    Smartphone,
    ChevronRight,
    Plus,
    Shield,
    CheckCircle2,
    Wallet,
    CircleDollarSign,
    QrCode,
    Building2,
} from 'lucide-react-native';
import AddCardSheet, { AddCardSheetRef } from '../Components/AddCardSheet';
import MastercardLogo from '../Assets/SVGs/MastercardLogo';
import PaypalLogo from '../Assets/SVGs/PaypalLogo';
import ApplePayLogo from '../Assets/SVGs/ApplePayLogo';

interface PaymentMethod {
    id: string;
    type: 'mastercard' | 'paypal' | 'applepay' | 'visa' | 'upi';
    name: string;
    maskedNumber?: string;
    icon?: any;
}

interface UPIMethod {
    id: string;
    name: string;
    Icon: any;
    color: string;
}

interface PaymentScreenProps {
    route: any;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ route }) => {
    const orderData = route?.params?.orderData;

    const addCardSheetRef = useRef<AddCardSheetRef>(null);

    const [selectedPaymentType, setSelectedPaymentType] = useState<'card' | 'upi'>('card');
    const [selectedPaymentId, setSelectedPaymentId] = useState<string>('1');
    const [upiId, setUpiId] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Animations
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const [savedCards, setSavedCards] = useState<PaymentMethod[]>([
        {
            id: '1',
            type: 'mastercard',
            name: 'MasterCard',
            maskedNumber: '**** **** 0783 7873',
        },
        {
            id: '2',
            type: 'visa',
            name: 'Visa',
            maskedNumber: '**** **** 4562 1234',
        },
        {
            id: '3',
            type: 'paypal',
            name: 'PayPal',
            maskedNumber: 'john@email.com',
        },
    ]);

    const UPI_METHODS: UPIMethod[] = [
        { id: 'gpay', name: 'Google Pay', Icon: Wallet, color: '#4285F4' },
        { id: 'phonepe', name: 'PhonePe', Icon: Smartphone, color: '#5F259F' },
        { id: 'paytm', name: 'Paytm', Icon: CircleDollarSign, color: '#00BAF2' },
        { id: 'bhim', name: 'BHIM UPI', Icon: Building2, color: '#00897B' },
    ];

    const totalAmount = orderData?.totalAmount ?? '$38,000';
    const totalItems = orderData?.totalItems ?? 3;
    const deliveryLocation = orderData?.deliveryLocation ?? 'Home';

    const getCardLogo = (type: string) => {
        switch (type) {
            case 'mastercard':
                return <MastercardLogo width={ResponsivePixels.size44} height={ResponsivePixels.size28} />;
            case 'paypal':
                return <PaypalLogo width={ResponsivePixels.size50} height={ResponsivePixels.size20} />;
            case 'applepay':
                return <ApplePayLogo width={ResponsivePixels.size44} height={ResponsivePixels.size20} />;
            default:
                return <CreditCard size={ResponsivePixels.size22} color={Colors.SunburstFlame} />;
        }
    };

    const handleAddNewCard = () => {
        addCardSheetRef.current?.show();
    };

    const handleSaveNewCard = useCallback((cardData: {
        cardholderName: string;
        cardNumber: string;
        expiryDate: string;
        cvv: string;
    }) => {
        const newId = String(Date.now());
        const newCard: PaymentMethod = {
            id: newId,
            type: 'visa',
            name: 'Visa',
            maskedNumber: '**** **** ' + cardData.cardNumber.slice(-9),
        };
        setSavedCards(prev => [...prev, newCard]);
        setSelectedPaymentId(newId);
        setSelectedPaymentType('card');
    }, []);

    const handlePayNow = () => {
        setIsProcessing(true);

        // Animate button press
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            navigate('OrderSuccessScreen', {
                orderData: {
                    ...orderData,
                    paymentMethod: selectedPaymentType === 'card'
                        ? savedCards.find(c => c.id === selectedPaymentId)?.name
                        : UPI_METHODS.find(u => u.id === selectedPaymentId)?.name ?? 'UPI',
                    orderId: '#' + Math.random().toString(36).substring(2, 8).toUpperCase(),
                    totalAmount,
                    totalItems,
                },
            });
        }, 1500);
    };

    const selectedMethod = useMemo(() => {
        if (selectedPaymentType === 'card') {
            return savedCards.find(c => c.id === selectedPaymentId);
        }
        return UPI_METHODS.find(u => u.id === selectedPaymentId);
    }, [selectedPaymentType, selectedPaymentId, savedCards]);

    return (
        <MainContainer
            statusBarStyle="dark-content"
            statusBarBackgroundColor="transparent"
            containerBackgroundColor={Colors.SunburstFlameLight}
            translucent={true}
            showHeader
            header={{
                headerBackgroundColor: Colors.SunburstFlameLight,
                headerTitle: 'Payment',
                headerTitleColor: Colors.NoirBlack,
                headerLeft: {
                    icon: IMAGES.ic_Back,
                    onPress: () => goBack(),
                    color: Colors.NoirBlack,
                },
            }}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Order Summary Compact */}
                <View style={styles.orderSummaryCard}>
                    <View style={styles.orderSummaryRow}>
                        <View>
                            <Text style={styles.orderSummaryLabel}>Deliver to</Text>
                            <Text style={styles.orderSummaryValue}>{deliveryLocation}</Text>
                        </View>
                        <View style={styles.orderAmountContainer}>
                            <Text style={styles.orderSummaryLabel}>Total</Text>
                            <Text style={styles.orderTotalAmount}>{totalAmount}</Text>
                        </View>
                    </View>
                    <View style={styles.orderItemsBadge}>
                        <Text style={styles.orderItemsText}>{totalItems} items</Text>
                    </View>
                </View>

                {/* Payment Method Tabs */}
                <View style={styles.paymentTabs}>
                    <TouchableOpacity
                        style={[
                            styles.paymentTab,
                            selectedPaymentType === 'card' && styles.paymentTabActive,
                        ]}
                        onPress={() => {
                            setSelectedPaymentType('card');
                            setSelectedPaymentId(savedCards[0]?.id ?? '');
                        }}
                        activeOpacity={0.7}
                    >
                        <CreditCard
                            size={ResponsivePixels.size18}
                            color={selectedPaymentType === 'card' ? Colors.DefaultWhite : Colors.SteelMist}
                        />
                        <Text
                            style={[
                                styles.paymentTabText,
                                selectedPaymentType === 'card' && styles.paymentTabTextActive,
                            ]}
                        >
                            Cards
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.paymentTab,
                            selectedPaymentType === 'upi' && styles.paymentTabActive,
                        ]}
                        onPress={() => {
                            setSelectedPaymentType('upi');
                            setSelectedPaymentId('gpay');
                        }}
                        activeOpacity={0.7}
                    >
                        <QrCode
                            size={ResponsivePixels.size18}
                            color={selectedPaymentType === 'upi' ? Colors.DefaultWhite : Colors.SteelMist}
                        />
                        <Text
                            style={[
                                styles.paymentTabText,
                                selectedPaymentType === 'upi' && styles.paymentTabTextActive,
                            ]}
                        >
                            UPI
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Card Payment Options */}
                {selectedPaymentType === 'card' && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Saved Cards</Text>
                        <View style={styles.cardsList}>
                            {savedCards.map((card) => (
                                <TouchableOpacity
                                    key={card.id}
                                    style={[
                                        styles.cardItem,
                                        selectedPaymentId === card.id && styles.cardItemSelected,
                                    ]}
                                    onPress={() => setSelectedPaymentId(card.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.cardItemLeft}>
                                        <View style={[
                                            styles.cardIconContainer,
                                            selectedPaymentId === card.id && styles.cardIconContainerSelected,
                                        ]}>
                                            <CreditCard
                                                size={ResponsivePixels.size20}
                                                color={selectedPaymentId === card.id ? Colors.SunburstFlame : Colors.NoirBlack}
                                            />
                                        </View>
                                        <View style={styles.cardInfo}>
                                            <Text style={styles.cardName}>{card.name}</Text>
                                            <Text style={styles.cardNumber}>{card.maskedNumber}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardItemRight}>
                                        {getCardLogo(card.type)}
                                        {selectedPaymentId === card.id && (
                                            <CheckCircle2
                                                size={ResponsivePixels.size20}
                                                color={Colors.SunburstFlame}
                                                fill={Colors.SunburstFlame}
                                                style={{ marginLeft: ResponsivePixels.size8 }}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}

                            {/* Add New Card */}
                            <TouchableOpacity
                                style={styles.addCardButton}
                                onPress={handleAddNewCard}
                                activeOpacity={0.7}
                            >
                                <View style={styles.addCardLeft}>
                                    <View style={styles.addCardIconContainer}>
                                        <Plus size={ResponsivePixels.size20} color={Colors.SunburstFlame} />
                                    </View>
                                    <Text style={styles.addCardText}>Add New Card</Text>
                                </View>
                                <ChevronRight size={ResponsivePixels.size18} color={Colors.SteelMist} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* UPI Payment Options */}
                {selectedPaymentType === 'upi' && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>UPI Apps</Text>
                        <View style={styles.upiGrid}>
                            {UPI_METHODS.map((method) => {
                                const IconComp = method.Icon;
                                return (
                                    <TouchableOpacity
                                        key={method.id}
                                        style={[
                                            styles.upiItem,
                                            selectedPaymentId === method.id && styles.upiItemSelected,
                                        ]}
                                        onPress={() => setSelectedPaymentId(method.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[
                                            styles.upiIconContainer,
                                            { backgroundColor: method.color + '15' },
                                            selectedPaymentId === method.id && {
                                                backgroundColor: method.color + '25',
                                            },
                                        ]}>
                                            <IconComp
                                                size={ResponsivePixels.size24}
                                                color={method.color}
                                            />
                                        </View>
                                        <Text style={[
                                            styles.upiName,
                                            selectedPaymentId === method.id && styles.upiNameSelected,
                                        ]}>
                                            {method.name}
                                        </Text>
                                        {selectedPaymentId === method.id && (
                                            <View style={styles.upiCheckmark}>
                                                <CheckCircle2
                                                    size={ResponsivePixels.size16}
                                                    color={Colors.SunburstFlame}
                                                    fill={Colors.SunburstFlame}
                                                />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* UPI ID Input */}
                        <View style={styles.upiIdSection}>
                            <Text style={styles.upiIdLabel}>Or pay using UPI ID</Text>
                            <View style={styles.upiIdInputContainer}>
                                <TextInput
                                    style={styles.upiIdInput}
                                    placeholder="yourname@upi"
                                    placeholderTextColor={Colors.SilverHaze}
                                    value={upiId}
                                    onChangeText={setUpiId}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                                <TouchableOpacity
                                    style={[
                                        styles.verifyButton,
                                        upiId.includes('@') && styles.verifyButtonActive,
                                    ]}
                                    disabled={!upiId.includes('@')}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.verifyButtonText,
                                        upiId.includes('@') && styles.verifyButtonTextActive,
                                    ]}>
                                        Verify
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                {/* Security Badge */}
                <View style={styles.securityBadge}>
                    <Shield size={ResponsivePixels.size16} color="#2ECC71" />
                    <Text style={styles.securityText}>
                        100% Secure Payment. Your data is protected with 256-bit SSL encryption.
                    </Text>
                </View>

                {/* Payment Breakdown */}
                <View style={styles.breakdownCard}>
                    <Text style={styles.breakdownTitle}>Payment Details</Text>

                    <View style={styles.breakdownRow}>
                        <Text style={styles.breakdownLabel}>Subtotal ({totalItems} items)</Text>
                        <Text style={styles.breakdownValue}>$48,900</Text>
                    </View>
                    <View style={styles.breakdownRow}>
                        <Text style={styles.breakdownLabel}>Delivery Fee</Text>
                        <Text style={[styles.breakdownValue, { color: '#2ECC71' }]}>Free</Text>
                    </View>
                    <View style={styles.breakdownRow}>
                        <Text style={styles.breakdownLabel}>Discount</Text>
                        <Text style={[styles.breakdownValue, { color: '#2ECC71' }]}>-$10,900</Text>
                    </View>
                    <View style={styles.breakdownRow}>
                        <Text style={styles.breakdownLabel}>Tax & Charges</Text>
                        <Text style={styles.breakdownValue}>$0.00</Text>
                    </View>

                    <View style={styles.breakdownDivider} />

                    <View style={styles.breakdownRow}>
                        <Text style={styles.breakdownTotalLabel}>Total Amount</Text>
                        <Text style={styles.breakdownTotalValue}>{totalAmount}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Pay Now Button */}
            <Animated.View
                style={[
                    styles.payButtonContainer,
                    { transform: [{ scale: scaleAnim }] },
                ]}
            >
                <View style={styles.payButtonInner}>
                    <View style={styles.paySelectedMethod}>
                        {selectedPaymentType === 'card' ? (
                            <CreditCard size={ResponsivePixels.size16} color={Colors.SteelMist} />
                        ) : (
                            <QrCode size={ResponsivePixels.size16} color={Colors.SteelMist} />
                        )}
                        <Text style={styles.paySelectedText}>
                            {selectedPaymentType === 'card'
                                ? savedCards.find(c => c.id === selectedPaymentId)?.name ?? 'Card'
                                : UPI_METHODS.find(u => u.id === selectedPaymentId)?.name ?? 'UPI'}
                        </Text>
                    </View>
                    <CustomButton
                        title={isProcessing ? 'Processing...' : `Pay ${totalAmount}`}
                        onPress={handlePayNow}
                        disabled={isProcessing}
                        style={styles.payButton}
                    />
                </View>
            </Animated.View>

            {/* Add Card Sheet */}
            <AddCardSheet
                ref={addCardSheetRef}
                onSave={handleSaveNewCard}
            />
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: ResponsivePixels.size12,
        paddingTop: ResponsivePixels.size10,
        paddingBottom: ResponsivePixels.size140,
    },

    // Order Summary
    orderSummaryCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size16,
        ...ShadowStyles.shadow,
    },
    orderSummaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    orderSummaryLabel: {
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size4,
        ...Typography.bodySmallRegular,
    },
    orderSummaryValue: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    orderAmountContainer: {
        alignItems: 'flex-end',
    },
    orderTotalAmount: {
        color: Colors.SunburstFlame,
        ...Typography.h6Bold,
    },
    orderItemsBadge: {
        backgroundColor: Colors.SunburstFlameFaded,
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size4,
        borderRadius: ResponsivePixels.size12,
        alignSelf: 'flex-start',
        marginTop: ResponsivePixels.size10,
    },
    orderItemsText: {
        color: Colors.SunburstFlame,
        ...Typography.bodySmallSemiBold,
    },

    // Payment Tabs
    paymentTabs: {
        flexDirection: 'row',
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size4,
        marginBottom: ResponsivePixels.size20,
        ...ShadowStyles.shadow,
    },
    paymentTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: ResponsivePixels.size12,
        borderRadius: ResponsivePixels.size12,
        gap: ResponsivePixels.size8,
    },
    paymentTabActive: {
        backgroundColor: Colors.SunburstFlame,
    },
    paymentTabText: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumSemiBold,
    },
    paymentTabTextActive: {
        color: Colors.DefaultWhite,
    },

    // Sections
    sectionContainer: {
        marginBottom: ResponsivePixels.size20,
    },
    sectionTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size12,
        ...Typography.bodyLargeSemiBold,
    },

    // Cards List
    cardsList: {
        gap: ResponsivePixels.size10,
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.DefaultWhite,
        paddingVertical: ResponsivePixels.size14,
        paddingHorizontal: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size16,
        borderWidth: 1.5,
        borderColor: Colors.CloudWhisper,
    },
    cardItemSelected: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.SunlitAlmond,
    },
    cardItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cardIconContainer: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: ResponsivePixels.size12,
        backgroundColor: Colors.FrostedHaze,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size12,
    },
    cardIconContainerSelected: {
        backgroundColor: Colors.SunburstFlameFaded,
    },
    cardInfo: {
        flex: 1,
        gap: ResponsivePixels.size2,
    },
    cardName: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    cardNumber: {
        color: Colors.SteelMist,
        ...Typography.bodySmallRegular,
    },
    cardItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Add Card Button
    addCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.DefaultWhite,
        paddingVertical: ResponsivePixels.size14,
        paddingHorizontal: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size16,
        borderWidth: 1.5,
        borderColor: Colors.CloudWhisper,
        borderStyle: 'dashed',
    },
    addCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addCardIconContainer: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: ResponsivePixels.size12,
        backgroundColor: Colors.SunburstFlameFaded,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size12,
    },
    addCardText: {
        color: Colors.SunburstFlame,
        ...Typography.bodyMediumSemiBold,
    },

    // UPI Grid
    upiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: ResponsivePixels.size10,
        marginBottom: ResponsivePixels.size20,
    },
    upiItem: {
        width: '48%',
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: Colors.CloudWhisper,
        position: 'relative',
    },
    upiItemSelected: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.SunlitAlmond,
    },
    upiIconContainer: {
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size50,
        borderRadius: ResponsivePixels.size14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: ResponsivePixels.size8,
    },
    upiName: {
        color: Colors.NoirBlack,
        textAlign: 'center',
        ...Typography.bodySmallSemiBold,
    },
    upiNameSelected: {
        color: Colors.SunburstFlame,
    },
    upiCheckmark: {
        position: 'absolute',
        top: ResponsivePixels.size8,
        right: ResponsivePixels.size8,
    },

    // UPI ID Section
    upiIdSection: {
        marginTop: ResponsivePixels.size4,
    },
    upiIdLabel: {
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size10,
        ...Typography.bodyMediumMedium,
    },
    upiIdInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        borderWidth: 1.5,
        borderColor: Colors.CloudWhisper,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size4,
    },
    upiIdInput: {
        flex: 1,
        paddingVertical: ResponsivePixels.size12,
        color: Colors.NoirBlack,
        ...Typography.bodyMediumMedium,
    },
    verifyButton: {
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size8,
        borderRadius: ResponsivePixels.size20,
        backgroundColor: Colors.FrostedHaze,
    },
    verifyButtonActive: {
        backgroundColor: Colors.SunburstFlame,
    },
    verifyButtonText: {
        color: Colors.SteelMist,
        ...Typography.bodySmallSemiBold,
    },
    verifyButtonTextActive: {
        color: Colors.DefaultWhite,
    },

    // Security Badge
    securityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2ECC7115',
        borderRadius: ResponsivePixels.size12,
        paddingHorizontal: ResponsivePixels.size14,
        paddingVertical: ResponsivePixels.size10,
        marginBottom: ResponsivePixels.size16,
        gap: ResponsivePixels.size8,
    },
    securityText: {
        color: Colors.SteelMist,
        flex: 1,
        ...Typography.bodySuperSmallRegular,
    },

    // Breakdown Card
    breakdownCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size20,
        ...ShadowStyles.shadow,
    },
    breakdownTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size16,
        ...Typography.bodyLargeSemiBold,
    },
    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ResponsivePixels.size10,
    },
    breakdownLabel: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumRegular,
    },
    breakdownValue: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    breakdownDivider: {
        borderTopWidth: 1,
        borderTopColor: Colors.FrostedMist,
        marginVertical: ResponsivePixels.size10,
    },
    breakdownTotalLabel: {
        color: Colors.NoirBlack,
        ...Typography.bodyLargeBold,
    },
    breakdownTotalValue: {
        color: Colors.SunburstFlame,
        ...Typography.bodyLargeBold,
    },

    // Pay Button
    payButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.DefaultWhite,
        paddingHorizontal: ResponsivePixels.size12,
        paddingTop: ResponsivePixels.size12,
        paddingBottom: ResponsivePixels.size24,
        borderTopLeftRadius: ResponsivePixels.size24,
        borderTopRightRadius: ResponsivePixels.size24,
        ...ShadowStyles.shadow,
    },
    payButtonInner: {
        gap: ResponsivePixels.size10,
    },
    paySelectedMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: ResponsivePixels.size6,
    },
    paySelectedText: {
        color: Colors.SteelMist,
        ...Typography.bodySmallMedium,
    },
    payButton: {
        // inherits from CustomButton
    },
});

export default PaymentScreen;

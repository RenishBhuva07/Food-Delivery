import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import CustomModal, { CustomModalRef, ModalButton } from '../common/CustomModal';
import { Colors } from '../Assets/StyleUtilities/Colors';
import { goBack, navigate } from '../Navigators/Navigator';

interface PaymentMethod {
    id: string;
    type: 'mastercard' | 'paypal' | 'applepay' | 'visa';
    name: string;
    maskedNumber: string;
    isSelected: boolean;
}

interface ExtraCardListScreenProps {
    navigation: any;
}

const ExtraCardListScreen: React.FC<ExtraCardListScreenProps> = ({ navigation }) => {
    const deleteModalRef = useRef<CustomModalRef>(null);
    const [selectedCardId, setSelectedCardId] = useState<string>('1');
    const [cardToDelete, setCardToDelete] = useState<string | null>(null);

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        {
            id: '1',
            type: 'mastercard',
            name: 'MasterCard',
            maskedNumber: '**** **** 0783 7873',
            isSelected: true,
        },
        {
            id: '2',
            type: 'paypal',
            name: 'Paypal',
            maskedNumber: '**** **** 0582 4672',
            isSelected: false,
        },
        {
            id: '3',
            type: 'applepay',
            name: 'Apple Pay',
            maskedNumber: '**** **** 0582 4672',
            isSelected: false,
        }
    ]);

    const handleGoBack = () => {
        goBack();
    };

    const handleDeletePress = () => {
        if (selectedCardId) {
            setCardToDelete(selectedCardId);
            deleteModalRef.current?.show();
        }
    };

    const handleSelectPaymentMethod = (id: string) => {
        setSelectedCardId(id);
        setPaymentMethods(prev =>
            prev.map(method => ({
                ...method,
                isSelected: method.id === id
            }))
        );
    };

    const handleAddNewCard = () => {
        navigate('ExtraCardFormV2Screen');
    };

    const confirmDelete = () => {
        if (cardToDelete) {
            setPaymentMethods(prev => prev.filter(method => method.id !== cardToDelete));
            setCardToDelete(null);
            if (cardToDelete === selectedCardId && paymentMethods.length > 1) {
                const remainingCards = paymentMethods.filter(method => method.id !== cardToDelete);
                if (remainingCards.length > 0) {
                    setSelectedCardId(remainingCards[0].id);
                }
            }
        }
        deleteModalRef.current?.hide();
    };

    const cancelDelete = () => {
        setCardToDelete(null);
        deleteModalRef.current?.hide();
    };

    const deleteButtons: ModalButton[] = [
        {
            text: "No, I won't",
            style: 'primary',
            onPress: cancelDelete,
        },
        {
            text: 'Yes, Of course',
            style: 'secondary',
            onPress: confirmDelete,
        },
    ];

    // Render MasterCard Logo
    const renderMastercardLogo = (size: 'small' | 'large' = 'small') => {
        const circleSize = size === 'large' ? ResponsivePixels.size32 : ResponsivePixels.size20;
        const overlap = size === 'large' ? -ResponsivePixels.size12 : -ResponsivePixels.size8;

        return (
            <View style={styles.mastercardLogo}>
                <View style={[
                    styles.mastercardCircle,
                    styles.mastercardRed,
                    { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }
                ]} />
                <View style={[
                    styles.mastercardCircle,
                    styles.mastercardYellow,
                    { width: circleSize, height: circleSize, borderRadius: circleSize / 2, marginLeft: overlap }
                ]} />
            </View>
        );
    };

    // Render PayPal Logo
    const renderPaypalLogo = () => (
        <Text style={styles.paypalLogo}>PayPal</Text>
    );

    // Render Apple Pay Logo
    const renderApplePayLogo = () => (
        <View style={styles.applePayContainer}>
            <Text style={styles.appleIcon}></Text>
            <Text style={styles.applePayText}>Pay</Text>
        </View>
    );

    const getCardLogo = (type: string) => {
        switch (type) {
            case 'mastercard':
                return renderMastercardLogo('small');
            case 'paypal':
                return renderPaypalLogo();
            case 'applepay':
                return renderApplePayLogo();
            default:
                return <Text style={styles.defaultLogo}>💳</Text>;
        }
    };

    // Render card dots for card number
    const renderCardDots = (count: number = 4) => (
        <View style={styles.dotsContainer}>
            {[...Array(count)].map((_, index) => (
                <View key={index} style={styles.dot} />
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Extra Card</Text>
                <TouchableOpacity onPress={handleDeletePress} style={styles.deleteButton}>
                    <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* Featured Card Display */}
                <View style={styles.featuredCardContainer}>
                    <View style={styles.featuredCard}>
                        {/* Gradient Overlay Layers */}
                        <View style={styles.gradientLayer1} />
                        <View style={styles.gradientLayer2} />
                        <View style={styles.gradientLayer3} />

                        {/* Card Content */}
                        <View style={styles.cardContent}>
                            {/* Card Brand */}
                            <Text style={styles.cardBrand}>SoCard</Text>

                            {/* Card Number */}
                            <View style={styles.cardNumberRow}>
                                {renderCardDots(4)}
                                {renderCardDots(4)}
                                {renderCardDots(4)}
                                <Text style={styles.cardLastDigits}>8374</Text>
                            </View>

                            {/* Card Footer */}
                            <View style={styles.cardFooter}>
                                <View style={styles.cardInfoSection}>
                                    <View style={styles.cardInfoBlock}>
                                        <Text style={styles.cardLabel}>Card holder name</Text>
                                        <View style={styles.cardHolderDots}>
                                            {renderCardDots(3)}
                                            {renderCardDots(3)}
                                        </View>
                                    </View>
                                    <View style={styles.cardInfoBlock}>
                                        <Text style={styles.cardLabel}>Expiry date</Text>
                                        <View style={styles.expiryDateRow}>
                                            {renderCardDots(3)}
                                            <Text style={styles.expirySlash}>/</Text>
                                            {renderCardDots(3)}
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.cardLogoContainer}>
                                    {renderMastercardLogo('large')}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Credit Card Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Credit card</Text>

                    <View style={styles.paymentMethodsList}>
                        {paymentMethods.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                onPress={() => handleSelectPaymentMethod(method.id)}
                                style={[
                                    styles.paymentMethodItem,
                                    method.isSelected && styles.selectedPaymentMethod
                                ]}
                            >
                                <View style={styles.paymentMethodLeft}>
                                    <View style={styles.paymentMethodIcon}>
                                        <Text style={styles.cardIconText}>💳</Text>
                                    </View>
                                    <View style={styles.paymentMethodInfo}>
                                        <Text style={styles.paymentMethodName}>{method.name}</Text>
                                        <Text style={styles.paymentMethodNumber}>{method.maskedNumber}</Text>
                                    </View>
                                </View>
                                <View style={styles.paymentMethodRight}>
                                    {getCardLogo(method.type)}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Add New Card Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddNewCard} style={styles.addNewCardButton}>
                    <Text style={styles.addNewCardButtonText}>Add New Card</Text>
                </TouchableOpacity>
            </View>

            {/* Delete Confirmation Modal */}
            <CustomModal
                ref={deleteModalRef}
                title="Confirm Delete"
                message="Are you sure to delete this card?"
                buttons={deleteButtons}
                animationType="scale"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size16,
    },
    backButton: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: ResponsivePixels.size22,
        backgroundColor: Colors.FrostedHaze,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontSize: ResponsivePixels.size28,
        color: Colors.NoirBlack,
        marginTop: -ResponsivePixels.size2,
    },
    headerTitle: {
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
        color: Colors.NoirBlack,
    },
    deleteButton: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: ResponsivePixels.size22,
        backgroundColor: '#FFEBEB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteIcon: {
        fontSize: ResponsivePixels.size18,
    },
    featuredCardContainer: {
        paddingHorizontal: ResponsivePixels.size12,
        marginTop: ResponsivePixels.size10,
        marginBottom: ResponsivePixels.size30,
    },
    featuredCard: {
        borderRadius: ResponsivePixels.size20,
        minHeight: ResponsivePixels.size200,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FFA756',
    },
    gradientLayer1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFB366',
        opacity: 0.6,
    },
    gradientLayer2: {
        position: 'absolute',
        top: '30%',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FF9F43',
        opacity: 0.5,
    },
    gradientLayer3: {
        position: 'absolute',
        top: '60%',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.SunburstFlame,
        opacity: 0.4,
    },
    cardContent: {
        flex: 1,
        padding: ResponsivePixels.size24,
        justifyContent: 'space-between',
        zIndex: 1,
    },
    cardBrand: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size22,
        fontWeight: '600',
        marginBottom: ResponsivePixels.size20,
    },
    cardNumberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size14,
        marginBottom: ResponsivePixels.size24,
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: ResponsivePixels.size4,
    },
    dot: {
        width: ResponsivePixels.size8,
        height: ResponsivePixels.size8,
        borderRadius: ResponsivePixels.size4,
        backgroundColor: Colors.DefaultWhite,
    },
    cardLastDigits: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size22,
        fontWeight: '600',
        letterSpacing: 2,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cardInfoSection: {
        flexDirection: 'row',
        gap: ResponsivePixels.size24,
    },
    cardInfoBlock: {
        gap: ResponsivePixels.size6,
    },
    cardLabel: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size11,
        opacity: 0.9,
    },
    cardHolderDots: {
        flexDirection: 'row',
        gap: ResponsivePixels.size8,
    },
    expiryDateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size4,
    },
    expirySlash: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size14,
        fontWeight: '500',
    },
    cardLogoContainer: {
        alignItems: 'flex-end',
    },
    mastercardLogo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mastercardCircle: {
        opacity: 0.9,
    },
    mastercardRed: {
        backgroundColor: '#EB001B',
    },
    mastercardYellow: {
        backgroundColor: '#F79E1B',
    },
    sectionContainer: {
        paddingHorizontal: ResponsivePixels.size12,
    },
    sectionTitle: {
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size16,
    },
    paymentMethodsList: {
        gap: ResponsivePixels.size12,
    },
    paymentMethodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: ResponsivePixels.size16,
        paddingHorizontal: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size16,
        borderWidth: 1.5,
        borderColor: Colors.CloudWhisper,
        backgroundColor: Colors.DefaultWhite,
    },
    selectedPaymentMethod: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.SunlitAlmond,
    },
    paymentMethodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    paymentMethodIcon: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: ResponsivePixels.size10,
        backgroundColor: Colors.FrostedHaze,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size14,
    },
    cardIconText: {
        fontSize: ResponsivePixels.size20,
    },
    paymentMethodInfo: {
        flex: 1,
    },
    paymentMethodName: {
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size4,
    },
    paymentMethodNumber: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
    },
    paymentMethodRight: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: ResponsivePixels.size60,
    },
    paypalLogo: {
        fontSize: ResponsivePixels.size14,
        fontWeight: '700',
        fontStyle: 'italic',
        color: '#003087',
    },
    applePayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appleIcon: {
        fontSize: ResponsivePixels.size18,
        color: Colors.NoirBlack,
    },
    applePayText: {
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
        color: Colors.NoirBlack,
        marginLeft: ResponsivePixels.size2,
    },
    defaultLogo: {
        fontSize: ResponsivePixels.size20,
    },
    buttonContainer: {
        paddingHorizontal: ResponsivePixels.size12,
        paddingBottom: ResponsivePixels.size24,
        paddingTop: ResponsivePixels.size16,
    },
    addNewCardButton: {
        backgroundColor: Colors.SunburstFlame,
        borderRadius: ResponsivePixels.size30,
        paddingVertical: ResponsivePixels.size18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.SunburstFlame,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 10,
    },
    addNewCardButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },
});

export default ExtraCardListScreen;
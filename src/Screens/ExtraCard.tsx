import React, { useState, useRef } from 'react';
import { CreditCard } from 'lucide-react-native';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import CustomModal, { CustomModalRef, ModalButton } from '../common/CustomModal';
import { Colors } from '../Assets/StyleUtilities/Colors';
import { goBack, navigate } from '../Navigators/Navigator';
import CustomButton from '../common/CustomButton';
import MainContainer from '../common/MainContainer';
import { Typography } from '../Theme/Typographys';
import { IMAGES } from '../Assets/Images';
import MastercardLogo from '../Assets/SVGs/MastercardLogo';
import PaypalLogo from '../Assets/SVGs/PaypalLogo';
import ApplePayLogo from '../Assets/SVGs/ApplePayLogo';

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
        const logoWidth = size === 'large' ? ResponsivePixels.size60 : ResponsivePixels.size44;
        const logoHeight = size === 'large' ? ResponsivePixels.size40 : ResponsivePixels.size28;
        return <MastercardLogo width={logoWidth} height={logoHeight} />;
    };

    // Render PayPal Logo
    const renderPaypalLogo = () => (
        <PaypalLogo width={ResponsivePixels.size50} height={ResponsivePixels.size20} />
    );

    // Render Apple Pay Logo
    const renderApplePayLogo = () => (
        <ApplePayLogo width={ResponsivePixels.size44} height={ResponsivePixels.size20} />
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
                return <CreditCard size={ResponsivePixels.size20} color={Colors.NoirBlack} />;
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
        <MainContainer
            statusBarStyle="dark-content"
            containerBackgroundColor={Colors.DefaultWhite}
            showHeader
            header={{
                headerTitle: "Extra Card",
                headerTitleColor: Colors.NoirBlack,
                headerBackgroundColor: Colors.DefaultWhite,
                headerLeft: {
                    icon: IMAGES.ic_Back,
                    onPress: () => goBack(),
                    color: Colors.NoirBlack,
                },
                headerRight: {
                    icon: IMAGES.ic_Delete,
                    onPress: () => handleDeletePress(),
                    color: Colors.ErrorRed,
                },
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
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
                                        <CreditCard size={ResponsivePixels.size22} color={Colors.NoirBlack} />
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
                <CustomButton
                    title="Add New Card"
                    onPress={handleAddNewCard}
                    style={styles.addNewCardButton}
                />
            </View>

            {/* Delete Confirmation Modal */}
            <CustomModal
                ref={deleteModalRef}
                title="Confirm Delete"
                message="Are you sure to delete this card?"
                buttons={deleteButtons}
                animationType="scale"
            />
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: ResponsivePixels.size100,
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
        marginBottom: ResponsivePixels.size20,
        ...Typography.h6SemiBold
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
        letterSpacing: 2,
        ...Typography.h5SemiBold
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
        opacity: 0.9,
        ...Typography.bodySuperSmallRegular
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

    sectionContainer: {
        paddingHorizontal: ResponsivePixels.size12,
    },
    sectionTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size16,
        ...Typography.bodyLargeSemiBold
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
    paymentMethodInfo: {
        flex: 1,
    },
    paymentMethodName: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size4,
        ...Typography.bodyMediumSemiBold
    },
    paymentMethodNumber: {
        color: Colors.SteelMist,
        ...Typography.bodySmallRegular
    },
    paymentMethodRight: {
        alignItems: 'center',
        justifyContent: 'center',
        // minWidth: ResponsivePixels.size60,
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
    addNewCardButton: {
        backgroundColor: Colors.SunburstFlame,
    },
});

export default ExtraCardListScreen;
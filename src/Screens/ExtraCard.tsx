import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import CustomModal, { CustomModalRef, ModalButton } from '../common/CustomModal';

interface PaymentMethod {
    id: string;
    type: 'mastercard' | 'paypal' | 'applepay' | 'visa';
    name: string;
    maskedNumber: string;
    isSelected: boolean;
    logo: string;
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
            logo: '💳'
        },
        {
            id: '2',
            type: 'paypal',
            name: 'Paypal',
            maskedNumber: '**** **** 0582 4672',
            isSelected: false,
            logo: '💙'
        },
        {
            id: '3',
            type: 'applepay',
            name: 'Apple Pay',
            maskedNumber: '**** **** 0582 4672',
            isSelected: false,
            logo: '🍎'
        }
    ]);

    const handleGoBack = () => {
        navigation.goBack();
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
        navigation.navigate('AddCard');
    };

    const confirmDelete = () => {
        if (cardToDelete) {
            setPaymentMethods(prev => prev.filter(method => method.id !== cardToDelete));
            setCardToDelete(null);
            // If deleted card was selected, select the first remaining card
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

    const getCardLogo = (type: string) => {
        switch (type) {
            case 'mastercard':
                return (
                    <View style={styles.mastercardLogo}>
                        <View style={[styles.mastercardCircle, styles.mastercardRed]} />
                        <View style={[styles.mastercardCircle, styles.mastercardYellow]} />
                    </View>
                );
            case 'paypal':
                return <Text style={styles.paypalLogo}>PayPal</Text>;
            case 'applepay':
                return <Text style={styles.applePayLogo}> Pay</Text>;
            default:
                return <Text style={styles.defaultLogo}>💳</Text>;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Extra Card</Text>
                    <TouchableOpacity onPress={handleDeletePress} style={styles.deleteButton}>
                        <Text style={styles.deleteIcon}>🗑</Text>
                    </TouchableOpacity>
                </View>

                {/* Featured Card Display */}
                <View style={styles.featuredCardContainer}>
                    <View style={styles.featuredCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardBrand}>SoCard</Text>
                        </View>

                        <View style={styles.cardNumberContainer}>
                            <Text style={styles.cardNumber}>•••• •••• •••• 8374</Text>
                        </View>

                        <View style={styles.cardFooter}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardLabel}>Card holder name</Text>
                                <Text style={styles.cardValue}>••• •••</Text>
                            </View>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardLabel}>Expiry date</Text>
                                <Text style={styles.cardValue}>••• / •••</Text>
                            </View>
                            <View style={styles.cardLogoContainer}>
                                <View style={styles.mastercardLogo}>
                                    <View style={[styles.mastercardCircle, styles.mastercardRed]} />
                                    <View style={[styles.mastercardCircle, styles.mastercardYellow]} />
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
                                        <Text style={styles.paymentMethodIconText}>💳</Text>
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
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: ResponsivePixels.size20,
        paddingVertical: ResponsivePixels.size15,
    },
    backButton: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontSize: ResponsivePixels.size18,
        color: '#333333',
    },
    headerTitle: {
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
        color: '#333333',
    },
    deleteButton: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size20,
        backgroundColor: '#FFE5E5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteIcon: {
        fontSize: ResponsivePixels.size18,
        color: '#FF4444',
    },
    featuredCardContainer: {
        paddingHorizontal: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size30,
    },
    featuredCard: {
        backgroundColor: '#FF8C42',
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size24,
        height: ResponsivePixels.size200,
        position: 'relative',
        overflow: 'hidden',
    },
    cardHeader: {
        marginBottom: ResponsivePixels.size20,
    },
    cardBrand: {
        color: '#FFFFFF',
        fontSize: ResponsivePixels.size20,
        fontWeight: '600',
    },
    cardNumberContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    cardNumber: {
        color: '#FFFFFF',
        fontSize: ResponsivePixels.size24,
        fontWeight: '600',
        letterSpacing: 2,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cardInfo: {
        flex: 1,
    },
    cardLabel: {
        color: '#FFFFFF',
        fontSize: ResponsivePixels.size12,
        opacity: 0.8,
        marginBottom: ResponsivePixels.size4,
    },
    cardValue: {
        color: '#FFFFFF',
        fontSize: ResponsivePixels.size14,
        fontWeight: '500',
    },
    cardLogoContainer: {
        alignItems: 'flex-end',
    },
    sectionContainer: {
        paddingHorizontal: ResponsivePixels.size20,
    },
    sectionTitle: {
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: ResponsivePixels.size16,
    },
    paymentMethodsList: {
        gap: ResponsivePixels.size12,
    },
    paymentMethodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FAFAFA',
    },
    selectedPaymentMethod: {
        borderColor: '#FF8C42',
        backgroundColor: '#FFF8F0',
    },
    paymentMethodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    paymentMethodIcon: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size8,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size12,
    },
    paymentMethodIconText: {
        fontSize: ResponsivePixels.size18,
    },
    paymentMethodInfo: {
        flex: 1,
    },
    paymentMethodName: {
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: ResponsivePixels.size4,
    },
    paymentMethodNumber: {
        fontSize: ResponsivePixels.size14,
        color: '#666666',
    },
    paymentMethodRight: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mastercardLogo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mastercardCircle: {
        width: ResponsivePixels.size16,
        height: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size8,
    },
    mastercardRed: {
        backgroundColor: '#FF5F00',
    },
    mastercardYellow: {
        backgroundColor: '#FFB300',
        marginLeft: -ResponsivePixels.size8,
    },
    paypalLogo: {
        fontSize: ResponsivePixels.size14,
        fontWeight: '600',
        color: '#0070BA',
    },
    applePayLogo: {
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
        color: '#000000',
    },
    defaultLogo: {
        fontSize: ResponsivePixels.size20,
    },
    buttonContainer: {
        paddingHorizontal: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size20,
    },
    addNewCardButton: {
        backgroundColor: '#FF8C42',
        borderRadius: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF8C42',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    addNewCardButtonText: {
        color: '#FFFFFF',
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },
});

export default ExtraCardListScreen;
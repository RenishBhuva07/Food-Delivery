import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Colors } from '../Assets/StyleUtilities/Colors';
import { goBack } from '../Navigators/Navigator';
import CustomActionSheet from '../common/CustomActionSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';

interface ExtraCardFormV2ScreenProps {
    navigation: any;
}

const ExtraCardFormV2Screen: React.FC<ExtraCardFormV2ScreenProps> = ({ navigation }) => {
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const addCardSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        // Auto-show action sheet when screen loads
        setTimeout(() => {
            addCardSheetRef.current?.show();
        }, 500);
    }, []);

    const formatCardNumber = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(' ') : cleaned;
    };

    const formatExpiryDate = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
        }
        return cleaned;
    };

    const getDisplayCardNumber = () => {
        if (!cardNumber) {
            return '•••• •••• •••• ••••';
        }
        const cleaned = cardNumber.replace(/\s/g, '');
        const padded = cleaned.padEnd(16, '•');
        const groups = padded.match(/.{1,4}/g);
        return groups ? groups.join(' ') : padded;
    };

    const getDisplayName = () => {
        return cardholderName || 'Your Name';
    };

    const getDisplayExpiry = () => {
        if (!expiryDate) {
            return 'MM/YY';
        }
        return expiryDate;
    };

    const handleGoBack = () => {
        goBack();
    };

    const handleSaveCard = () => {
        addCardSheetRef.current?.hide();
        setTimeout(() => {
            goBack();
        }, 300);
    };

    const handleOpenSheet = () => {
        addCardSheetRef.current?.show();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Extra Card</Text>
                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Background Card Decoration */}
                <View style={styles.backgroundCardContainer}>
                    <View style={styles.backgroundCard}>
                        <Text style={styles.backgroundCardText}>SoCard</Text>
                    </View>
                </View>

                {/* Main Card Preview */}
                <View style={styles.cardPreviewContainer}>
                    <View style={styles.cardPreview}>
                        {/* Gradient Overlay Layers */}
                        <View style={styles.gradientLayer1} />
                        <View style={styles.gradientLayer2} />
                        <View style={styles.gradientLayer3} />

                        {/* Card Content */}
                        <View style={styles.cardContent}>
                            {/* VISA Logo */}
                            <View style={styles.visaLogoContainer}>
                                <Text style={styles.visaLogo}>VISA</Text>
                            </View>

                            {/* Card Number */}
                            <Text style={styles.cardNumber}>{getDisplayCardNumber()}</Text>

                            {/* Card Footer */}
                            <View style={styles.cardFooter}>
                                <View style={styles.cardInfoBlock}>
                                    <Text style={styles.cardLabel}>Card holder name</Text>
                                    <Text style={styles.cardValue}>{getDisplayName()}</Text>
                                </View>
                                <View style={styles.cardInfoBlock}>
                                    <Text style={styles.cardLabel}>Expiry Date</Text>
                                    <Text style={styles.cardValue}>{getDisplayExpiry()}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Tap to Edit Button */}
                <TouchableOpacity onPress={handleOpenSheet} style={styles.editCardButton}>
                    <Text style={styles.editCardButtonText}>Tap to Enter Card Details</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Add Card Action Sheet */}
            <CustomActionSheet ref={addCardSheetRef}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <View style={styles.sheetContent}>
                        {/* Sheet Handle Indicator */}
                        <Text style={ActionSheetStyles.actionSheetTitle}>Add Card Details</Text>

                        {/* Cardholder Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Cardholder Name</Text>
                            <TextInput
                                value={cardholderName}
                                onChangeText={setCardholderName}
                                placeholder="Albert Stevano Bajefski"
                                style={styles.input}
                                placeholderTextColor={Colors.SilverHaze}
                            />
                        </View>

                        {/* Card Number */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Card Number</Text>
                            <View style={styles.cardNumberInputContainer}>
                                <TextInput
                                    value={cardNumber}
                                    onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                                    placeholder="3822 8293 8292 2356"
                                    keyboardType="numeric"
                                    maxLength={19}
                                    style={styles.cardNumberInput}
                                    placeholderTextColor={Colors.SilverHaze}
                                />
                                <View style={styles.keyboardIcon}>
                                    <Text style={styles.keyboardIconText}>⌨️</Text>
                                </View>
                            </View>
                        </View>

                        {/* Expiry Date & CVV Row */}
                        <View style={styles.rowInputs}>
                            <View style={[styles.inputGroup, styles.halfWidth]}>
                                <Text style={styles.inputLabel}>Expiry Date</Text>
                                <TextInput
                                    value={expiryDate}
                                    onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                                    placeholder="11/24"
                                    keyboardType="numeric"
                                    maxLength={5}
                                    style={styles.input}
                                    placeholderTextColor={Colors.SilverHaze}
                                />
                            </View>
                            <View style={[styles.inputGroup, styles.halfWidth]}>
                                <Text style={styles.inputLabel}>3-Digit CVV</Text>
                                <TextInput
                                    value={cvv}
                                    onChangeText={setCvv}
                                    placeholder="531"
                                    keyboardType="numeric"
                                    maxLength={4}
                                    secureTextEntry
                                    style={styles.input}
                                    placeholderTextColor={Colors.SilverHaze}
                                />
                            </View>
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity onPress={handleSaveCard} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save Card</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </CustomActionSheet>
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
    scrollContent: {
        paddingBottom: ResponsivePixels.size100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: ResponsivePixels.size20,
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

    // Background Card Decoration
    backgroundCardContainer: {
        paddingHorizontal: ResponsivePixels.size40,
        marginTop: ResponsivePixels.size20,
    },
    backgroundCard: {
        backgroundColor: '#D4A574',
        borderRadius: ResponsivePixels.size16,
        height: ResponsivePixels.size80,
        justifyContent: 'center',
        paddingHorizontal: ResponsivePixels.size20,
        opacity: 0.6,
    },
    backgroundCardText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },

    // Main Card Preview
    cardPreviewContainer: {
        paddingHorizontal: ResponsivePixels.size30,
        marginTop: -ResponsivePixels.size30,
    },
    cardPreview: {
        borderRadius: ResponsivePixels.size20,
        minHeight: ResponsivePixels.size200,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FFA756',
        shadowColor: '#FFA756',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 15,
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
    visaLogoContainer: {
        alignItems: 'flex-end',
    },
    visaLogo: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size24,
        fontWeight: '700',
        fontStyle: 'italic',
        letterSpacing: 2,
    },
    cardNumber: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size24,
        fontWeight: '600',
        letterSpacing: 3,
        marginVertical: ResponsivePixels.size20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cardInfoBlock: {
        gap: ResponsivePixels.size4,
    },
    cardLabel: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size11,
        opacity: 0.8,
    },
    cardValue: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },

    // Edit Card Button
    editCardButton: {
        marginHorizontal: ResponsivePixels.size30,
        marginTop: ResponsivePixels.size30,
        paddingVertical: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size16,
        borderWidth: 2,
        borderColor: Colors.SunburstFlame,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.SunlitAlmond,
    },
    editCardButtonText: {
        color: Colors.SunburstFlame,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },

    // Action Sheet Content
    sheetContent: {
        paddingBottom: ResponsivePixels.size20,
    },
    inputGroup: {
        marginBottom: ResponsivePixels.size20,
    },
    inputLabel: {
        fontSize: ResponsivePixels.size14,
        fontWeight: '500',
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size8,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.CloudWhisper,
        borderRadius: ResponsivePixels.size12,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size16,
        fontSize: ResponsivePixels.size16,
        color: Colors.NoirBlack,
        backgroundColor: Colors.DefaultWhite,
    },
    cardNumberInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.CloudWhisper,
        borderRadius: ResponsivePixels.size12,
        backgroundColor: Colors.DefaultWhite,
        overflow: 'hidden',
    },
    cardNumberInput: {
        flex: 1,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size16,
        fontSize: ResponsivePixels.size16,
        color: Colors.NoirBlack,
    },
    keyboardIcon: {
        paddingHorizontal: ResponsivePixels.size16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardIconText: {
        fontSize: ResponsivePixels.size20,
        opacity: 0.5,
    },
    rowInputs: {
        flexDirection: 'row',
        gap: ResponsivePixels.size16,
    },
    halfWidth: {
        flex: 1,
    },
    saveButton: {
        backgroundColor: Colors.SunburstFlame,
        borderRadius: ResponsivePixels.size30,
        paddingVertical: ResponsivePixels.size18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: ResponsivePixels.size10,
        shadowColor: Colors.SunburstFlame,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 10,
    },
    saveButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },
});

export default ExtraCardFormV2Screen;

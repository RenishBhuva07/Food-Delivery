import React, { useState, forwardRef, useImperativeHandle, useRef, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Animated,
} from 'react-native';
import { CreditCard } from 'lucide-react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Colors } from '../Assets/StyleUtilities/Colors';
import CustomActionSheet from '../common/CustomActionSheet';
import CustomButton from '../common/CustomButton';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';
import { Typography } from '../Theme/Typographys';

export interface AddCardSheetRef {
    show: () => void;
    hide: () => void;
}

interface AddCardSheetProps {
    onSave?: (cardData: {
        cardholderName: string;
        cardNumber: string;
        expiryDate: string;
        cvv: string;
    }) => void;
}

const AddCardSheet = forwardRef<AddCardSheetRef, AddCardSheetProps>(({ onSave }, ref) => {
    const sheetRef = useRef<ActionSheetRef>(null);
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isCvvFocused, setIsCvvFocused] = useState(false);
    const flipAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(flipAnimation, {
            toValue: isCvvFocused ? 1 : 0,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start();
    }, [isCvvFocused, flipAnimation]);

    const frontInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    const frontOpacity = flipAnimation.interpolate({
        inputRange: [0, 0.5, 0.5, 1],
        outputRange: [1, 1, 0, 0],
    });

    const backOpacity = flipAnimation.interpolate({
        inputRange: [0, 0.5, 0.5, 1],
        outputRange: [0, 0, 1, 1],
    });

    const getDisplayCvv = () => {
        if (!cvv) {
            return '•••';
        }
        return cvv;
    };

    useImperativeHandle(ref, () => ({
        show: () => sheetRef.current?.show(),
        hide: () => sheetRef.current?.hide(),
    }));

    const resetForm = useCallback(() => {
        setCardholderName('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setIsCvvFocused(false);
        flipAnimation.setValue(0);
    }, [flipAnimation]);

    const formatCardNumber = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(' ') : cleaned;
    };

    const formatExpiryDate = (text: string) => {
        // If text ends with '/', user is deleting past the slash — remove it and the last month digit
        if (text.endsWith('/')) {
            const digits = text.replace(/\D/g, '');
            return digits.substring(0, digits.length - 1);
        }
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

    const handleSaveCard = () => {
        onSave?.({
            cardholderName,
            cardNumber,
            expiryDate,
            cvv,
        });
        sheetRef.current?.hide();
        resetForm();
    };

    const handleSheetClose = () => {
        resetForm();
    };

    return (
        <CustomActionSheet ref={sheetRef} onClose={handleSheetClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.sheetContent}>
                        {/* Sheet Title */}
                        {/* <Text style={ActionSheetStyles.actionSheetTitle}>Add New Card</Text> */}

                        {/* Live Card Preview with Flip Animation */}
                        <View style={styles.cardPreviewContainer}>
                            {/* Front of Card */}
                            <Animated.View
                                style={[
                                    styles.cardPreview,
                                    {
                                        transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
                                        opacity: frontOpacity,
                                    },
                                ]}
                            >
                                {/* Gradient Overlay Layers */}
                                <View style={styles.gradientLayer1} />
                                <View style={styles.gradientLayer2} />
                                <View style={styles.gradientLayer3} />

                                {/* Card Content */}
                                <View style={styles.cardContent}>
                                    {/* Card Brand & Icon */}
                                    <View style={styles.cardTopRow}>
                                        <Text style={styles.cardBrand}>SoCard</Text>
                                        <CreditCard
                                            size={ResponsivePixels.size24}
                                            color={Colors.DefaultWhite}
                                        />
                                    </View>

                                    {/* Card Number */}
                                    <Text style={styles.cardNumber}>
                                        {getDisplayCardNumber()}
                                    </Text>

                                    {/* Card Footer */}
                                    <View style={styles.cardFooter}>
                                        <View style={styles.cardInfoBlock}>
                                            <Text style={styles.cardLabel}>Card holder name</Text>
                                            <Text style={styles.cardValue} numberOfLines={1}>
                                                {getDisplayName()}
                                            </Text>
                                        </View>
                                        <View style={styles.cardInfoBlock}>
                                            <Text style={styles.cardLabel}>Expiry date</Text>
                                            <Text style={styles.cardValue}>
                                                {getDisplayExpiry()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>

                            {/* Back of Card */}
                            <Animated.View
                                style={[
                                    styles.cardPreview,
                                    styles.cardBack,
                                    {
                                        transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
                                        opacity: backOpacity,
                                    },
                                ]}
                            >
                                {/* Gradient Overlay Layers */}
                                <View style={styles.gradientLayer1} />
                                <View style={styles.gradientLayer2} />
                                <View style={styles.gradientLayer3} />

                                {/* Back Card Content */}
                                <View style={styles.cardBackContent}>
                                    {/* Magnetic Stripe */}
                                    <View style={styles.magneticStripe} />

                                    {/* Signature and CVV Section */}
                                    <View style={styles.signatureCvvSection}>
                                        <View style={styles.signatureStrip}>
                                            {/* Diagonal lines pattern */}
                                            <View style={styles.signatureLines}>
                                                {[...Array(20)].map((_, i) => (
                                                    <View key={i} style={styles.signatureLine} />
                                                ))}
                                            </View>
                                        </View>
                                        <View style={styles.cvvBox}>
                                            <Text style={styles.cvvLabel}>CVV</Text>
                                            <Text style={styles.cvvValue}>{getDisplayCvv()}</Text>
                                        </View>
                                    </View>

                                    {/* Card Brand on Back */}
                                    <View style={styles.cardBackFooter}>
                                        <Text style={styles.cardBackDisclaimer}>
                                            This card is property of SoCard Bank.
                                        </Text>
                                        <CreditCard
                                            size={ResponsivePixels.size24}
                                            color={Colors.DefaultWhite}
                                        />
                                    </View>
                                </View>
                            </Animated.View>
                        </View>

                        {/* Form Fields */}
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
                            <TextInput
                                value={cardNumber}
                                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                                placeholder="3822 8293 8292 2356"
                                keyboardType="numeric"
                                maxLength={19}
                                style={styles.input}
                                placeholderTextColor={Colors.SilverHaze}
                            />
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
                                    onFocus={() => setIsCvvFocused(true)}
                                    onBlur={() => setIsCvvFocused(false)}
                                />
                            </View>
                        </View>

                        {/* Save Button */}
                        <CustomButton
                            title="Save Card"
                            onPress={handleSaveCard}
                            style={styles.saveButton}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </CustomActionSheet>
    );
});

export default AddCardSheet;

const styles = StyleSheet.create({
    sheetContent: {
        // paddingBottom: ResponsivePixels.size10,
    },

    // Card Preview
    cardPreviewContainer: {
        marginBottom: ResponsivePixels.size24,
        minHeight: ResponsivePixels.size190,
    },
    cardPreview: {
        borderRadius: ResponsivePixels.size20,
        minHeight: ResponsivePixels.size190,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FFA756',
        shadowColor: '#FFA756',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
        backfaceVisibility: 'hidden',
    },
    cardBack: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    cardBackContent: {
        flex: 1,
        justifyContent: 'space-between',
        zIndex: 1,
    },
    magneticStripe: {
        height: ResponsivePixels.size44,
        backgroundColor: '#2C2C2E',
        marginTop: ResponsivePixels.size24,
        opacity: 0.9,
    },
    signatureCvvSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ResponsivePixels.size20,
        gap: ResponsivePixels.size12,
        marginTop: ResponsivePixels.size20,
    },
    signatureStrip: {
        flex: 1,
        height: ResponsivePixels.size40,
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: ResponsivePixels.size4,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    signatureLines: {
        flexDirection: 'row',
        gap: 3,
        opacity: 0.3,
    },
    signatureLine: {
        width: 1,
        height: ResponsivePixels.size40,
        backgroundColor: '#999',
        transform: [{ skewX: '-20deg' }],
    },
    cvvBox: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size8,
        paddingHorizontal: ResponsivePixels.size14,
        paddingVertical: ResponsivePixels.size8,
        alignItems: 'center',
        minWidth: ResponsivePixels.size70,
    },
    cvvLabel: {
        color: '#999',
        marginBottom: ResponsivePixels.size2,
        ...Typography.bodySuperSmallRegular,
    },
    cvvValue: {
        color: Colors.NoirBlack,
        letterSpacing: 4,
        ...Typography.bodyLargeSemiBold,
    },
    cardBackFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size16,
        marginTop: ResponsivePixels.size12,
    },
    cardBackDisclaimer: {
        color: 'rgba(255,255,255,0.7)',
        flex: 1,
        marginRight: ResponsivePixels.size10,
        ...Typography.bodySuperSmallRegular,
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
        padding: ResponsivePixels.size20,
        justifyContent: 'space-between',
        zIndex: 1,
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ResponsivePixels.size14,
    },
    cardBrand: {
        color: Colors.DefaultWhite,
        ...Typography.h6SemiBold,
    },
    cardNumber: {
        color: Colors.DefaultWhite,
        letterSpacing: 3,
        marginBottom: ResponsivePixels.size16,
        ...Typography.h5SemiBold,
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
        opacity: 0.85,
        ...Typography.bodySuperSmallRegular,
    },
    cardValue: {
        color: Colors.DefaultWhite,
        maxWidth: ResponsivePixels.size150,
        ...Typography.bodyMediumSemiBold,
    },

    // Form Fields
    inputGroup: {
        marginBottom: ResponsivePixels.size18,
    },
    inputLabel: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size8,
        ...Typography.bodyMediumMedium,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.CloudWhisper,
        borderRadius: ResponsivePixels.size12,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size14,
        color: Colors.NoirBlack,
        backgroundColor: Colors.DefaultWhite,
        ...Typography.bodyLargeRegular,
    },
    rowInputs: {
        flexDirection: 'row',
        gap: ResponsivePixels.size16,
    },
    halfWidth: {
        flex: 1,
    },
    saveButton: {
        marginTop: ResponsivePixels.size8,
    },
});

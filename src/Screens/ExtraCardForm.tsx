import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';

interface ExtraCardFormScreenProps {
    navigation: any;
}

const ExtraCardFormScreen: React.FC<ExtraCardFormScreenProps> = ({ navigation }) => {
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [showCardTypeDropdown, setShowCardTypeDropdown] = useState(false);

    const cardTypes = ['Visa', 'Mastercard', 'American Express'];

    const formatCardNumber = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        const formatted = cleaned.replace(/(.{4})/g, '$1 / ').trim();
        if (formatted.endsWith(' /')) {
            return formatted.slice(0, -2);
        }
        return formatted;
    };

    const formatExpiryDate = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.substring(0, 2) + ' / ' + cleaned.substring(2, 4);
        }
        return cleaned;
    };

    const handleSaveCard = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Extra Card</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name on Card</Text>
                        <TextInput
                            value={nameOnCard}
                            onChangeText={setNameOnCard}
                            placeholder="Enter Name"
                            style={styles.input}
                            placeholderTextColor="#999999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Card Number</Text>
                        <TextInput
                            value={cardNumber}
                            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                            placeholder="---- / ---- / ---- / ----"
                            keyboardType="numeric"
                            style={styles.input}
                            placeholderTextColor="#999999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Card Type</Text>
                        <TouchableOpacity
                            onPress={() => setShowCardTypeDropdown(!showCardTypeDropdown)}
                            style={styles.dropdownButton}
                        >
                            <Text style={[styles.dropdownText, !cardType && styles.placeholderText]}>
                                {cardType || 'Select Card Type'}
                            </Text>
                            <Text style={styles.dropdownArrow}>▼</Text>
                        </TouchableOpacity>

                        {showCardTypeDropdown && (
                            <View style={styles.dropdownMenu}>
                                {cardTypes.map((type, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setCardType(type);
                                            setShowCardTypeDropdown(false);
                                        }}
                                        style={styles.dropdownItem}
                                    >
                                        <Text style={styles.dropdownItemText}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Expiry Date</Text>
                        <TextInput
                            value={expiryDate}
                            onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                            placeholder="MM / YY"
                            keyboardType="numeric"
                            maxLength={7}
                            style={styles.input}
                            placeholderTextColor="#999999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.cvvHeader}>
                            <Text style={styles.label}>CVV</Text>
                            <TouchableOpacity style={styles.helpButton}>
                                <Text style={styles.helpIcon}>?</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            value={cvv}
                            onChangeText={setCvv}
                            placeholder="- - - - -"
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry
                            style={styles.input}
                            placeholderTextColor="#999999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Billing Address</Text>
                        <TextInput
                            value={billingAddress}
                            onChangeText={setBillingAddress}
                            placeholder="Enter Address"
                            multiline
                            numberOfLines={3}
                            style={[styles.input, styles.textArea]}
                            placeholderTextColor="#999999"
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Save Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSaveCard} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Card</Text>
                </TouchableOpacity>
            </View>
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
    placeholder: {
        width: ResponsivePixels.size40,
    },
    formContainer: {
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size20,
    },
    inputGroup: {
        marginBottom: ResponsivePixels.size24,
        position: 'relative',
    },
    label: {
        fontSize: ResponsivePixels.size16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: ResponsivePixels.size8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: ResponsivePixels.size12,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size16,
        fontSize: ResponsivePixels.size16,
        color: '#333333',
        backgroundColor: '#FAFAFA',
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: ResponsivePixels.size12,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size16,
        backgroundColor: '#FAFAFA',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: {
        fontSize: ResponsivePixels.size16,
        color: '#333333',
    },
    placeholderText: {
        color: '#999999',
    },
    dropdownArrow: {
        fontSize: ResponsivePixels.size12,
        color: '#666666',
    },
    dropdownMenu: {
        position: 'absolute',
        top: ResponsivePixels.size70,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: ResponsivePixels.size12,
        zIndex: 1000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dropdownItem: {
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    dropdownItemText: {
        fontSize: ResponsivePixels.size16,
        color: '#333333',
    },
    cvvHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: ResponsivePixels.size8,
    },
    helpButton: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: ResponsivePixels.size12,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpIcon: {
        fontSize: ResponsivePixels.size14,
        color: '#666666',
        fontWeight: '600',
    },
    textArea: {
        height: ResponsivePixels.size80,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        paddingHorizontal: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size20,
    },
    saveButton: {
        backgroundColor: '#FF8C42',
        borderRadius: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },
});

export default ExtraCardFormScreen;
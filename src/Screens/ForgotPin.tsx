import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import MainContainer from '../common/MainContainer';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Colors } from '../Assets/StyleUtilities/Colors';
import { FloatingTextInput } from '../common/FloatingTextInput';

const ForgotPin: React.FC = () => {
    const [email, setEmail] = useState('Alberteinstein@gmail.com');

    return (
        <MainContainer statusBarStyle='dark-content' statusBarBackgroundColor={"transparent"}>

            <View style={styles.contentWrapper}>
                <View style={styles.header}>
                    <Text style={styles.title}>Forgot password?</Text>
                    <Text style={styles.subtitle}>
                        Enter your email address and we'll send you a confirmation code to reset your password.
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <FloatingTextInput
                            label="Email Address"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                </View>

            </View>
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>CONTINUE</Text>
            </TouchableOpacity>
        </MainContainer>

    );
};

const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        paddingHorizontal: ResponsivePixels.size24,
        paddingTop: ResponsivePixels.size50,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: ResponsivePixels.size32,
        fontWeight: '600',
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size8,
    },
    subtitle: {
        fontSize: ResponsivePixels.size16,
        color: Colors.SteelMist,
    },
    form: {
        marginBottom: ResponsivePixels.size40,
    },
    inputGroup: {
        marginBottom: ResponsivePixels.size10,
    },
    label: {
        fontSize: ResponsivePixels.size16,
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size8,
        fontWeight: '500',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingVertical: ResponsivePixels.size12,
        fontSize: ResponsivePixels.size16,
        color: Colors.NoirBlack,
    },
    continueButton: {
        backgroundColor: Colors.SunburstFlame,
        paddingVertical: ResponsivePixels.size16,
        marginHorizontal: ResponsivePixels.size24,
        marginBottom: ResponsivePixels.size24,
        borderRadius: 50,
        alignItems: 'center',
    },
    continueButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});

export default ForgotPin;
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Colors } from '../Assets/StyleUtilities/Colors';

const RegisterScreen: React.FC = () => {
    const [email, setEmail] = useState('Alberteinstein@gmail.com');
    const [alertInterval, setAlertInterval] = useState('');
    const [password, setPassword] = useState('••••••••••');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create your new account.</Text>
                    <Text style={styles.subtitle}>
                        Create an account to start looking for the food you like
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Alert Interval</Text>
                        <TextInput
                            style={styles.input}
                            value={alertInterval}
                            onChangeText={setAlertInterval}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text style={styles.eyeText}>👁</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.termsContainer}
                        onPress={() => setAgreeToTerms(!agreeToTerms)}
                    >
                        <Text style={styles.termsText}>
                            I Agree with{' '}
                            <Text style={styles.termsLink}>Terms of Service</Text>
                            {' '}and{' '}
                            <Text style={styles.termsLink}>Privacy Policy</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.signUpButton}>
                    <Text style={styles.signUpButtonText}>Sign up</Text>
                </TouchableOpacity>

                <View style={styles.socialSection}>
                    <Text style={styles.orText}>Or sign in with</Text>
                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialIcon}>G</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialIcon}>f</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialIcon}>🍎</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?
                        <Text style={styles.signUpLink}> Sign up</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    form: {
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
    },
    eyeIcon: {
        padding: 8,
    },
    eyeText: {
        fontSize: 16,
    },
    termsContainer: {
        marginTop: 16,
    },
    termsText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    termsLink: {
        color: '#FF8C00',
        fontWeight: '500',
    },
    signUpButton: {
        backgroundColor: '#FF8C00',
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 30,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    socialSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    orText: {
        color: '#666',
        fontSize: 14,
        marginBottom: 20,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    socialButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.FrostedHaze,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialIcon: {
        fontSize: 20,
        fontWeight: '600',
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
    signUpLink: {
        color: '#FF8C00',
        fontWeight: '500',
    },
});

export default RegisterScreen;
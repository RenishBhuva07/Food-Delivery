import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

const ForgotPasswordScreen: React.FC = () => {
    const [email, setEmail] = useState('Alberteinstein@gmail.com');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView
                style={styles.content}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Forgot password?</Text>
                    <Text style={styles.subtitle}>
                        Enter your email address and we'll send you a confirmation code to reset your password.
                    </Text>
                </View>

                <View style={styles.form}>
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

                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>CONTINUE</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    form: {
        marginBottom: 40,
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
    continueButton: {
        backgroundColor: '#FF8C00',
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});

export default ForgotPasswordScreen;
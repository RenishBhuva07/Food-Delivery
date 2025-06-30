import React, { forwardRef, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Keyboard,
} from 'react-native';
import { Colors } from '../Assets/StyleUtilities/Colors';
import MainContainer from '../common/MainContainer';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { FloatingTextInput } from '../common/FloatingTextInput';
import { IMAGES } from '../Assets/Images';
import { Checkbox } from 'native-base';
import CustomActionSheet from '../common/CustomActionSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';
import { goBack } from '../Navigators/Navigator';
import CustomButton from '../common/CustomButton';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [alertInterval, setAlertInterval] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false),
        alertIntervalRef = useRef<{ focus: () => void }>(null),
        passwordRef = useRef<{ focus: () => void }>(null),
        termsRef = useRef<ActionSheetRef>(null),
        privacyRef = useRef<ActionSheetRef>(null);

    const navigateToRegister = () => goBack();

    const TermsAndPrivacySheet = forwardRef<ActionSheetRef, { title: string, description: string }>(({ title, description }, ref) => {
        return (
            <CustomActionSheet ref={ref}>
                <View style={ActionSheetStyles.actionSheetContent}>
                    <Text style={ActionSheetStyles.actionSheetTitle}>{title}</Text>

                    <Text style={ActionSheetStyles.description}>{description}</Text>

                </View>
            </CustomActionSheet>
        );
    });

    return (
        <MainContainer statusBarStyle='dark-content' statusBarBackgroundColor={Colors.DefaultWhite}>
            <View style={styles.contentWrapper}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create your new account.</Text>
                    <Text style={styles.subtitle}>
                        Create an account to start looking for the food you like
                    </Text>
                </View>

                <View style={styles.form}>

                    <FloatingTextInput
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        returnKeyType='next'
                        onSubmitEditing={() => alertIntervalRef?.current?.focus()}
                    />

                    <FloatingTextInput
                        ref={alertIntervalRef}
                        label="Alert Interval"
                        value={alertInterval}
                        onChangeText={setAlertInterval}
                        keyboardType="default"
                        isRequired={false}
                        returnKeyType='next'
                        onSubmitEditing={() => passwordRef?.current?.focus()}
                    />

                    <FloatingTextInput
                        ref={passwordRef}
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        keyboardType='default'
                        rightIcon={showPassword ? IMAGES.ic_Eye_Off : IMAGES.ic_Eye_On}
                        onPressRightIcon={() => setShowPassword(!showPassword)}
                        secureTextEntry={!showPassword}
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />

                    <View style={styles.termsContainer}>

                        <Checkbox
                            value='agreeToTerms'
                            isChecked={agreeToTerms}
                            onChange={() => setAgreeToTerms(!agreeToTerms)}
                            style={[styles.checkbox, { backgroundColor: agreeToTerms ? Colors.SunburstFlame : Colors.DefaultWhite }]}
                        />

                        <View style={{ flex: 1 }}>
                            <Text style={styles.termsText}>
                                I Agree with{' '}
                                <Text onPress={() => termsRef?.current?.show()} style={styles.termsLink}>Terms of Service</Text>
                                {' '}and{' '}
                                <Text onPress={() => privacyRef?.current?.show()} style={styles.termsLink}>Privacy Policy</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.signUpButtonWrapper}>
                    <CustomButton title="Sign up" onPress={{}} disabled={!agreeToTerms} />
                </View>

                <View style={styles.socialSection}>

                    <View style={styles.orTextWrapper}>
                        <View style={styles.divider} />
                        <Text style={styles.orText}>Or sign in with</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={styles.socialButtonWrapper}>
                            <Image
                                source={IMAGES.ic_Google}
                                style={styles.socialIcon}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButtonWrapper}>
                            <Image
                                source={IMAGES.ic_Facebook}
                                style={styles.socialIcon}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButtonWrapper}>
                            <Image
                                source={IMAGES.ic_Apple}
                                style={styles.socialIcon}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={navigateToRegister}>
                        <Text style={styles.signUpLink}> Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TermsAndPrivacySheet
                ref={termsRef}
                title="Terms of Service"
                description="By signing up, you agree to our Terms of Service and Privacy Policy. By using this application, you agree to abide by our Terms of Service. You are responsible for providing accurate and up-to-date information and for maintaining the confidentiality of your login credentials. The app must only be used for lawful purposes and must not be tampered with, reverse-engineered, or misused in any way. While we aim to provide continuous service, we cannot guarantee uninterrupted access or that the app will always be free of errors. We may update these terms, features, or the app interface at any time, and your continued use signifies acceptance of any changes. We reserve the right to suspend or terminate your access if we find any violation of our policies. For any questions, feel free to reach out to us at support@yourapp.com."
            />
            <TermsAndPrivacySheet
                ref={privacyRef}
                title="Privacy Policy"
                description='We are committed to protecting your privacy. When you create an account or use the app, we collect certain personal information such as your name, email address, and contact details. We also gather anonymous usage data and device information to help us improve the user experience. Your information is never sold, and is only shared with trusted third-party services that are essential for delivering our features—like payment processing or analytics. We use industry-standard security protocols to store and protect your data. You have full rights to request access to, correction of, or deletion of your personal data by contacting us at privacy@yourapp.com. This policy may be updated occasionally, and any changes will be reflected within the app.'
            />

        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: ResponsivePixels.size24,
        paddingTop: ResponsivePixels.size50,
        backgroundColor: Colors.DefaultWhite,
    },
    header: {},
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
        marginBottom: ResponsivePixels.size20,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    termsText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.NoirBlack,
    },
    termsLink: {
        flex: 1,
        color: Colors.SunburstFlame,
        fontWeight: '500',
    },
    signUpButtonWrapper: {
        marginBottom: ResponsivePixels.size20,
    },
    signUpButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },
    socialSection: {
        alignItems: 'center',
        marginBottom: ResponsivePixels.size20,
    },
    orText: {
        color: Colors.SteelMist,
        fontSize: ResponsivePixels.size14,
        marginBottom: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size10,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: ResponsivePixels.size16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.NoirBlack,
    },
    signUpLink: {
        color: Colors.SunburstFlame,
        fontWeight: '500',
        fontSize: ResponsivePixels.size14,
    },
    orTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        borderTopWidth: 1,
        borderTopColor: Colors.SteelMist,
        flex: 1,
        marginBottom: ResponsivePixels.size15,
    },
    socialButtonWrapper: {
        width: ResponsivePixels.size48,
        height: ResponsivePixels.size48,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.MoonDust,
        backgroundColor: Colors.FrostedHaze,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialIcon: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
    },
    checkbox: {
        borderRadius: 4,
        borderColor: Colors.SunburstFlame,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size10,
        width: 20,
        height: 20,
    },
});

export default Register;
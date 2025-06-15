import React, { useState } from 'react'
import MainContainer from '../common/MainContainer'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Colors } from '../Assets/StyleUtilities/Colors';
import { FloatingTextInput } from '../common/FloatingTextInput';
import { IMAGES } from '../Assets/Images';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <MainContainer statusBarStyle='dark-content' statusBarBackgroundColor={"transparent"}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Login to your account.</Text>
                        <Text style={styles.subtitle}>Please sign in to your account</Text>
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

                        <View style={styles.inputGroup}>
                            <FloatingTextInput
                                label="Password"
                                value={password}
                                onChangeText={setPassword}
                                keyboardType='default'
                                rightIcon={showPassword ? IMAGES.ic_Eye_Off : IMAGES.ic_Eye_On}
                                onPressRightIcon={() => setShowPassword(!showPassword)}
                                secureTextEntry={!showPassword}
                            />
                        </View>

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.signInButton}>
                        <Text style={styles.signInButtonText}>Sign in</Text>
                    </TouchableOpacity>

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
                            Don't have an account?
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.signUpLink}> Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </MainContainer>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    content: {
        flex: 1,
        paddingHorizontal: ResponsivePixels.size24,
        paddingTop: ResponsivePixels.size50,
    },
    header: {
        // marginBottom: ResponsivePixels.size40,
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
        marginTop: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size30,
    },
    inputGroup: {
        marginBottom: ResponsivePixels.size10,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: ResponsivePixels.size8,
    },
    forgotPasswordText: {
        color: Colors.SunburstFlame,
        fontSize: ResponsivePixels.size14,
    },
    signInButton: {
        backgroundColor: Colors.SunburstFlame,
        paddingVertical: ResponsivePixels.size16,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: ResponsivePixels.size30,
    },
    signInButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },
    socialSection: {
        alignItems: 'center',
        marginBottom: ResponsivePixels.size40,
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
    divider: {
        borderTopWidth: 1,
        borderTopColor: Colors.SteelMist,
        flex: 1,
        marginBottom: ResponsivePixels.size15,
    },
    orTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Login

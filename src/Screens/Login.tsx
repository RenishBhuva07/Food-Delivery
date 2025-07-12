import React, { useRef, useState } from 'react'
import MainContainer from '../common/MainContainer'
import { FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Colors } from '../Assets/StyleUtilities/Colors';
import { FloatingTextInput } from '../common/FloatingTextInput';
import { IMAGES } from '../Assets/Images';
import CustomActionSheet from '../common/CustomActionSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { navigate } from '../Navigators/Navigator';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';
import CustomButton from '../common/CustomButton';
import { FORGOT_PIN_OPTIONS } from '../Utils/Constants';

const Login: React.FC = () => {

    const [forgotPinOptions, setForgotPinOptions] = useState([
        {
            id: 1,
            icon: IMAGES.ic_Whatsapp,
            title: "WhatsApp",
            label: "WhatsApp Number",
            forgot_option: FORGOT_PIN_OPTIONS.WHATSAPP,
            forgot_value: "+12 8347 2838 28",
        },
        {
            id: 1,
            icon: IMAGES.ic_Email,
            title: "Email",
            label: "Email Address",
            forgot_option: FORGOT_PIN_OPTIONS.EMAIL,
            forgot_value: "Albertstevano@gmail.com",
        }
    ]),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [showPassword, setShowPassword] = useState(false),
        actionSheetRef = useRef<ActionSheetRef>(null),
        [selectedOption, setSelectedOption] = useState(forgotPinOptions[0]),
        passwordRef = useRef<{ focus: () => void }>(null);

    const navigateToForgotPin = () => {
        actionSheetRef?.current?.hide();
        navigate('ForgotPin', {
            forgotPinOption: selectedOption
        });
    };
    const navigateToRegister = () => navigate('Register');
    const navigateToDashboard = () => navigate('Dashboard');

    const renderForgotPinOptions = ({ item }: any) => (
        <TouchableOpacity
            style={[
                styles.optionCard,
                (selectedOption?.forgot_option === item?.forgot_option) && styles.selectedCard
            ]}
            onPress={() => setSelectedOption(item)}
        >
            <View style={styles.optionContent}>
                <View style={styles.iconContainer}>
                    <Image source={item?.icon} style={styles.actionSheetIconStyle} />
                </View>
                <View style={styles.optionText}>
                    <Text style={[
                        styles.optionLabel,
                        (selectedOption?.forgot_option === item?.forgot_option) && {
                            color: Colors.SunburstFlame,
                        }
                    ]}>{`Send via ${item?.title}`}</Text>
                    <Text style={styles.optionValue}>{item?.forgot_value}</Text>
                </View>
                {(selectedOption?.forgot_option === item?.forgot_option) && (
                    <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );


    return (
        <>
            <MainContainer statusBarStyle='dark-content' statusBarBackgroundColor={Colors.DefaultWhite}>
                <View style={styles.contentWrapper}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Login to your account.</Text>
                        <Text style={styles.subtitle}>Please sign in to your account</Text>
                    </View>

                    <View style={styles.form}>

                        <FloatingTextInput
                            label="Email Address"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            onSubmitEditing={() => passwordRef?.current?.focus()}
                            returnKeyType='next'
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
                            onSubmitEditing={() => Keyboard?.dismiss()}
                        />

                        <TouchableOpacity style={styles.forgotPassword} onPress={() => actionSheetRef?.current?.show()}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signInButtonWrapper}>
                        <CustomButton title="Sign in" onPress={navigateToDashboard} />
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
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={navigateToRegister}>
                            <Text style={styles.signUpLink}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <CustomActionSheet ref={actionSheetRef}>
                    <View style={ActionSheetStyles.actionSheetContent}>
                        <Text style={ActionSheetStyles.actionSheetTitle}>Forgot password?</Text>

                        <Text style={ActionSheetStyles.description}>
                            Select which contact details should we use to reset your password
                        </Text>

                        <View style={styles.optionsContainer}>

                            <FlatList
                                data={forgotPinOptions}
                                renderItem={renderForgotPinOptions}
                                keyExtractor={(item) => item?.id.toString()}
                            />

                        </View>

                        <View style={styles.continueButtonWrapper}>
                            <CustomButton title="Continue" onPress={navigateToForgotPin} />
                        </View>
                    </View>
                </CustomActionSheet>
            </MainContainer>
        </>
    )
}

const styles = StyleSheet.create({
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
        marginTop: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size30,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: ResponsivePixels.size8,
    },
    forgotPasswordText: {
        color: Colors.SunburstFlame,
        fontSize: ResponsivePixels.size14,
    },
    signInButtonWrapper: {
        marginBottom: ResponsivePixels.size30,
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
    optionsContainer: {
        marginBottom: ResponsivePixels.size25,
    },
    optionCard: {
        borderWidth: 1,
        borderColor: Colors.CloudWhisper,
        borderRadius: 16,
        padding: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size16,
        backgroundColor: Colors.DefaultWhite,
    },
    selectedCard: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.SunlitAlmond,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 12,
        backgroundColor: Colors.FrostedLilacMist,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ResponsivePixels.size16,
    },
    optionText: {
        flex: 1,
    },
    optionLabel: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size4,
    },
    optionValue: {
        fontSize: ResponsivePixels.size14,
        color: '#000',
        fontWeight: '500',
    },
    checkmark: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: 50,
        backgroundColor: Colors.SunburstFlame,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size14,
        fontWeight: 'bold',
    },
    continueButtonWrapper: {
        marginBottom: ResponsivePixels.size10,
    },
    continueButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
    },
    bottomIndicator: {
        width: ResponsivePixels.size134,
        height: ResponsivePixels.size5,
        backgroundColor: '#000',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: ResponsivePixels.size20,
    },
    actionSheetIconStyle: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
    }
});

export default Login

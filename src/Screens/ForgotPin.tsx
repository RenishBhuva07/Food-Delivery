import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
} from 'react-native';
import MainContainer from '../common/MainContainer';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Colors } from '../Assets/StyleUtilities/Colors';
import { FloatingTextInput } from '../common/FloatingTextInput';
import CustomButton from '../common/CustomButton';

interface IForgotPinProps {
    route: any;
    forgotPinOption: any;
}

const ForgotPin: React.FC<IForgotPinProps> = (props) => {
    const { forgotPinOption } = props?.route?.params,
        [selectedForgotPinOption, setSelectedForgotPinOption] = useState(forgotPinOption);

    return (
        <MainContainer statusBarStyle='dark-content' statusBarBackgroundColor={Colors.DefaultWhite}>

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
                            label={selectedForgotPinOption?.label}
                            value={selectedForgotPinOption?.forgot_value}
                            onChangeText={setSelectedForgotPinOption}
                            keyboardType="email-address"
                            onSubmitEditing={() => Keyboard?.dismiss()}
                        />

                    </View>
                </View>

            </View>
            <TouchableOpacity style={styles.continueButtonWrapper}>
                <CustomButton title="Continue" onPress={{}} />
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
    continueButtonWrapper: {
        marginHorizontal: ResponsivePixels.size24,
        marginBottom: ResponsivePixels.size24,
    },
    continueButtonText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});

export default ForgotPin;
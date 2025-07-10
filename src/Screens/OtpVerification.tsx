import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    Image,
} from 'react-native';
import MainContainer from '../common/MainContainer';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Colors } from '../Assets/StyleUtilities/Colors';
import CustomButton from '../common/CustomButton';
import { IMAGES } from '../Assets/Images';
import OTPInput from '../common/OTPInputBox';
import { goBack, navigate } from '../Navigators/Navigator';

interface IOtpVerificationProps {
    route: any;
}

const OtpVerification: React.FC<IOtpVerificationProps> = (props) => {
    // const { } = props?.route?.params;
    const [otp, setOtp] = useState(new Array(4).fill("")),
        [timer, setTimer] = useState(180);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        return () => clearInterval(interval)
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    // const handleKeyPress = (key: string) => {
    //     if (key === "backspace") {
    //         const newOtp = [...otp]
    //         for (let i = 3; i >= 0; i--) {
    //             if (newOtp[i] !== "") {
    //                 newOtp[i] = ""
    //                 break
    //             }
    //         }
    //         setOtp(newOtp)
    //     } else {
    //         const newOtp = [...otp]
    //         for (let i = 0; i < 4; i++) {
    //             if (newOtp[i] === "") {
    //                 newOtp[i] = key
    //                 break
    //             }
    //         }
    //         setOtp(newOtp)
    //     }
    // }

    const handleResend = () => {
        if (timer === 0) {
            setTimer(180);
            setOtp(new Array(4).fill(""));
        }
    };

    const handleContinue = () => {
        navigate("ResetPassword")
    };

    return (
        <MainContainer
            statusBarStyle='dark-content'
            statusBarBackgroundColor={Colors.DefaultWhite}

            showHeader
            header={{
                headerTitle: "OTP",
                headerTitleColor: Colors.NoirBlack,
                headerLeft: {
                    icon: IMAGES.ic_Back,
                    onPress: () => goBack(),
                    color: Colors.NoirBlack,
                },
            }}
        >

            <View style={styles.contentWrapper}>
                <View style={styles.header}>
                    <Text style={styles.title}>Email verification</Text>
                    <Text style={styles.subtitle}>
                        Enter the verification code we send you on: Alberts******@gmail.com|
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>

                        <OTPInput otp={otp} setOtp={setOtp} />

                        <View style={styles.resendContainer}>
                            <Text style={styles.resendText}>
                                Didn't receive code? <Text style={styles.resendLink} onPress={handleResend}>Resend</Text>
                            </Text>
                        </View>

                        <View style={styles.timerContainer}>
                            {/* <Ionicons name="time-outline" size={16} color="#666" /> */}
                            <Image
                                source={IMAGES.ic_Timer}
                                style={styles.timerIcon}
                                resizeMode='contain'
                            />
                            <Text style={styles.timerText}>{formatTime(timer)}</Text>
                        </View>

                    </View>
                </View>

            </View>
            <TouchableOpacity style={styles.continueButtonWrapper}>
                <CustomButton title="Continue" onPress={handleContinue} />
            </TouchableOpacity>
        </MainContainer>

    );
};

const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        paddingHorizontal: ResponsivePixels.size24,
        paddingTop: ResponsivePixels.size20,
    },
    header: {
        marginBottom: ResponsivePixels.size40,
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
    resendContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: ResponsivePixels.size40,
    },
    resendText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
    },
    resendLink: {
        color: Colors.SunburstFlame,
        fontWeight: "600",
    },
    timerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    timerText: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
        marginLeft: ResponsivePixels.size5,
        fontWeight: '500',
    },
    timerIcon: {
        width: ResponsivePixels.size16,
        height: ResponsivePixels.size16,
    },
});

export default OtpVerification;
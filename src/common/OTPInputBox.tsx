import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
} from "react-native";
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels";
import { Colors } from "../Assets/StyleUtilities/Colors";

interface OTPInputProps {
    otp: string[];
    setOtp: (otp: string[]) => void;
    otpLength?: number;
}

export default function OTPInput({ otp, setOtp, otpLength = 4 }: OTPInputProps) {
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            inputRef.current?.focus();
        });
        return () => showSubscription.remove();
    }, []);

    const handleChange = (text: string) => {
        const digits = text.replace(/[^0-9]/g, "").split("").slice(0, otpLength);
        const newOtp = [...otp];

        for (let i = 0; i < otpLength; i++) {
            newOtp[i] = digits[i] || "";
        }

        setOtp(newOtp);
    };

    const handlePress = () => {
        inputRef.current?.focus();
    };

    return (
        <TouchableOpacity activeOpacity={1} onPress={handlePress}>
            <View style={styles.container}>
                {otp.map((digit, index) => (
                    <View
                        key={index}
                        style={[
                            styles.digitContainer,
                            digit !== "" && styles.digitContainerFilled,
                        ]}
                    >
                        <Text style={[styles.digit, digit !== "" && styles.digitFilled]}>
                            {digit}
                        </Text>
                    </View>
                ))}

                <TextInput
                    ref={inputRef}
                    style={styles.hiddenInput}
                    keyboardType="number-pad"
                    value={otp.join("")}
                    onChangeText={handleChange}
                    maxLength={otpLength}
                    autoFocus
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: ResponsivePixels.size20,
    },
    digitContainer: {
        width: ResponsivePixels.size65,
        height: ResponsivePixels.size65,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.SoftSilver,
        alignItems: "center",
        justifyContent: "center",
    },
    digitContainerFilled: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.PeachWhisper,
    },
    digit: {
        fontSize: ResponsivePixels.size32,
        fontWeight: "600",
    },
    digitFilled: {
        color: Colors.NoirBlack,
    },
    hiddenInput: {
        position: "absolute",
        width: ResponsivePixels.size1,
        height: ResponsivePixels.size1,
        opacity: 0,
    },
});

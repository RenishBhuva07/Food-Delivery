import { useRef, useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "../Navigators/Navigator";
import MainContainer from "../common/MainContainer";
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels";
import { Colors } from "../Assets/StyleUtilities/Colors";
import { FloatingTextInput } from "../common/FloatingTextInput";
import { IMAGES } from "../Assets/Images";
import CustomButton from "../common/CustomButton";

interface IResetPasswordProps {
    route: any;
}

const ResetPassword: React.FC<IResetPasswordProps> = (props) => {

    const navigation = useNavigation();

    const [newPassword, setNewPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState(""),
        [showNewPassword, setShowNewPassword] = useState(false),
        [showConfirmPassword, setShowConfirmPassword] = useState(false),
        confirmPasswordRef = useRef<{ focus: () => void }>(null);

    const isPasswordValid = newPassword.length >= 8
    const doPasswordsMatch = newPassword === confirmPassword && confirmPassword !== ""

    const handleVerifyAccount = () => {
        if (isPasswordValid && doPasswordsMatch) {
            navigate("Success", {
                title: "Password Changed",
                subtitle: "Password changed successfully, you can login again with a new password",
                buttonText: "Verify account",
            })
        }
    }

    return (
        <MainContainer
            showHeader={true}
            header={{
                headerTitle: "Reset Password",
                headerLeft: {
                    icon: IMAGES.ic_Back,
                    onPress: () => navigation.goBack(),
                    color: "#000",
                },
            }}
        >
            <View style={styles.contentWrapper}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subtitle}>
                        Your new password must be different from the previously used password
                    </Text>
                </View>

                <View style={styles.form}>

                    <FloatingTextInput
                        label="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        keyboardType='default'
                        rightIcon={showNewPassword ? IMAGES.ic_Eye_Off : IMAGES.ic_Eye_On}
                        onPressRightIcon={() => setShowNewPassword(!showNewPassword)}
                        secureTextEntry={!showNewPassword}
                        onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
                        returnKeyType='next'
                    />
                    <Text style={styles.validationText}>Must be at least 8 character</Text>

                    <FloatingTextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        keyboardType='default'
                        rightIcon={showConfirmPassword ? IMAGES.ic_Eye_Off : IMAGES.ic_Eye_On}
                        onPressRightIcon={() => setShowConfirmPassword(!showConfirmPassword)}
                        secureTextEntry={!showConfirmPassword}
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />
                    {confirmPassword !== "" && !doPasswordsMatch && (
                        <Text style={styles.errorText}>Both password must match</Text>
                    )}

                </View>

            </View>
            <View style={styles.continueButtonWrapper}>
                <CustomButton title="Verify Account" onPress={handleVerifyAccount} disabled={!(isPasswordValid && doPasswordsMatch)} />
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
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
    validationText: {
        fontSize: 12,
        color: "#666",
        marginTop: 5,
    },
    errorText: {
        fontSize: 12,
        color: "#FF3B30",
        marginTop: 5,
    },
    continueButtonWrapper: {
        marginHorizontal: ResponsivePixels.size24,
        marginBottom: ResponsivePixels.size24,
    },
})

export default ResetPassword;
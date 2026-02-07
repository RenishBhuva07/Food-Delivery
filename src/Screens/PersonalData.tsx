import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import MainContainer from '../common/MainContainer';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';

import { FloatingTextInput } from '../common/FloatingTextInput';
import CustomButton from '../common/CustomButton';
import { goBack } from '../Navigators/Navigator';

const PersonalData: React.FC = () => {
    const [fullName, setFullName] = useState('Albert Stevano Bajefski');
    const [dob, setDob] = useState('19/06/1999');
    const [gender, setGender] = useState('Male');
    const [phone, setPhone] = useState('+1 325-433-7656');
    const [email, setEmail] = useState('Albertstevano@gmail.com');

    return (
        <MainContainer
            statusBarStyle="dark-content"
            containerBackgroundColor={Colors.DefaultWhite}
            showHeader
            header={{
                headerTitle: "Personal Data",
                headerTitleColor: Colors.NoirBlack,
                headerBackgroundColor: Colors.DefaultWhite,
                headerLeft: {
                    icon: IMAGES.ic_Back,
                    onPress: () => goBack(),
                    color: Colors.NoirBlack,
                }
            }}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        <Image source={IMAGES.user_two} style={styles.avatar} />
                        <TouchableOpacity style={styles.cameraButton}>
                            {/* Using text camera for now to match ProfileScreen style roughly or use an icon if available */}
                            <Text style={styles.cameraIcon}>📷</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <FloatingTextInput
                        label="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                        isRequired={false}
                    />

                    <FloatingTextInput
                        label="Date of birth"
                        value={dob}
                        onChangeText={setDob}
                        isRequired={false}
                    />

                    <FloatingTextInput
                        label="Gender"
                        value={gender}
                        onChangeText={setGender}
                        isRequired={false}
                        // Simulating dropdown look
                        editable={false}
                        rightIcon={IMAGES.ic_down_arrow}
                        onPressRightIcon={() => { }}
                    />

                    <FloatingTextInput
                        label="Phone"
                        value={phone}
                        onChangeText={setPhone}
                        isRequired={false}
                        keyboardType="phone-pad"
                    />

                    <FloatingTextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        isRequired={false}
                        keyboardType="email-address"
                    />
                </View>

                {/* Save Button */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Save"
                        onPress={() => { console.log('Save pressed') }}
                        disableAllCaps={true} // Design shows Title case "Save"
                    />
                </View>

            </ScrollView>
        </MainContainer >
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size20,
    },
    avatarSection: {
        alignItems: 'center',
        marginVertical: ResponsivePixels.size20,
    },
    avatarContainer: {
        position: 'relative',
        width: ResponsivePixels.size100,
        height: ResponsivePixels.size100,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: ResponsivePixels.size50,
        backgroundColor: Colors.CloudWhisper, // Placeholder color
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.SunburstFlame, // Orange color from design
        width: ResponsivePixels.size30,
        height: ResponsivePixels.size30,
        borderRadius: ResponsivePixels.size15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.DefaultWhite,
    },
    cameraIcon: {
        fontSize: ResponsivePixels.size14,
        color: Colors.DefaultWhite,
    },
    formContainer: {
        marginTop: ResponsivePixels.size10,
    },
    buttonContainer: {
        marginTop: ResponsivePixels.size40,
        marginBottom: ResponsivePixels.size20,
    },
});

export default PersonalData;

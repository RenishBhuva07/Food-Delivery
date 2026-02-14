import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, FlatList } from 'react-native';
import CustomActionSheet from '../common/CustomActionSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';
import MainContainer from '../common/MainContainer';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';
import { Camera, ChevronDown, Check } from 'lucide-react-native';
import { FloatingTextInput } from '../common/FloatingTextInput';
import CustomButton from '../common/CustomButton';
import { goBack } from '../Navigators/Navigator';
import { Typography } from '../Theme/Typographys';

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

const PersonalData: React.FC = () => {
    const [fullName, setFullName] = useState('Albert Stevano Bajefski');
    const [dob, setDob] = useState('19/06/1999');
    const [gender, setGender] = useState('Male');
    const [phone, setPhone] = useState('+1 325-433-7656');
    const [email, setEmail] = useState('Albertstevano@gmail.com');
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const handleGenderSelect = (selectedGender: string) => {
        setGender(selectedGender);
        actionSheetRef.current?.hide();
    };

    const renderGenderOption = ({ item }: { item: string }) => {
        const isSelected = item === gender;
        return (
            <TouchableOpacity
                style={[
                    styles.genderOption,
                    isSelected && styles.genderOptionSelected,
                ]}
                onPress={() => handleGenderSelect(item)}
                activeOpacity={0.7}
            >
                <Text style={[
                    styles.genderOptionText,
                    isSelected && styles.genderOptionTextSelected,
                ]}>
                    {item}
                </Text>
                {isSelected && (
                    <Check size={ResponsivePixels.size20} color={Colors.SunburstFlame} />
                )}
            </TouchableOpacity>
        );
    };

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
                            <Camera size={ResponsivePixels.size14} color={Colors.DefaultWhite} />
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

                    {/* Gender Dropdown */}
                    <View style={styles.genderFieldWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => actionSheetRef.current?.show()}
                        >
                            <View pointerEvents="none">
                                <FloatingTextInput
                                    label="Gender"
                                    value={gender}
                                    onChangeText={setGender}
                                    isRequired={false}
                                    editable={false}
                                />
                                <View style={styles.genderDropdownIcon}>
                                    <ChevronDown
                                        size={ResponsivePixels.size20}
                                        color={Colors.Defaultblack}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

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
                    />
                </View>

            </ScrollView>

            {/* Gender Action Sheet */}
            <CustomActionSheet ref={actionSheetRef}>
                <View style={ActionSheetStyles.actionSheetContent}>
                    <Text style={ActionSheetStyles.actionSheetTitle}>Select Gender</Text>
                    <FlatList
                        data={GENDER_OPTIONS}
                        renderItem={renderGenderOption}
                        keyExtractor={(item) => item}
                        ItemSeparatorComponent={() => <View style={styles.genderSeparator} />}
                        scrollEnabled={false}
                    />
                </View>
            </CustomActionSheet>

        </MainContainer >
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: ResponsivePixels.size12,
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
        backgroundColor: Colors.CloudWhisper,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.SunburstFlame,
        width: ResponsivePixels.size30,
        height: ResponsivePixels.size30,
        borderRadius: ResponsivePixels.size15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.DefaultWhite,
    },
    formContainer: {
        marginTop: ResponsivePixels.size10,
    },
    genderFieldWrapper: {
        position: 'relative',
    },
    genderDropdownIcon: {
        position: 'absolute',
        right: ResponsivePixels.size14,
        bottom: ResponsivePixels.size25,
        zIndex: 10,
    },
    buttonContainer: {
        marginTop: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size10,
    },


    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: ResponsivePixels.size16,
        paddingHorizontal: ResponsivePixels.size16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.CloudWhisper,
    },
    genderOptionSelected: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.SunburstFlameFaded,
    },
    genderOptionText: {
        ...Typography.bodyMediumMedium,
        color: Colors.NoirBlack,
    },
    genderOptionTextSelected: {
        color: Colors.SunburstFlame,
        ...Typography.bodyMediumSemiBold,
    },
    genderSeparator: {
        height: ResponsivePixels.size10,
    },
});

export default PersonalData;


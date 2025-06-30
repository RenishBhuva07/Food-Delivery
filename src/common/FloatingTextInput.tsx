import React, { forwardRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    ViewStyle,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
    Image,
    ImageProps,
} from 'react-native';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';

type IFloatingTextInputProps = {
    label: string;
    containerStyle?: ViewStyle;
    isRequired?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    editable?: boolean;
    secureTextEntry?: boolean;
    maxLength?: number;
    keyboardType?: TextInputProps['keyboardType'];
    multiline?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
    returnKeyType?: TextInputProps['returnKeyType'];
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    error?: string;
    showError?: boolean;
    autoCapitalize?: TextInputProps['autoCapitalize'];
    autoCorrect?: TextInputProps['autoCorrect'];
    onPressRightIcon?: () => void;
    rightIcon?: ImageProps['source'] | null;
    inputMode?: TextInputProps['inputMode'];
    returnKeyLabel?: string;
    autoFocus?: boolean;
    rightIconStyle?: ImageProps['style'];
    rightIconContainerStyle?: ViewStyle;
    blurOnSubmit?: boolean;
};

export const FloatingTextInput = forwardRef<TextInput, IFloatingTextInputProps>(
    (
        {
            label,
            isRequired = true,
            value,
            onChangeText,
            editable = true,
            secureTextEntry = false,
            maxLength,
            keyboardType = 'default',
            multiline = false,
            onFocus,
            onBlur,
            onSubmitEditing,
            returnKeyType,
            containerStyle,
            inputStyle,
            labelStyle,
            error,
            showError = false,
            autoCapitalize = 'none',
            autoCorrect = false,
            onPressRightIcon,
            rightIcon = null,
            inputMode,
            returnKeyLabel,
            autoFocus = false,
            rightIconStyle,
            rightIconContainerStyle,
            blurOnSubmit = false,
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState<boolean>(false);

        if (value && value !== "") {
            if (!isFocused) {
                setIsFocused(true);
            }
        }
        const handleFocus = () => {
            setIsFocused(true);
            if (onFocus) {
                onFocus();
            }
        };
        const handleBlur = () => {
            setIsFocused(false);
            if (onBlur) {
                onBlur();
            }
        };

        return (
            <View style={[
                containerStyle,
                {
                    marginTop: ResponsivePixels.size35,
                    marginBottom: ResponsivePixels.size10,
                }
            ]}>
                <View style={{
                    position: "relative",
                }}>
                    <Text style={[
                        {
                            position: "absolute",
                            top: !isFocused ? '32%' : "-50%",
                            // top: ResponsivePixels.size16 + (ResponsivePixels.size14 / 8),
                            left: !isFocused ? ResponsivePixels.size16 : 0,

                            fontSize: ResponsivePixels.size14,
                            color: !isFocused ? Colors.Defaultblack : Colors.SunburstFlame,
                        },
                        labelStyle
                    ]}>
                        {label} {isRequired ? '*' : ''}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <TextInput
                            ref={ref}
                            value={value}
                            onChangeText={onChangeText}
                            editable={editable}
                            secureTextEntry={secureTextEntry}
                            maxLength={maxLength}
                            keyboardType={keyboardType}
                            multiline={multiline}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onSubmitEditing={onSubmitEditing}
                            returnKeyType={returnKeyType}
                            style={[
                                {
                                    flex: 1,
                                    padding: ResponsivePixels.size16,
                                    fontSize: ResponsivePixels.size14,
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    borderColor: showError ? Colors.DefaultRedColor : isFocused ? Colors.SunburstFlame : Colors.Defaultblack,
                                },
                                inputStyle,
                            ]}
                            autoCapitalize={autoCapitalize}
                            autoCorrect={autoCorrect}
                            selectionColor={Colors.SunburstFlame}
                            cursorColor={Colors.SunburstFlame}
                            inputMode={inputMode}
                            returnKeyLabel={returnKeyLabel}
                            autoFocus={autoFocus}
                            blurOnSubmit={blurOnSubmit}
                        />
                    </View>
                    {rightIcon && rightIcon !== null ? (
                        <View
                            style={[
                                rightIconContainerStyle,
                                {
                                    position: 'absolute',
                                    right: ResponsivePixels.size10,
                                    top: ResponsivePixels.size14,
                                    zIndex: 10,
                                }]}
                            onTouchEnd={() => {
                                isFocused && onPressRightIcon && onPressRightIcon();
                            }}
                        >
                            <Image source={rightIcon} style={[
                                rightIconStyle,
                                {
                                    height: ResponsivePixels.size25,
                                    width: ResponsivePixels.size25,
                                },
                                isFocused && { tintColor: Colors.SunburstFlame }
                            ]} />
                        </View>
                    ) : null}
                </View>

                {showError && error ? (
                    <Text style={{ color: Colors.DefaultRedColor, marginTop: ResponsivePixels.size4, fontSize: ResponsivePixels.size12 }}>{error}</Text>
                ) : null}
            </View>
        );
    }
);

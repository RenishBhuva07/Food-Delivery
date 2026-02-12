import React, { useRef } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, View } from 'react-native';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import * as LucideIcons from 'lucide-react-native';
import { Typography } from '../Theme/Typographys';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    bordered?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    buttonTextStyle?: TextStyle;
    disableAllCaps?: boolean;
    debouncePress?: boolean;
    icon?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    bordered = false,
    disabled = false,
    style,
    buttonTextStyle,
    disableAllCaps = false,
    debouncePress = true,
    icon,
}) => {

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleDebouncedPress = async () => {
        if (timeoutRef.current) return;

        onPress();
        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
        }, 3000);
    };

    const handlePress = debouncePress ? handleDebouncedPress : onPress;

    const containerStyles: ViewStyle = {
        backgroundColor: bordered ? 'transparent' : Colors.SunburstFlame,
        borderWidth: bordered ? 1 : 0,
        borderColor: bordered ? Colors.SunburstFlame : 'transparent',
        borderRadius: ResponsivePixels.size50,
        height: ResponsivePixels.size48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        opacity: disabled ? 0.5 : 1,
        ...style,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    };

    const TypographyStyle: TextStyle = {
        color: bordered ? Colors.SunburstFlame : Colors.DefaultWhite,
        // fontSize: ResponsivePixels.size16,
        // fontWeight: '700',
        textTransform: disableAllCaps ? 'none' : 'uppercase',
        ...buttonTextStyle,
        ...Typography.h6Bold,
    };

    const iconName = icon === 'Cart' ? 'ShoppingCart' : icon;
    const IconComponent = iconName ? (LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType) : null;
    const iconColor = bordered ? Colors.SunburstFlame : Colors.DefaultWhite;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={disabled ? undefined : handlePress}
            style={containerStyles}
            disabled={disabled}
        >
            {IconComponent && (
                <View style={{ marginRight: ResponsivePixels.size10 }}>
                    <IconComponent color={iconColor} size={ResponsivePixels.size20} strokeWidth={2.7} />
                </View>
            )}
            <Text style={TypographyStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

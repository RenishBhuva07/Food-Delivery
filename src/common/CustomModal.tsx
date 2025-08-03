import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    BackHandler,
    StatusBar,
    ViewStyle,
} from 'react-native';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { themes } from '../Assets/StyleUtilities/CommonStyleSheets/theme';
import { Colors } from '../Assets/StyleUtilities/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface CustomModalRef {
    show: () => void;
    hide: () => void;
}

export interface ModalButton {
    text: string;
    onPress: () => void;
    style?: 'primary' | 'secondary' | 'danger' | 'success' | 'custom';
    customStyle?: object;
    textStyle?: object;
    disabled?: boolean;
    loading?: boolean;
}

export interface CustomModalProps {
    title?: string;
    message?: string;
    buttons?: ModalButton[];
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
    closeOnBackPress?: boolean;
    animationType?: 'fade' | 'slide' | 'scale';
    backdropOpacity?: number;
    modalStyle?: object;
    titleStyle?: object;
    messageStyle?: object;
    customContent?: React.ReactNode;
    onShow?: () => void;
    onHide?: () => void;
    buttonLayout?: 'horizontal' | 'vertical';
    maxWidth?: number;
    position?: 'center' | 'top' | 'bottom';
}

const CustomModal = forwardRef<CustomModalRef, CustomModalProps>(
    (
        {
            title,
            message,
            buttons = [],
            showCloseButton = true,
            closeOnBackdrop = true,
            closeOnBackPress = true,
            animationType = 'scale',
            backdropOpacity = 0.5,
            modalStyle,
            titleStyle,
            messageStyle,
            customContent,
            onShow,
            onHide,
            buttonLayout = 'horizontal',
            maxWidth = screenWidth * 0.85,
            position = 'center',
        },
        ref
    ) => {
        const [visible, setVisible] = useState(false);
        const [animatedValue] = useState(new Animated.Value(0));
        const [backdropAnimated] = useState(new Animated.Value(0));

        useImperativeHandle(ref, () => ({
            show: () => showModal(),
            hide: () => hideModal(),
        }));

        useEffect(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                if (visible && closeOnBackPress) {
                    hideModal();
                    return true;
                }
                return false;
            });

            return () => backHandler.remove();
        }, [visible, closeOnBackPress]);

        const showModal = () => {
            setVisible(true);
            onShow?.();

            // Animate backdrop
            Animated.timing(backdropAnimated, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Animate modal based on type
            const animations = {
                fade: Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                slide: Animated.spring(animatedValue, {
                    toValue: 1,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }),
                scale: Animated.spring(animatedValue, {
                    toValue: 1,
                    tension: 100,
                    friction: 7,
                    useNativeDriver: true,
                }),
            };

            animations[animationType].start();
        };

        const hideModal = () => {
            // Animate out
            const animations = {
                fade: Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
                slide: Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
                scale: Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
            };

            Animated.parallel([
                animations[animationType],
                Animated.timing(backdropAnimated, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setVisible(false);
                onHide?.();
            });
        };

        const handleBackdropPress = () => {
            if (closeOnBackdrop) {
                hideModal();
            }
        };

        const getModalTransform = () => {
            switch (animationType) {
                case 'fade':
                    return {
                        opacity: animatedValue,
                        transform: [],
                    };
                case 'slide':
                    const translateY = animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [screenHeight, 0],
                    });
                    return [{ translateY }];
                case 'scale':
                    const scale = animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                    });
                    const opacity = animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    });
                    return [{ scale }, { opacity }];
                default:
                    return [];
            }
        };

        const getPositionStyle = (): ViewStyle => {
            switch (position) {
                case 'top':
                    return { justifyContent: 'flex-start', paddingTop: ResponsivePixels.size100 };
                case 'bottom':
                    return { justifyContent: 'flex-end', paddingBottom: ResponsivePixels.size50 };
                default:
                    return { justifyContent: 'center' };
            }
        };

        const getModalAnimationStyle = () => {
            switch (animationType) {
                case 'fade':
                    return {
                        opacity: animatedValue,
                    };
                case 'slide':
                    return {
                        transform: [
                            {
                                translateY: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [screenHeight, 0],
                                }),
                            },
                        ],
                    };
                case 'scale':
                    return {
                        transform: [
                            {
                                scale: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.3, 1],
                                }),
                            },
                        ],
                        opacity: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                        }),
                    };
                default:
                    return {};
            }
        };

        const getButtonStyle = (buttonStyle: string) => {
            const baseStyle = {
                flex: buttonLayout === 'horizontal' ? 1 : 0,
                paddingVertical: ResponsivePixels.size14,
                paddingHorizontal: ResponsivePixels.size20,
                borderRadius: 70,
                alignItems: 'center' as const,
                justifyContent: 'center' as const,
                minHeight: ResponsivePixels.size48,
            };

            switch (buttonStyle) {
                case 'primary':
                    return {
                        ...baseStyle,
                        backgroundColor: Colors.SunburstFlame,
                    };
                case 'secondary':
                    return {
                        ...baseStyle,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                    };
                case 'danger':
                    return {
                        ...baseStyle,
                        backgroundColor: '#FF4444',
                    };
                case 'success':
                    return {
                        ...baseStyle,
                        backgroundColor: '#4CAF50',
                    };
                default:
                    return {
                        ...baseStyle,
                        backgroundColor: '#F5F5F5',
                    };
            }
        };

        const getButtonTextStyle = (buttonStyle: string) => {
            const baseStyle = {
                fontSize: ResponsivePixels.size16,
                fontWeight: '600' as const,
            };

            switch (buttonStyle) {
                case 'primary':
                case 'danger':
                case 'success':
                    return {
                        ...baseStyle,
                        color: Colors.DefaultWhite,
                    };
                case 'secondary':
                    return {
                        ...baseStyle,
                        color: '#666666',
                    };
                default:
                    return {
                        ...baseStyle,
                        color: '#333333',
                    };
            }
        };

        const renderButtons = () => {
            if (buttons.length === 0) return null;

            return (
                <View style={[
                    styles.buttonContainer,
                    buttonLayout === 'vertical' && styles.verticalButtonContainer
                ]}>
                    {buttons.map((button, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={button.onPress}
                            disabled={button.disabled || button.loading}
                            style={[
                                getButtonStyle(button.style || 'secondary'),
                                button.customStyle,
                                button.disabled && styles.disabledButton,
                                buttonLayout === 'horizontal' && index > 0 && { marginLeft: ResponsivePixels.size12 },
                                buttonLayout === 'vertical' && index > 0 && { marginTop: ResponsivePixels.size12 },
                            ]}
                        >
                            {button.loading ? (
                                <Text style={[getButtonTextStyle(button.style || 'secondary'), button.textStyle]}>
                                    Loading...
                                </Text>
                            ) : (
                                <Text style={[getButtonTextStyle(button.style || 'secondary'), button.textStyle]}>
                                    {button.text}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            );
        };

        return (
            <Modal
                visible={visible}
                transparent
                animationType="none"
                statusBarTranslucent
                onRequestClose={hideModal}
            >
                {/* <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" /> */}

                {/* Backdrop */}
                <Animated.View
                    style={[
                        styles.backdrop,
                        {
                            opacity: backdropAnimated.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, backdropOpacity],
                            }),
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.backdropTouchable}
                        activeOpacity={1}
                        onPress={handleBackdropPress}
                    />
                </Animated.View>

                {/* Modal Container */}
                <View style={[styles.container, getPositionStyle()]}>
                    <Animated.View
                        style={[
                            styles.modal,
                            { maxWidth },
                            getModalAnimationStyle(),
                            modalStyle,
                        ]}
                    >
                        {/* Close Button */}
                        {showCloseButton && (
                            <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                        )}

                        {/* Title */}
                        {title && (
                            <Text style={[styles.title, titleStyle]}>{title}</Text>
                        )}

                        {/* Message */}
                        {message && (
                            <Text style={[styles.message, messageStyle]}>{message}</Text>
                        )}

                        {/* Custom Content */}
                        {customContent && (
                            <View style={styles.customContent}>{customContent}</View>
                        )}

                        {/* Buttons */}
                        {renderButtons()}
                    </Animated.View>
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backdropTouchable: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // paddingHorizontal: ResponsivePixels.size20,
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size24,
        position: 'relative',
        width: "100%",
        ...themes.shadows.high
    },
    closeButton: {
        position: 'absolute',
        top: ResponsivePixels.size16,
        right: ResponsivePixels.size16,
        width: ResponsivePixels.size32,
        height: ResponsivePixels.size32,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: ResponsivePixels.size24,
        color: '#666666',
        fontWeight: '300',
    },
    title: {
        fontSize: ResponsivePixels.size20,
        fontWeight: '600',
        color: '#333333',
        textAlign: 'center',
        marginBottom: ResponsivePixels.size16,
        paddingRight: ResponsivePixels.size32,
    },
    message: {
        fontSize: ResponsivePixels.size14,
        color: '#666666',
        textAlign: 'center',
        lineHeight: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size24,
    },
    customContent: {
        marginBottom: ResponsivePixels.size24,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: ResponsivePixels.size12,
    },
    verticalButtonContainer: {
        flexDirection: 'column',
    },
    disabledButton: {
        opacity: 0.5,
    },
});

export default CustomModal;
import React from 'react';
import { ColorValue, Keyboard, KeyboardAvoidingView, Platform, StatusBar, StatusBarStyle, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../Assets/StyleUtilities/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './CustomHeader';

interface HeaderOption {
    icon?: string
    onPress?: () => void
    color?: string
}
interface CustomHeaderProps {
    headerTitle?: string
    headerTitleColor?: string
    headerBackgroundColor?: string
    headerLeft?: HeaderOption
    headerRight?: HeaderOption
}
interface IMainContainerProps {
    children: any;
    statusBarStyle?: StatusBarStyle;
    statusBarBackgroundColor?: ColorValue;
    statusBarHidden?: boolean;
    keyboardVerticalOffset?: number;
    containerBackgroundColor?: string;
    translucent?: boolean;

    // Header props
    showHeader?: boolean
    header?: CustomHeaderProps;
}

const MainContainer = (props: IMainContainerProps) => {

    const {
        children,
        statusBarStyle = "light-content",
        statusBarBackgroundColor = 'transparent',
        statusBarHidden = false,
        keyboardVerticalOffset = 0,
        containerBackgroundColor = Colors.DefaultWhite,
        translucent = false,

        // Header props
        showHeader = false,
        header = {},
    } = props;

    return (
        <TouchableWithoutFeedback onPress={Keyboard?.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>

                <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBackgroundColor} hidden={statusBarHidden} translucent={translucent} />

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >

                    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
                        <View style={{ flex: 1, backgroundColor: containerBackgroundColor }}>

                            <CustomHeader showHeader={showHeader} {...header} />

                            <View style={{ flex: 1 }}>{children}</View>

                        </View>
                    </SafeAreaView>

                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default MainContainer;
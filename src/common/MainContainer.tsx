import React from 'react';
import { ColorValue, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StatusBarStyle, TouchableWithoutFeedback, View } from 'react-native';

interface IMainContainerProps {
    children: any;
    statusBarStyle?: StatusBarStyle;
    statusBarBackgroundColor?: ColorValue;
    statusBarHidden?: boolean;
    keyboardVerticalOffset?: number;
}

const MainContainer = (props: IMainContainerProps) => {

    const {
        children,
        statusBarStyle = "light-content",
        statusBarBackgroundColor = 'transparent',
        statusBarHidden = false,
        keyboardVerticalOffset = 0,
    } = props;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle={statusBarStyle}
                    backgroundColor={statusBarBackgroundColor}
                    hidden={statusBarHidden}
                />
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            {children}
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default MainContainer;
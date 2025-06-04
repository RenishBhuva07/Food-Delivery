import React from 'react';
import { ColorValue, SafeAreaView, StatusBar, StatusBarStyle, Text, View } from 'react-native';

interface IMainContainerProps {
    children: any;
    statusBarStyle?: StatusBarStyle;
    statusBarBackgroundColor?: ColorValue;
    statusBarHidden?: boolean;
}

const MainContainer = (props: IMainContainerProps) => {

    const {
        children,
        statusBarStyle = "light-content",
        statusBarBackgroundColor = 'transparent',
        statusBarHidden = false,
    } = props;

    return (
        <>
            <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBackgroundColor} hidden={statusBarHidden} />
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{ flex: 1 }}
                >
                    {children}
                </View>
            </SafeAreaView>
        </ >
    )
}

export default MainContainer;
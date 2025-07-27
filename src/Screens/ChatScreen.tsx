import type React from "react"
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TextInput, TouchableOpacity, Platform } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import MainContainer from "../common/MainContainer"
import { IMAGES } from "../Assets/Images"
import CustomHeader from "../common/CustomHeader"
import { goBack } from "../Navigators/Navigator"
import { useRef, useState } from "react"

const ScreenWidth = Dimensions.get('window').width;

interface IChatScreenProps {
    route: any;
    chatDetails: any;
}

type Message = { id: string; text: string; isMe: boolean };

const ChatScreen: React.FC<IChatScreenProps> = (props) => {
    const { chatDetails } = props?.route?.params,
        [messages, setMessages] = useState<{ id: string; text: string }[]>([]),
        [entry, setEntry] = useState<string>(''),
        flatListRef = useRef<FlatList>(null),

        onSend = () => {
            if (entry.trim() === '') return;
            setMessages(prev => [
                ...prev,
                { id: Date.now().toString(), text: entry.trim(), isMe: true }
            ]);
            setEntry('');
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 200);
        },

        renderMessage = ({ item }: { item: Message }) => (
            <View
                style={item.isMe
                    ? styles.yourMessageContainer
                    : styles.oppositeMessageContainer
                }
            >
                <Text
                    style={item.isMe
                        ? styles.yourMessageText
                        : styles.oppositeMessageText
                    }
                >
                    {item.text}
                </Text>
            </View>
        );


    return (
        <MainContainer
            statusBarStyle="dark-content"
            statusBarBackgroundColor="transparent"
            containerBackgroundColor={Colors.SunburstFlameLight}
            translucent={true}
        >
            <ImageBackground
                source={IMAGES.bg_pattern}
                resizeMode="cover"
                style={styles.heroImageBackground}
            >
                <View style={styles.container}>

                    <CustomHeader
                        showHeader={true}
                        headerTitle={chatDetails?.name}
                        headerLeft={{
                            icon: IMAGES.ic_Back,
                            onPress: () => goBack(),
                        }}
                        headerRight={{
                            icon: IMAGES.ic_Back,
                            onPress: () => goBack(),
                        }}
                    />

                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                            paddingBottom: ResponsivePixels.size20,
                            gap: 8,
                        }}
                    />

                    <View style={styles.inputArea}>
                        <TextInput
                            style={styles.textInput}
                            value={entry}
                            onChangeText={setEntry}
                            placeholder="Type a message..."
                            placeholderTextColor={Colors.SteelMist}
                            multiline={true}
                        />
                        <TouchableOpacity onPress={onSend} style={styles.sendButton} activeOpacity={0.8}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heroImageBackground: {
        flex: 1,
        width: ScreenWidth,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    yourMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.SunburstFlame,
        borderTopStartRadius: 18,
        borderTopEndRadius: 18,
        borderBottomStartRadius: 18,
        marginRight: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size8,
        paddingHorizontal: ResponsivePixels.size16,
        maxWidth: '80%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    yourMessageText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
    },
    oppositeMessageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.MoonDust,
        borderTopStartRadius: 18,
        borderTopEndRadius: 18,
        borderBottomEndRadius: 18,
        marginLeft: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size8,
        paddingHorizontal: ResponsivePixels.size16,
        maxWidth: '80%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    oppositeMessageText: {
        color: Colors.NoirBlack,
        fontSize: ResponsivePixels.size16,
    },
    // Input area styles
    inputAreaWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: ResponsivePixels.size12,
        gap: ResponsivePixels.size10,
        marginBottom: ResponsivePixels.size20,
    },
    textInput: {
        flex: 1,
        fontSize: ResponsivePixels.size15,
        color: Colors.NoirBlack,
        // minHeight: ResponsivePixels.size40,
        maxHeight: ResponsivePixels.size80,
        borderColor: Colors.SteelMist,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: ResponsivePixels.size10,
        paddingTop: ResponsivePixels.size14,
        paddingBottom: ResponsivePixels.size14,
        // paddingVertical: ResponsivePixels.size16,
        textAlignVertical: 'top',
    },
    sendButton: {
        backgroundColor: Colors.SunburstFlame,
        padding: ResponsivePixels.size16,
        borderRadius: 8,
    },
    sendButtonText: {
        color: Colors.DefaultWhite,
        fontWeight: '600',
    },
})

export default ChatScreen;
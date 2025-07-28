import type React from "react"
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TextInput, TouchableOpacity, Platform, Image } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import MainContainer from "../common/MainContainer"
import { IMAGES } from "../Assets/Images"
import CustomHeader from "../common/CustomHeader"
import { goBack } from "../Navigators/Navigator"
import { useRef, useState } from "react"
import { themes } from "../Assets/StyleUtilities/CommonStyleSheets/theme"

const ScreenWidth = Dimensions.get('window').width;

interface IChatScreenProps {
    route: any;
    chatDetails: any;
}

type Message = { id: string; text: string; isMe: boolean; time: string; profilePic?: any; };

const ChatScreen: React.FC<IChatScreenProps> = (props) => {
    const { chatDetails } = props?.route?.params,
        fakeChat = [
            { id: '1', text: 'Hello!', isMe: false, time: '12:00 PM', profilePic: chatDetails?.avatar },
            { id: '2', text: 'Hi there!', isMe: true, time: '12:01 PM' },
            { id: '1', text: 'Just to order', isMe: false, time: '12:02 PM', profilePic: chatDetails?.avatar },
            { id: '2', text: 'Okay, for what level of spiciness?', isMe: true, time: '12:03 PM' },
            { id: '1', text: 'Okay, Wait a minute 🙏', isMe: false, time: '12:04 PM', profilePic: chatDetails?.avatar },
            { id: '2', text: 'Okay, I’m waiting 🙌', isMe: true, time: '12:05 PM' },
        ],
        [messages, setMessages] = useState<Message[]>(fakeChat),
        [entry, setEntry] = useState<string>(''),
        [isChatScrolled, setChatIsScrolled] = useState(false),
        flatListRef = useRef<FlatList>(null),

        onSend = () => {
            if (entry.trim() === '') return;
            setMessages(prev => [
                ...prev,
                { id: Date.now().toString(), text: entry.trim(), isMe: true, time: '12:00 PM', profilePic: IMAGES.user_two }
            ]);
            setEntry('');
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 200);
        },

        renderMessage = ({ item }: { item: Message }) => {
            if (item?.isMe) {
                return (
                    <View style={styles.yourMessageContainer}>
                        <Text style={styles.yourMessageText}>{item?.text}</Text>
                        <View style={{ flexDirection: "row", gap: 10, justifyContent: "flex-end" }}>
                            <Text style={styles.myMessageTime}>{item?.time}</Text>
                            <Image source={IMAGES.ic_Double_Tick} style={{ width: ResponsivePixels.size20, height: ResponsivePixels.size20, tintColor: Colors.NoirBlack }} />
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.oppositeMessageWrapper}>
                        <Image
                            source={item.profilePic}
                            style={styles.oppositeProfilePic}
                            resizeMode="cover"
                        />
                        <View style={styles.oppositeMessageContainer}>
                            <Text style={styles.oppositeMessageText}>{item?.text}</Text>
                            <Text style={styles.messageTime}>{item?.time}</Text>
                        </View>
                    </View>
                );
            }
        },

        handleChatScroll = (event: { nativeEvent: { contentOffset: { y: any } } }) => {
            const y = event.nativeEvent.contentOffset.y;
            setChatIsScrolled(y > 0);
        };


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
                        headerBackgroundColor={isChatScrolled ? Colors.SunburstFlame : "transparent"}
                    />

                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'flex-start',
                            paddingBottom: ResponsivePixels.size20,
                            paddingHorizontal: ResponsivePixels.size10,
                            gap: 8,
                        }}
                        showsVerticalScrollIndicator={false}
                        onScroll={handleChatScroll}
                    />

                    <View style={styles.inputArea}>
                        <TextInput
                            style={styles.textInput}
                            value={entry}
                            onChangeText={setEntry}
                            placeholder="Type a message..."
                            placeholderTextColor={Colors.SteelMist}
                            multiline={true}
                            autoFocus={true}
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
        // marginRight: ResponsivePixels.size16,
        paddingTop: ResponsivePixels.size8,
        paddingBottom: ResponsivePixels.size2,
        paddingHorizontal: ResponsivePixels.size16,
        maxWidth: '80%',
        ...themes.shadows.light,
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
        marginLeft: ResponsivePixels.size8,
        paddingTop: ResponsivePixels.size8,
        paddingBottom: ResponsivePixels.size2,
        paddingHorizontal: ResponsivePixels.size16,
        maxWidth: '80%',
        ...themes.shadows.light,
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
        borderColor: Colors.SilverHaze,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: ResponsivePixels.size10,
        paddingTop: ResponsivePixels.size14,
        paddingBottom: ResponsivePixels.size14,
        // paddingVertical: ResponsivePixels.size16,
        textAlignVertical: 'top',
        ...themes.shadows.light,
        backgroundColor: Colors.DefaultWhite
    },
    sendButton: {
        backgroundColor: Colors.SunburstFlame,
        padding: ResponsivePixels.size16,
        borderRadius: 8,
        ...themes.shadows.light
    },
    sendButtonText: {
        color: Colors.DefaultWhite,
        fontWeight: '600',
    },
    oppositeMessageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        maxWidth: '80%',
    },
    oppositeProfilePic: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 15,
    },
    messageTime: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
        textAlign: 'left',
    },
    myMessageTime: {
        fontSize: ResponsivePixels.size12,
        color: Colors.NoirBlack,
        textAlign: 'right',
    }
})

export default ChatScreen;
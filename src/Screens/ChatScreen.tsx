import type React from "react"
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TextInput, TouchableOpacity, Platform, Image } from "react-native"
import { Smile, Paperclip, Send } from "lucide-react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import MainContainer from "../common/MainContainer"
import { IMAGES } from "../Assets/Images"
import CustomHeader from "../common/CustomHeader"
import { goBack } from "../Navigators/Navigator"
import { useRef, useState } from "react"
import { themes } from "../Assets/StyleUtilities/CommonStyleSheets/theme"
import { Typography } from "../Theme/Typographys"

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

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
        [isFocused, setIsFocused] = useState(false),
        flatListRef = useRef<FlatList>(null),
        ignoreNextChangeRef = useRef(false),

        handleOnChangeText = (text: string) => {
            if (ignoreNextChangeRef.current) {
                ignoreNextChangeRef.current = false;
                return;
            }
            setEntry(text);
        },

        onSend = () => {
            if (entry.trim() === '') return;
            setMessages(prev => [
                ...prev,
                { id: Date.now().toString(), text: entry.trim(), isMe: true, time: '12:00 PM', profilePic: IMAGES.user_two }
            ]);
            setEntry('');
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 50);
        },

        renderMessage = ({ item }: { item: Message }) => {
            if (item?.isMe) {
                return (
                    <TouchableOpacity style={styles.yourMessageContainer} activeOpacity={1}>
                        <Text style={styles.yourMessageText}>{item?.text}</Text>
                        <View style={{ flexDirection: "row", gap: 10, justifyContent: "flex-end" }}>
                            <Text style={styles.myMessageTime}>{item?.time}</Text>
                            <Image source={IMAGES.ic_Double_Tick} style={{ width: ResponsivePixels.size20, height: ResponsivePixels.size20, tintColor: Colors.NoirBlack }} />
                        </View>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity style={styles.oppositeMessageWrapper} activeOpacity={1}>
                        <Image
                            source={item.profilePic}
                            style={styles.oppositeProfilePic}
                            resizeMode="cover"
                        />
                        <View style={styles.oppositeMessageContainer}>
                            <Text style={styles.oppositeMessageText}>{item?.text}</Text>
                            <Text style={styles.messageTime}>{item?.time}</Text>
                        </View>
                    </TouchableOpacity>
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
            <View style={styles.container}>
                <Image
                    source={IMAGES.bg_pattern}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                />

                <View style={styles.contentContainer}>
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
                        scrollEnabled
                    />

                    <View style={[styles.inputArea, { paddingBottom: isFocused ? ResponsivePixels.size10 : ResponsivePixels.size20 }]}>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Smile size={ResponsivePixels.size20} color={Colors.SteelMist} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.textInput}
                                value={entry}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChangeText={handleOnChangeText}
                                placeholder="Type something..."
                                placeholderTextColor={Colors.SteelMist}
                                multiline={true}
                                onKeyPress={(e: any) => {
                                    if (e.nativeEvent.key === 'Enter') {
                                        e.preventDefault();
                                        ignoreNextChangeRef.current = true;
                                        onSend();
                                        setTimeout(() => { ignoreNextChangeRef.current = false; }, 50);
                                    }
                                }}
                            />
                            <TouchableOpacity style={styles.iconButton}>
                                <Paperclip size={ResponsivePixels.size20} color={Colors.SteelMist} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={onSend} style={styles.sendButton} activeOpacity={0.8}>
                            <Send size={ResponsivePixels.size20} color={Colors.DefaultWhite} fill={Colors.DefaultWhite} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: ScreenWidth,
        height: ScreenHeight,
        zIndex: -1,
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
        ...Typography.bodyMediumMedium,
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
        ...Typography.bodyMediumMedium,
    },
    // Input area styles
    inputAreaWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    inputArea: { // Modified
        flexDirection: 'row',
        alignItems: 'flex-end', // Align bottom to handle multiline growth better or center if we want fixed height
        paddingHorizontal: ResponsivePixels.size10, // Match other screens usually
        gap: ResponsivePixels.size10,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21,
        paddingTop: ResponsivePixels.size10,
    },
    inputContainer: { // New
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.DefaultWhite,
        borderColor: Colors.SilverHaze,
        borderWidth: 1,
        borderRadius: 12,
        ...themes.shadows.light,
        paddingHorizontal: ResponsivePixels.size8,
        minHeight: ResponsivePixels.size50,
    },
    textInput: { // Modified
        flex: 1,
        color: Colors.NoirBlack,
        maxHeight: ResponsivePixels.size80,
        paddingHorizontal: ResponsivePixels.size10,
        paddingTop: ResponsivePixels.size14,
        paddingBottom: ResponsivePixels.size14,
        textAlignVertical: 'center', // Changed to center for single line appearance usually, but 'top' if multiline
        ...Typography.bodyMediumMedium,
    },
    iconButton: { // New
        padding: ResponsivePixels.size4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton: { // Modified
        backgroundColor: Colors.SunburstFlame,
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        ...themes.shadows.light
    },
    sendButtonText: { // Keeping just in case, though unused
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
        color: Colors.SteelMist,
        textAlign: 'left',
        ...Typography.bodySuperSmallMedium,
    },
    myMessageTime: {
        color: Colors.NoirBlack,
        textAlign: 'right',
        ...Typography.bodySuperSmallMedium,
    }
})

export default ChatScreen;
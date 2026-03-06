import type React from "react"
import { View, Text, StyleSheet, FlatList, Dimensions, TextInput, TouchableOpacity, Platform, Image, Animated, Keyboard, ScrollView, Alert } from "react-native"
import { Smile, Paperclip, Send, Camera, Image as ImageIcon, FileText, Headphones, MapPin, User, X, Mic } from "lucide-react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import MainContainer from "../common/MainContainer"
import { IMAGES } from "../Assets/Images"
import CustomHeader from "../common/CustomHeader"
import { goBack } from "../Navigators/Navigator"
import { useCallback, useEffect, useRef, useState } from "react"
import { themes } from "../Assets/StyleUtilities/CommonStyleSheets/theme"
import { Typography } from "../Theme/Typographys"
import CustomActionSheet from "../common/CustomActionSheet"
import { ActionSheetRef } from "react-native-actions-sheet"

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const EMOJI_PANEL_HEIGHT = 280;

// ── Emoji Data ──────────────────────────────────────────────────────────────
const EMOJI_CATEGORIES = [
    {
        key: 'smileys',
        label: '😀',
        emojis: [
            '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
            '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
            '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫',
            '🤔', '🫡', '🤐', '🤨', '😐', '😑', '😶', '🫥', '😏', '😒',
            '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒',
            '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠',
            '🥳', '🥸', '😎', '🤓', '🧐', '😕', '🫤', '😟', '🙁', '😮',
            '😯', '😲', '😳', '🥺', '🥹', '😦', '😧', '😨', '😰', '😥',
        ],
    },
    {
        key: 'gestures',
        label: '👋',
        emojis: [
            '👋', '🤚', '🖐️', '✋', '🖖', '🫱', '🫲', '🫳', '🫴', '👌',
            '🤌', '🤏', '✌️', '🤞', '🫰', '🤟', '🤘', '🤙', '👈', '👉',
            '👆', '🖕', '👇', '☝️', '🫵', '👍', '👎', '✊', '👊', '🤛',
            '🤜', '👏', '🙌', '🫶', '👐', '🤲', '🤝', '🙏', '💪', '🦾',
            '🦿', '🦵', '🦶', '👂', '🦻', '👃', '👀', '👁️', '👅', '👄',
        ],
    },
    {
        key: 'animals',
        label: '🐶',
        emojis: [
            '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨',
            '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
            '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
            '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞',
            '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢',
        ],
    },
    {
        key: 'food',
        label: '🍔',
        emojis: [
            '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐',
            '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑',
            '🥦', '🥬', '🥒', '🌶️', '🫑', '🥕', '🧄', '🧅', '🥔', '🍠',
            '🫘', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈',
            '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕',
        ],
    },
    {
        key: 'travel',
        label: '✈️',
        emojis: [
            '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐',
            '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🛹', '🛼',
            '🚁', '🛩️', '✈️', '🛫', '🛬', '🪂', '💺', '🚀', '🛸', '🚂',
            '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚝', '🚞',
            '⛵', '🚤', '🛥️', '🛳️', '⛴️', '🚢', '⚓', '🪝', '⛽', '🚧',
        ],
    },
    {
        key: 'objects',
        label: '💡',
        emojis: [
            '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️',
            '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️',
            '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭',
            '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🪫', '🔌',
            '💡', '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸', '💵', '💴', '💶',
        ],
    },
    {
        key: 'symbols',
        label: '❤️',
        emojis: [
            '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
            '❤️‍🔥', '❤️‍🩹', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝',
            '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️',
            '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎',
            '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️',
        ],
    },
];

// ── Attachment Options ──────────────────────────────────────────────────────
const ATTACHMENT_OPTIONS = [
    { key: 'document', label: 'Document', icon: FileText, bgColor: '#7C5CFC' },
    { key: 'camera', label: 'Camera', icon: Camera, bgColor: '#FF2D55' },
    { key: 'gallery', label: 'Gallery', icon: ImageIcon, bgColor: '#C850C0' },
    { key: 'audio', label: 'Audio', icon: Headphones, bgColor: '#FF9500' },
    { key: 'location', label: 'Location', icon: MapPin, bgColor: '#30D158' },
    { key: 'contact', label: 'Contact', icon: User, bgColor: '#007AFF' },
];

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
            { id: '2', text: "Okay, I'm waiting 🙌", isMe: true, time: '12:05 PM' },
        ],
        [messages, setMessages] = useState<Message[]>(fakeChat),
        [entry, setEntry] = useState<string>(''),
        [isChatScrolled, setChatIsScrolled] = useState(false),
        [isFocused, setIsFocused] = useState(false),
        [showEmojiPicker, setShowEmojiPicker] = useState(false),
        [activeEmojiCategory, setActiveEmojiCategory] = useState('smileys'),
        flatListRef = useRef<FlatList>(null),
        ignoreNextChangeRef = useRef(false),
        textInputRef = useRef<TextInput>(null),
        attachmentSheetRef = useRef<ActionSheetRef>(null),
        emojiPanelAnim = useRef(new Animated.Value(0)).current;

    // ── Emoji panel animation ────────────────────────────────────────────
    useEffect(() => {
        Animated.spring(emojiPanelAnim, {
            toValue: showEmojiPicker ? 1 : 0,
            useNativeDriver: false,
            friction: 10,
            tension: 65,
        }).start();
    }, [showEmojiPicker]);

    const emojiPanelHeight = emojiPanelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, EMOJI_PANEL_HEIGHT],
    });

    const toggleEmojiPicker = useCallback(() => {
        if (showEmojiPicker) {
            setShowEmojiPicker(false);
            textInputRef.current?.focus();
        } else {
            Keyboard.dismiss();
            setTimeout(() => setShowEmojiPicker(true), 100);
        }
    }, [showEmojiPicker]);

    const onEmojiPress = useCallback((emoji: string) => {
        setEntry(prev => prev + emoji);
    }, []);

    const openAttachmentSheet = useCallback(() => {
        Keyboard.dismiss();
        setShowEmojiPicker(false);
        setTimeout(() => {
            attachmentSheetRef.current?.show();
        }, 100);
    }, []);

    const onAttachmentOptionPress = useCallback((key: string) => {
        attachmentSheetRef.current?.hide();
        Alert.alert(`${key.charAt(0).toUpperCase() + key.slice(1)}`, `${key.charAt(0).toUpperCase() + key.slice(1)} feature coming soon!`);
    }, []);

    const handleOnChangeText = (text: string) => {
        if (ignoreNextChangeRef.current) {
            ignoreNextChangeRef.current = false;
            return;
        }
        setEntry(text);
    };

    const onSend = () => {
        if (entry.trim() === '') return;
        setMessages(prev => [
            ...prev,
            { id: Date.now().toString(), text: entry.trim(), isMe: true, time: '12:00 PM', profilePic: IMAGES.user_two }
        ]);
        setEntry('');
        setShowEmojiPicker(false);
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
        if (showEmojiPicker) setShowEmojiPicker(false);
    };

    const renderMessage = ({ item }: { item: Message }) => {
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
    };

    const handleChatScroll = (event: { nativeEvent: { contentOffset: { y: any } } }) => {
        const y = event.nativeEvent.contentOffset.y;
        setChatIsScrolled(y > 0);
    };

    // ── Active emojis for current tab ────────────────────────────────────
    const activeEmojis = EMOJI_CATEGORIES.find(c => c.key === activeEmojiCategory)?.emojis ?? [];

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
                        keyExtractor={(item, index) => item.id + index.toString()}
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

                    {/* ── Input Area ──────────────────────────────────────── */}
                    <View style={[styles.inputArea, { paddingBottom: isFocused && !showEmojiPicker ? ResponsivePixels.size10 : ResponsivePixels.size0 }]}>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={styles.iconButton} onPress={toggleEmojiPicker} activeOpacity={0.6}>
                                {showEmojiPicker ? (
                                    <X size={ResponsivePixels.size22} color={Colors.SunburstFlame} />
                                ) : (
                                    <Smile size={ResponsivePixels.size22} color={Colors.SteelMist} />
                                )}
                            </TouchableOpacity>
                            <TextInput
                                ref={textInputRef}
                                style={styles.textInput}
                                value={entry}
                                onFocus={handleInputFocus}
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
                            <TouchableOpacity style={styles.iconButton} onPress={openAttachmentSheet} activeOpacity={0.6}>
                                <Paperclip size={ResponsivePixels.size22} color={Colors.SteelMist} />
                            </TouchableOpacity>
                            {entry.trim() === '' && (
                                <TouchableOpacity style={[styles.iconButton, { marginLeft: -2 }]} activeOpacity={0.6}
                                    onPress={() => Alert.alert('Voice', 'Voice message coming soon!')}>
                                    <Mic size={ResponsivePixels.size22} color={Colors.SteelMist} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <TouchableOpacity onPress={onSend} style={styles.sendButton} activeOpacity={0.8}>
                            <Send size={ResponsivePixels.size20} color={Colors.DefaultWhite} fill={Colors.DefaultWhite} />
                        </TouchableOpacity>
                    </View>

                    {/* ── Emoji Picker Panel ──────────────────────────────── */}
                    <Animated.View style={[styles.emojiPanel, { height: emojiPanelHeight }]}>
                        {/* Category Tabs */}
                        <View style={styles.emojiCategoryBar}>
                            {EMOJI_CATEGORIES.map(cat => (
                                <TouchableOpacity
                                    key={cat.key}
                                    style={[
                                        styles.emojiCategoryTab,
                                        activeEmojiCategory === cat.key && styles.emojiCategoryTabActive,
                                    ]}
                                    onPress={() => setActiveEmojiCategory(cat.key)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.emojiCategoryLabel}>{cat.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Emoji Grid */}
                        <FlatList
                            data={activeEmojis}
                            keyExtractor={(item, index) => item + index}
                            numColumns={8}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.emojiGridContent}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.emojiItem}
                                    onPress={() => onEmojiPress(item)}
                                    activeOpacity={0.5}
                                >
                                    <Text style={styles.emojiText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </Animated.View>

                </View>
            </View>

            {/* ── Attachment Action Sheet ─────────────────────────────────── */}
            <CustomActionSheet ref={attachmentSheetRef}>
                <Text style={styles.attachmentTitle}>Share</Text>
                <View style={styles.attachmentGrid}>
                    {ATTACHMENT_OPTIONS.map(opt => {
                        const IconComp = opt.icon;
                        return (
                            <TouchableOpacity
                                key={opt.key}
                                style={styles.attachmentOption}
                                onPress={() => onAttachmentOptionPress(opt.key)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.attachmentIconCircle, { backgroundColor: opt.bgColor }]}>
                                    <IconComp size={ResponsivePixels.size24} color={Colors.DefaultWhite} />
                                </View>
                                <Text style={styles.attachmentLabel}>{opt.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </CustomActionSheet>
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
    inputArea: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: ResponsivePixels.size10,
        gap: ResponsivePixels.size10,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21,
        paddingTop: ResponsivePixels.size10,
    },
    inputContainer: {
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
    textInput: {
        flex: 1,
        color: Colors.NoirBlack,
        maxHeight: ResponsivePixels.size80,
        paddingHorizontal: ResponsivePixels.size10,
        paddingTop: ResponsivePixels.size14,
        paddingBottom: ResponsivePixels.size14,
        textAlignVertical: 'center',
        ...Typography.bodyMediumMedium,
    },
    iconButton: {
        padding: ResponsivePixels.size4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton: {
        backgroundColor: Colors.SunburstFlame,
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        ...themes.shadows.light
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
    },
    // ── Emoji Panel Styles ───────────────────────────────────────────────
    emojiPanel: {
        backgroundColor: Colors.DefaultWhite,
        overflow: 'hidden',
        borderTopWidth: 1,
        borderTopColor: Colors.SoftSilver,
    },
    emojiCategoryBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.SoftSilver,
        backgroundColor: Colors.FrostedHaze,
    },
    emojiCategoryTab: {
        paddingHorizontal: ResponsivePixels.size8,
        paddingVertical: ResponsivePixels.size4,
        borderRadius: 8,
    },
    emojiCategoryTabActive: {
        backgroundColor: Colors.SunburstFlameFaded,
        borderBottomWidth: 2,
        borderBottomColor: Colors.SunburstFlame,
    },
    emojiCategoryLabel: {
        fontSize: 20,
    },
    emojiGridContent: {
        paddingHorizontal: ResponsivePixels.size4,
        paddingVertical: ResponsivePixels.size8,
    },
    emojiItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: ResponsivePixels.size6,
    },
    emojiText: {
        fontSize: 26,
    },
    // ── Attachment Sheet Styles ───────────────────────────────────────────
    attachmentTitle: {
        color: Colors.NoirBlack,
        textAlign: 'center',
        marginBottom: ResponsivePixels.size20,
        ...Typography.bodyLargeBold,
    },
    attachmentGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        rowGap: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size10,
    },
    attachmentOption: {
        alignItems: 'center',
        width: (ScreenWidth - 80) / 3,
    },
    attachmentIconCircle: {
        width: ResponsivePixels.size56,
        height: ResponsivePixels.size56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: ResponsivePixels.size8,
        ...themes.shadows.light,
    },
    attachmentLabel: {
        color: Colors.SteelMist,
        ...Typography.bodySmallMedium,
    },
})

export default ChatScreen;
import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, Dimensions } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import MainContainer from "../common/MainContainer"
import { IMAGES } from "../Assets/Images"
import { navigate } from "../Navigators/Navigator"
import { Typography } from "../Theme/Typographys"

const ScreenWidth = Dimensions.get('window').width;

const ChatListScreen: React.FC = () => {
    const [chatList] = useState([
        {
            id: 1,
            name: "Geopart Etdsien",
            message: "Your Order Just Arrived!",
            time: "13.47",
            avatar: IMAGES.user_one,
            unreadCount: 0,
            isRead: true,
        },
        {
            id: 2,
            name: "Stevano Clirover",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: IMAGES.user_two,
            unreadCount: 3,
            isRead: false,
        },
        {
            id: 3,
            name: "Elisia Justin",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: IMAGES.user_three,
            unreadCount: 0,
            isRead: true,
        },
        {
            id: 4,
            name: "Geopart Etdsien",
            message: "Your Order Just Arrived!",
            time: "13.47",
            avatar: IMAGES.user_one,
            unreadCount: 0,
            isRead: true,
        },
        {
            id: 5,
            name: "Stevano Clirover",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: IMAGES.user_two,
            unreadCount: 3,
            isRead: false,
        },
        {
            id: 6,
            name: "Elisia Justin",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: IMAGES.user_three,
            unreadCount: 0,
            isRead: true,
        },
        {
            id: 7,
            name: "Elisia Justin",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: IMAGES.user_one,
            unreadCount: 0,
            isRead: true,
        },
        {
            id: 8,
            name: "Elisia Justin",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: IMAGES.user_two,
            unreadCount: 0,
            isRead: true,
        },
        {
            id: 7,
            name: "Elisia Justin",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: IMAGES.user_three,
            unreadCount: 0,
            isRead: true,
        },
    ]),
        navigateToChat = (item: any) => {
            navigate("ChatScreen", { chatDetails: item })
        };

    const renderChatItem = ({ item }: any) => (
        <TouchableOpacity style={styles.chatItem} activeOpacity={0.7} onPress={() => navigateToChat(item)}>
            <Image source={item.avatar} style={styles.avatar} />

            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.messageRow}>
                    <Text style={styles.message}>{item.message}</Text>
                    {item.isRead && <Image source={IMAGES.ic_Double_Tick} style={{ width: ResponsivePixels.size24, height: ResponsivePixels.size24 }} />}
                    {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <MainContainer
            statusBarStyle="dark-content"
            statusBarBackgroundColor="transparent"
            containerBackgroundColor={Colors.SunburstFlameLight}
            translucent={true}
        >
            <View style={styles.container}>


                {/* Section Title */}
                <ImageBackground
                    source={IMAGES.bg_pattern}
                    resizeMode="cover"
                    style={styles.heroImageBackground}
                >

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Chat List</Text>
                    </View>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>All Message</Text>
                    </View>

                    {/* Chat List */}
                    <FlatList
                        data={chatList}
                        renderItem={renderChatItem}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.chatList}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.chatListContent}
                    />

                </ImageBackground>
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heroImageBackground: {
        width: ScreenWidth,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    header: {
        alignItems: "center",
        // paddingVertical: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size65,
        paddingHorizontal: ResponsivePixels.size24,
    },
    title: {
        color: Colors.NoirBlack,
        textAlign: 'center',
        ...Typography.h6Bold,
    },
    sectionHeader: {
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size16,
    },
    sectionTitle: {
        color: Colors.NoirBlack,
        ...Typography.bodyLargeSemiBold,
    },
    chatList: {
        // flex: 1,
    },
    chatListContent: {
        paddingHorizontal: ResponsivePixels.size12,
        paddingBottom: ResponsivePixels.size100,
        gap: ResponsivePixels.size12,
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: ResponsivePixels.size16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.CloudWhisper,

        backgroundColor: Colors.DefaultWhite,
        borderRadius: 16,
        padding: ResponsivePixels.size12,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    avatar: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size25,
        marginRight: ResponsivePixels.size16,
    },
    chatContent: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: ResponsivePixels.size4,
    },
    name: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    time: {
        color: Colors.SteelMist,
        ...Typography.bodySmallMedium,
    },
    messageRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    message: {
        color: Colors.SteelMist,
        flex: 1,
        ...Typography.bodySmallMedium,
    },
    readIndicator: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SunburstFlame,
        marginLeft: ResponsivePixels.size8,
    },
    unreadBadge: {
        backgroundColor: Colors.SunburstFlame,
        borderRadius: ResponsivePixels.size10,
        minWidth: ResponsivePixels.size16,
        height: ResponsivePixels.size16,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: ResponsivePixels.size8,
    },
    unreadCount: {
        color: Colors.DefaultWhite,
        ...Typography.bodySuperSmallMedium,
    },
})

export default ChatListScreen;
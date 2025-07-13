import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import MainContainer from "../common/MainContainer"

const ChatListScreen: React.FC = () => {
    const [chatList] = useState([
        {
            id: 1,
            name: "Geopart Etdsien",
            message: "Your Order Just Arrived!",
            time: "13.47",
            avatar: "/placeholder.svg?height=50&width=50",
            unreadCount: 0,
            isRead: true,
        },
        {
            id: 2,
            name: "Stevano Clirover",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: "/placeholder.svg?height=50&width=50",
            unreadCount: 3,
            isRead: false,
        },
        {
            id: 3,
            name: "Elisia Justin",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: "/placeholder.svg?height=50&width=50",
            unreadCount: 0,
            isRead: false,
        },
        {
            id: 4,
            name: "Geopart Etdsien",
            message: "Your Order Just Arrived!",
            time: "13.47",
            avatar: "/placeholder.svg?height=50&width=50",
            unreadCount: 0,
            isRead: true,
        },
        {
            id: 5,
            name: "Stevano Clirover",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: "/placeholder.svg?height=50&width=50",
            unreadCount: 3,
            isRead: false,
        },
        {
            id: 6,
            name: "Elisia Justin",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: "/placeholder.svg?height=50&width=50",
            unreadCount: 0,
            isRead: false,
        },
        {
            id: 7,
            name: "Elisia Justin",
            message: "Your Order Just Arrived!",
            time: "11.23",
            avatar: "/placeholder.svg?height=50&width=50",
            unreadCount: 0,
            isRead: false,
        },
    ])

    const renderChatItem = ({ item }: any) => (
        <TouchableOpacity style={styles.chatItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.messageRow}>
                    <Text style={styles.message}>{item.message}</Text>
                    {item.isRead && <Text style={styles.readIndicator}>✓✓</Text>}
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
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Chat List</Text>
                </View>

                {/* Section Title */}
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
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    header: {
        alignItems: "center",
        paddingVertical: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size24,
    },
    title: {
        fontSize: ResponsivePixels.size24,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    sectionHeader: {
        paddingHorizontal: ResponsivePixels.size24,
        paddingVertical: ResponsivePixels.size16,
    },
    sectionTitle: {
        fontSize: ResponsivePixels.size20,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    chatList: {
        flex: 1,
    },
    chatListContent: {
        paddingHorizontal: ResponsivePixels.size24,
        paddingBottom: ResponsivePixels.size100,
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: ResponsivePixels.size16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.CloudWhisper,
    },
    avatar: {
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size50,
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
        fontSize: ResponsivePixels.size16,
        fontWeight: "600",
        color: Colors.NoirBlack,
    },
    time: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SteelMist,
    },
    messageRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    message: {
        fontSize: ResponsivePixels.size14,
        color: Colors.SteelMist,
        flex: 1,
    },
    readIndicator: {
        fontSize: ResponsivePixels.size12,
        color: Colors.SunburstFlame,
        marginLeft: ResponsivePixels.size8,
    },
    unreadBadge: {
        backgroundColor: Colors.SunburstFlame,
        borderRadius: ResponsivePixels.size10,
        minWidth: ResponsivePixels.size20,
        height: ResponsivePixels.size20,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: ResponsivePixels.size8,
    },
    unreadCount: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size12,
        fontWeight: "600",
    },
})

export default ChatListScreen

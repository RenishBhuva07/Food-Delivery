import type React from "react"
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions } from "react-native"
import { Colors } from "../Assets/StyleUtilities/Colors"
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels"
import MainContainer from "../common/MainContainer"
import { IMAGES } from "../Assets/Images"

const ScreenWidth = Dimensions.get('window').width;

const ChatScreen: React.FC = () => {

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
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
        color: Colors.NoirBlack,
        textAlign: 'center',
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
})

export default ChatScreen;
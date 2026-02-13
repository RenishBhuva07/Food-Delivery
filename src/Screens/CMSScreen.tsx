import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import MainContainer from '../common/MainContainer';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../Theme/Typographys';
import { IMAGES } from '../Assets/Images';
import { goBack } from '../Navigators/Navigator';

interface CMSSection {
    heading?: string;
    body: string;
}

type CMSRouteParams = {
    CMSScreen: {
        title: string;
        sections: CMSSection[];
        lastUpdated?: string;
    };
};

const CMSScreen: React.FC = () => {
    const route = useRoute<RouteProp<CMSRouteParams, 'CMSScreen'>>();
    const { title, sections, lastUpdated } = route.params;

    // Transform sections into SectionList-compatible format
    const sectionData = sections.map((section) => ({
        heading: section.heading,
        data: [section.body],
    }));

    const renderSectionHeader = ({ section }: { section: { heading?: string } }) => {
        if (!section.heading) return null;
        return (
            <Text style={styles.sectionHeading}>
                {section.heading}
            </Text>
        );
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.section}>
            <Text style={styles.sectionBody}>{item}</Text>
        </View>
    );

    const renderListHeader = () => {
        if (!lastUpdated) return null;
        return (
            <View style={styles.updatedBadge}>
                <Text style={styles.updatedText}>
                    Last updated: {lastUpdated}
                </Text>
            </View>
        );
    };

    const renderListFooter = () => <View style={styles.bottomSpacing} />;

    return (
        <MainContainer
            statusBarStyle="dark-content"
            containerBackgroundColor={Colors.DefaultWhite}
            showHeader
            header={{
                headerTitle: title,
                headerTitleColor: Colors.NoirBlack,
                headerBackgroundColor: Colors.DefaultWhite,
                headerLeft: {
                    icon: IMAGES.ic_Back,
                    onPress: () => goBack(),
                    color: Colors.NoirBlack,
                },
            }}
        >
            <SectionList
                sections={sectionData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                ListHeaderComponent={renderListHeader}
                ListFooterComponent={renderListFooter}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
                scrollEnabled
            />
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size16,
    },
    updatedBadge: {
        backgroundColor: Colors.FrostedHaze,
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: ResponsivePixels.size20,
    },
    updatedText: {
        color: Colors.SteelMist,
        ...Typography.bodySmallMedium,
    },
    section: {
        marginBottom: ResponsivePixels.size24,
    },
    sectionHeading: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size8,
        ...Typography.bodyLargeSemiBold,
    },
    sectionBody: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumRegular,
        lineHeight: 22,
    },
    bottomSpacing: {
        height: ResponsivePixels.size40,
    },
});

export default CMSScreen;

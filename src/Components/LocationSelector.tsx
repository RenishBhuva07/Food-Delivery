import React, { useCallback, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Animated,
} from 'react-native';
import { MapPin, ChevronDown, Check, Navigation } from 'lucide-react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../Theme/Typographys';
import CustomActionSheet from '../common/CustomActionSheet';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';

export type LocationItem = {
    id: string;
    name: string;
    subtitle: string;
    distance: string;
};

const LOCATIONS: LocationItem[] = [
    { id: '1', name: 'New York City', subtitle: '5th Avenue, Manhattan', distance: '0 km' },
    { id: '2', name: 'Brooklyn', subtitle: 'Atlantic Avenue, Brooklyn', distance: '12 km' },
    { id: '3', name: 'Los Angeles', subtitle: 'Sunset Blvd, Hollywood', distance: '45 km' },
    { id: '4', name: 'Chicago', subtitle: 'Michigan Avenue, Downtown', distance: '30 km' },
    { id: '5', name: 'San Francisco', subtitle: 'Market Street, SOMA', distance: '58 km' },
    { id: '6', name: 'Miami', subtitle: 'Ocean Drive, South Beach', distance: '22 km' },
];

type LocationSelectorProps = {
    onLocationChange?: (location: LocationItem) => void;
};

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationChange }) => {
    const [selectedLocation, setSelectedLocation] = useState<LocationItem>(LOCATIONS[0]);
    const [arrowRotation] = useState(new Animated.Value(0));

    const locationSheetRef = useRef<ActionSheetRef>(null);
    const animatedValues = useRef(LOCATIONS.map(() => new Animated.Value(0))).current;

    const openLocationSheet = useCallback(() => {
        // Reset animations
        animatedValues.forEach(val => val.setValue(0));
        // Rotate arrow up
        Animated.spring(arrowRotation, {
            toValue: 1,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
        }).start();
        locationSheetRef.current?.show();
        // Staggered entrance animation for items
        const staggerAnimations = animatedValues.map((anim, index) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 300,
                delay: index * 60,
                useNativeDriver: true,
            })
        );
        Animated.stagger(60, staggerAnimations).start();
    }, [animatedValues, arrowRotation]);

    const closeLocationSheet = useCallback(() => {
        // Rotate arrow back down
        Animated.spring(arrowRotation, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
        }).start();
    }, [arrowRotation]);

    const handleLocationSelect = useCallback((location: LocationItem) => {
        setSelectedLocation(location);
        onLocationChange?.(location);
        locationSheetRef.current?.hide();
        closeLocationSheet();
    }, [closeLocationSheet, onLocationChange]);

    const arrowRotateInterpolation = arrowRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const renderLocationItem = useCallback(({ item, index }: { item: LocationItem; index: number }) => {
        const isSelected = item.id === selectedLocation.id;
        const animatedStyle = {
            opacity: animatedValues[index],
            transform: [
                {
                    translateY: animatedValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                    }),
                },
                {
                    scale: animatedValues[index].interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.95, 1.02, 1],
                    }),
                },
            ],
        };

        return (
            <Animated.View style={animatedStyle}>
                <TouchableOpacity
                    style={[
                        styles.locationOption,
                        isSelected && styles.locationOptionSelected,
                    ]}
                    onPress={() => handleLocationSelect(item)}
                    activeOpacity={0.7}
                >
                    <View style={[
                        styles.locationIconWrapper,
                        isSelected && styles.locationIconWrapperSelected,
                    ]}>
                        <MapPin
                            size={ResponsivePixels.size20}
                            color={isSelected ? Colors.DefaultWhite : Colors.SunburstFlame}
                        />
                    </View>
                    <View style={styles.locationOptionInfo}>
                        <Text style={[
                            styles.locationOptionName,
                            isSelected && styles.locationOptionNameSelected,
                        ]}>
                            {item.name}
                        </Text>
                        <Text style={[
                            styles.locationOptionSubtitle,
                            isSelected && styles.locationOptionSubtitleSelected,
                        ]}>
                            {item.subtitle}
                        </Text>
                    </View>
                    <View style={styles.locationOptionRight}>
                        {isSelected ? (
                            <View style={styles.checkCircle}>
                                <Check size={ResponsivePixels.size14} color={Colors.DefaultWhite} />
                            </View>
                        ) : (
                            <Text style={styles.locationDistance}>{item.distance}</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    }, [selectedLocation, animatedValues, handleLocationSelect]);

    return (
        <>
            {/* Trigger: Location display in the header */}
            <TouchableOpacity
                style={styles.locationContainer}
                activeOpacity={0.7}
                onPress={openLocationSheet}
            >
                <View style={[styles.locationRow, { gap: ResponsivePixels.size8 }]}>
                    <Text style={styles.locationLabel}>Your Location</Text>
                    <Animated.View style={{ transform: [{ rotate: arrowRotateInterpolation }] }}>
                        <ChevronDown
                            size={ResponsivePixels.size16}
                            color={Colors.DefaultWhite}
                            strokeWidth={2.5}
                        />
                    </Animated.View>
                </View>
                <View style={[styles.locationRow, { gap: ResponsivePixels.size8 }]}>
                    <Navigation
                        size={ResponsivePixels.size20}
                        color={Colors.DefaultWhite}
                        fill={Colors.DefaultWhite}
                    />
                    <Text style={styles.locationText} numberOfLines={1}>
                        {selectedLocation.name}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Location Selection ActionSheet */}
            <CustomActionSheet ref={locationSheetRef} onClose={closeLocationSheet}>
                <View style={ActionSheetStyles.actionSheetContent}>
                    <View style={styles.sheetHeader}>
                        <View style={styles.sheetTitleRow}>
                            <MapPin size={ResponsivePixels.size24} color={Colors.SunburstFlame} />
                            <Text style={ActionSheetStyles.actionSheetTitle}>Select Location</Text>
                        </View>
                        <Text style={styles.sheetSubtitle}>Choose your delivery area</Text>
                    </View>
                    <FlatList
                        data={LOCATIONS}
                        renderItem={renderLocationItem}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={styles.locationSeparator} />}
                        scrollEnabled={false}
                    />
                </View>
            </CustomActionSheet>
        </>
    );
};

export default LocationSelector;

const styles = StyleSheet.create({
    // Trigger styles
    locationContainer: {
        flex: 1,
        gap: ResponsivePixels.size5,
    },
    locationLabel: {
        color: Colors.DefaultWhite,
        marginBottom: ResponsivePixels.size4,
        ...Typography.bodyMediumRegular,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        color: Colors.DefaultWhite,
        marginRight: ResponsivePixels.size8,
        ...Typography.bodyMediumSemiBold,
    },

    // ActionSheet styles
    sheetHeader: {
        marginBottom: ResponsivePixels.size16,
    },
    sheetTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size10,
    },
    sheetSubtitle: {
        color: Colors.SteelMist,
        marginTop: ResponsivePixels.size4,
        marginLeft: ResponsivePixels.size34 || 34,
        ...Typography.bodySmallRegular,
    },
    locationOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size14,
        paddingHorizontal: ResponsivePixels.size14,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: Colors.CloudWhisper,
        backgroundColor: Colors.DefaultWhite,
    },
    locationOptionSelected: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.SunburstFlameFaded,
    },
    locationIconWrapper: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 12,
        backgroundColor: Colors.SunburstFlameFaded,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size12,
    },
    locationIconWrapperSelected: {
        backgroundColor: Colors.SunburstFlame,
    },
    locationOptionInfo: {
        flex: 1,
    },
    locationOptionName: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    locationOptionNameSelected: {
        color: Colors.SunburstFlame,
    },
    locationOptionSubtitle: {
        color: Colors.SteelMist,
        marginTop: 2,
        ...Typography.bodySmallRegular,
    },
    locationOptionSubtitleSelected: {
        color: Colors.SunburstFlame,
    },
    locationOptionRight: {
        marginLeft: ResponsivePixels.size8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkCircle: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: 12,
        backgroundColor: Colors.SunburstFlame,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationDistance: {
        color: Colors.SteelMist,
        ...Typography.bodySmallMedium,
    },
    locationSeparator: {
        height: ResponsivePixels.size10,
    },
});

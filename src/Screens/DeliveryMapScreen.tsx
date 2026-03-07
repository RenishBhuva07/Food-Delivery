import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StatusBar,
    Platform,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { goBack } from '../Navigators/Navigator';
import { IMAGES } from '../Assets/Images';
import {
    ChevronLeft,
    HelpCircle,
    MapPin,
    MessageCircle,
    Phone,
    ClipboardList,
    UtensilsCrossed,
    Bike,
    Check,
} from 'lucide-react-native';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../Theme/Typographys';

const { width, height } = Dimensions.get('window');

// Route coordinates for the delivery path
const routeCoordinates = [
    { latitude: 37.7349, longitude: -122.4694 }, // Start - User location
    { latitude: 37.738, longitude: -122.465 },
    { latitude: 37.742, longitude: -122.46 },
    { latitude: 37.745, longitude: -122.458 }, // Restaurant
    { latitude: 37.75, longitude: -122.455 },
    { latitude: 37.755, longitude: -122.45 }, // Destination
];

const DeliveryMapScreen: React.FC = ({ route }: any) => {
    const insets = useSafeAreaInsets();
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const order = route?.params?.order;
    const initialRegion = {
        latitude: 37.745,
        longitude: -122.458,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <StatusBar barStyle="dark-content" />

            {/* Map Section */}
            <View style={styles.mapContainer}>
                {!isMapLoaded && (
                    <Image
                        source={IMAGES.Map}
                        style={styles.mapPlaceholder}
                        resizeMode="cover"
                    />
                )}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={[styles.map, !isMapLoaded && styles.mapHidden]}
                    initialRegion={initialRegion}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    onMapReady={() => setIsMapLoaded(true)}
                >
                    {/* Delivery Route Polyline */}
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#F97316"
                        strokeWidth={4}
                        lineDashPattern={[1]}
                    />

                    {/* User Location Marker */}
                    <Marker coordinate={routeCoordinates[0]}>
                        <View style={styles.userMarker}>
                            <View style={styles.userMarkerInner} />
                        </View>
                    </Marker>

                    {/* Restaurant Marker */}
                    <Marker coordinate={routeCoordinates[3]}>
                        <View style={styles.restaurantMarker}>
                            <UtensilsCrossed size={20} color={Colors.DefaultWhite} strokeWidth={2} />
                        </View>
                    </Marker>

                    {/* Destination Marker */}
                    <Marker coordinate={routeCoordinates[5]}>
                        <View style={styles.destinationMarker}>
                            <View style={styles.destinationPin} />
                            <View style={styles.destinationPinTail} />
                        </View>
                    </Marker>
                </MapView>

                {/* Header */}
                <View style={[styles.header, { top: insets.top + (Platform.OS === 'ios' ? 10 : 24) }]}>
                    <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                        <ChevronLeft size={24} color={Colors.DefaultWhite} strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Delivered your order</Text>
                </View>

                {/* Help Button */}
                <TouchableOpacity style={styles.helpButton}>
                    <HelpCircle size={24} color={Colors.SteelMist} strokeWidth={2} />
                </TouchableOpacity>

                {/* Location Button */}
                <TouchableOpacity style={styles.locationButton}>
                    <MapPin size={24} color={Colors.NoirBlack} strokeWidth={2} />
                </TouchableOpacity>
            </View>

            {/* Bottom Sheet */}
            <View style={[styles.bottomSheet, { paddingBottom: insets.bottom }]}>

                <View style={styles.topWrapper}>
                    {/* Handle */}
                    <View style={styles.handleContainer}>
                        <View style={styles.handle} />
                    </View>

                    {/* Driver Card */}
                    <View style={styles.driverCard}>
                        <Image source={IMAGES.user_three} style={styles.driverAvatar} />
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>Cristopert Dastin</Text>
                            <Text style={styles.driverId}>ID 213752</Text>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.actionButton}>
                                <MessageCircle size={24} color={Colors.DefaultWhite} strokeWidth={2} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Phone size={24} color={Colors.DefaultWhite} strokeWidth={2} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Delivery Time */}
                <View style={styles.deliveryTimeSection}>
                    <Text style={styles.deliveryTimeTitle}>Your Delivery Time</Text>
                    <Text style={styles.deliveryTimeValue}>Estimated 8:30 - 9:15 PM</Text>

                    {/* Progress Steps */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressStep}>
                            <View style={[styles.stepIcon, styles.stepCompleted]}>
                                <ClipboardList size={20} color="#F97316" strokeWidth={2} />
                            </View>
                        </View>

                        <View style={[styles.progressLine, styles.lineCompleted]} />

                        <View style={styles.progressStep}>
                            <View style={[styles.stepIcon, styles.stepCompleted]}>
                                <UtensilsCrossed size={20} color="#F97316" strokeWidth={2} />
                            </View>
                        </View>

                        <View style={[styles.progressLine, styles.lineActive]} />

                        <View style={styles.progressStep}>
                            <View style={[styles.stepIcon, styles.stepActive]}>
                                <Bike size={20} color={Colors.DefaultWhite} strokeWidth={2} />
                            </View>
                        </View>

                        <View style={[styles.progressLine, styles.lineInactive]} />

                        <View style={styles.progressStep}>
                            <View style={[styles.stepIcon, styles.stepInactive]}>
                                <Check size={20} color="#D1D5DB" strokeWidth={2.5} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Order Section */}
                <View style={styles.orderSection}>
                    <Text style={styles.orderTitle}>Order</Text>
                    <ScrollView style={styles.orderList}>
                        <View style={styles.orderItem}>
                            <Text style={styles.orderItemName}>
                                {order?.itemName ?? '2 Burger With Meat'}
                            </Text>
                            <Text style={styles.orderItemPrice}>
                                {order?.price ?? '$283'}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapPlaceholder: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    mapHidden: {
        opacity: 0,
    },
    header: {
        position: 'absolute',
        left: ResponsivePixels.size16,
        right: ResponsivePixels.size16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        width: ResponsivePixels.size48,
        height: ResponsivePixels.size48,
        borderRadius: 24,
        backgroundColor: '#F97316',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: ResponsivePixels.size18,
        fontWeight: '600',
        color: '#1F2937',
        marginRight: ResponsivePixels.size48,
    },
    helpButton: {
        position: 'absolute',
        right: ResponsivePixels.size16,
        bottom: 100,
        width: ResponsivePixels.size48,
        height: ResponsivePixels.size48,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    locationButton: {
        position: 'absolute',
        right: ResponsivePixels.size16,
        bottom: 40,
        width: ResponsivePixels.size48,
        height: ResponsivePixels.size48,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userMarker: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 3,
        borderColor: '#1F2937',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userMarkerInner: {
        width: ResponsivePixels.size8,
        height: ResponsivePixels.size8,
        borderRadius: 4,
        backgroundColor: '#1F2937',
    },
    restaurantMarker: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 20,
        backgroundColor: '#F97316',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    destinationMarker: {
        alignItems: 'center',
    },
    destinationPin: {
        width: ResponsivePixels.size32,
        height: ResponsivePixels.size32,
        borderRadius: 16,
        backgroundColor: Colors.SunburstFlame,
        borderWidth: 3,
        borderColor: Colors.DefaultWhite,
    },
    destinationPinTail: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: Colors.SunburstFlame,
        marginTop: -4,
    },
    bottomSheet: {
        backgroundColor: Colors.DefaultWhite,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    topWrapper: {
        backgroundColor: Colors.NoirBlack,
        paddingHorizontal: ResponsivePixels.size20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size12,
    },
    handle: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size4,
        borderRadius: 2,
        backgroundColor: '#D1D5DB',
    },
    driverCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.DefaultWhite,
        borderRadius: 50,
        padding: ResponsivePixels.size8,
        marginBottom: ResponsivePixels.size20,
    },
    driverAvatar: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: 50,
        backgroundColor: '#E5E7EB',
    },
    driverInfo: {
        flex: 1,
        marginLeft: ResponsivePixels.size12,
    },
    driverName: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    driverId: {
        color: Colors.SteelMist,
        marginTop: ResponsivePixels.size2,
        ...Typography.bodySmallRegular
    },
    actionButtons: {
        flexDirection: 'row',
        gap: ResponsivePixels.size8,
    },
    actionButton: {
        padding: ResponsivePixels.size8,
        borderRadius: 24,
        backgroundColor: '#F97316',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deliveryTimeSection: {
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size20,
    },
    deliveryTimeTitle: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold
    },
    deliveryTimeValue: {
        color: Colors.SteelMist,
        marginTop: ResponsivePixels.size4,
        marginBottom: ResponsivePixels.size16,
        ...Typography.bodySmallMedium,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressStep: {
        alignItems: 'center',
    },
    stepIcon: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepCompleted: {
        backgroundColor: '#FFF7ED',
    },
    stepActive: {
        backgroundColor: Colors.SunburstFlame,
    },
    stepInactive: {
        backgroundColor: '#F3F4F6',
    },
    progressLine: {
        flex: 1,
        height: 2,
        marginHorizontal: 4,
    },
    lineCompleted: {
        backgroundColor: Colors.SunburstFlame,
        borderStyle: 'dashed',
    },
    lineActive: {
        backgroundColor: Colors.SunburstFlame,
        borderStyle: 'dashed',
    },
    lineInactive: {
        backgroundColor: Colors.SilverHaze,
        borderStyle: 'dashed',
    },
    orderSection: {
        paddingHorizontal: 20,
    },
    orderTitle: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    orderList: {
        maxHeight: ResponsivePixels.size100,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size8,
    },
    orderItemName: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumRegular,
    },
    orderItemPrice: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumRegular,
    },
});

export default DeliveryMapScreen;


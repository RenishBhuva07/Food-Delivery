import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Animated,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import MainContainer from '../common/MainContainer';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';
import { goBack, navigate, resetToDashboardWithRoute } from '../Navigators/Navigator';
import { Typography, ShadowStyles } from '../Theme/Typographys';
import CustomModal, { CustomModalRef, ModalButton } from '../common/CustomModal';
import CustomActionSheet from '../common/CustomActionSheet';
import { ActionSheetRef } from 'react-native-actions-sheet';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';
import { CustomAnimation } from '../common/CustomAnimation';
import { ANIMATIONS } from '../Animations';
import CustomButton from '../common/CustomButton';
import {
    ClipboardCheck,
    CookingPot,
    Bike,
    PackageCheck,
    Phone,
    MessageCircle,
    MapPin,
    ChevronRight,
} from 'lucide-react-native';

interface TrackingStep {
    id: number;
    title: string;
    subtitle: string;
    time: string;
    Icon: any;
    isCompleted: boolean;
    isActive: boolean;
}

const TrackOrderScreen: React.FC = ({ route }: any) => {
    const order = route?.params?.order;

    const progressAnim = useRef(new Animated.Value(0)).current;
    const stepAnims = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    const cancelModalRef = useRef<CustomModalRef>(null);
    const cancelSuccessSheetRef = useRef<ActionSheetRef>(null);

    const CANCEL_REASONS = useMemo(
        () => [
            'Ordered by mistake',
            'Found a better price elsewhere',
            'Delivery is taking too long',
            'Changed my mind',
            'Other',
        ],
        []
    );

    const [selectedCancelReason, setSelectedCancelReason] = useState<string>(CANCEL_REASONS[0]);
    const [cancelNote, setCancelNote] = useState<string>('');
    const [isOrderCancelled, setIsOrderCancelled] = useState<boolean>(order?.status === 'Cancelled');

    const TRACKING_STEPS: TrackingStep[] = [
        {
            id: 1,
            title: 'Order Confirmed',
            subtitle: 'Your order has been placed successfully',
            time: '10:30 AM',
            Icon: ClipboardCheck,
            isCompleted: true,
            isActive: false,
        },
        {
            id: 2,
            title: 'Preparing Your Order',
            subtitle: 'The restaurant is preparing your food',
            time: '10:45 AM',
            Icon: CookingPot,
            isCompleted: true,
            isActive: false,
        },
        {
            id: 3,
            title: 'On the Way',
            subtitle: 'Your rider is heading to you',
            time: '11:05 AM',
            Icon: Bike,
            isCompleted: false,
            isActive: true,
        },
        {
            id: 4,
            title: 'Delivered',
            subtitle: 'Enjoy your meal!',
            time: '--:--',
            Icon: PackageCheck,
            isCompleted: false,
            isActive: false,
        },
    ];

    useEffect(() => {
        // Animate progress bar
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
        }).start();

        // Stagger step animations
        const animations = stepAnims.map((anim, index) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 400,
                delay: index * 150,
                useNativeDriver: true,
            })
        );
        Animated.stagger(100, animations).start();
    }, []);

    const activeStepIndex = TRACKING_STEPS.findIndex(s => s.isActive);
    const progressPercent = (activeStepIndex + 0.5) / TRACKING_STEPS.length;

    const openCancelOrderModal = () => {
        if (isOrderCancelled) return;
        setSelectedCancelReason(CANCEL_REASONS[0]);
        setCancelNote('');
        cancelModalRef.current?.show();
    };

    const handleCancelOrder = () => {
        setIsOrderCancelled(true);
        cancelModalRef.current?.hide();
        setTimeout(() => cancelSuccessSheetRef.current?.show(), 350);
    };

    const handleCancelSuccessDone = () => {
        cancelSuccessSheetRef.current?.hide();
        const cancelledOrderId = order?.id ?? order?.orderId;
        resetToDashboardWithRoute(
            'MyOrdersScreen',
            cancelledOrderId ? { cancelledOrderId } : undefined
        );
    };

    const isOtherReason = selectedCancelReason === 'Other';
    const isCancelConfirmDisabled = isOtherReason && cancelNote.trim().length === 0;

    const cancelOrderButtons: ModalButton[] = [
        {
            text: 'Keep Order',
            style: 'secondary',
            onPress: () => cancelModalRef.current?.hide(),
        },
        {
            text: 'Cancel Order',
            style: 'danger',
            customStyle: { backgroundColor: Colors.ErrorRedLight },
            disabled: isCancelConfirmDisabled,
            onPress: handleCancelOrder,
        },
    ];

    const renderTrackingStep = (step: TrackingStep, index: number) => {
        const isLast = index === TRACKING_STEPS.length - 1;
        const StepIcon = step.Icon;

        const translateY = stepAnims[index].interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
        });

        return (
            <Animated.View
                key={step.id}
                style={[
                    styles.stepContainer,
                    {
                        opacity: stepAnims[index],
                        transform: [{ translateY }],
                    },
                ]}
            >
                {/* Timeline Column */}
                <View style={styles.timelineColumn}>
                    <View
                        style={[
                            styles.stepDot,
                            step.isCompleted && styles.stepDotCompleted,
                            step.isActive && styles.stepDotActive,
                            !step.isCompleted && !step.isActive && styles.stepDotPending,
                        ]}
                    >
                        {step.isCompleted ? (
                            <StepIcon size={14} color={Colors.DefaultWhite} />
                        ) : step.isActive ? (
                            <View style={styles.activePulse}>
                                <StepIcon size={14} color={Colors.DefaultWhite} />
                            </View>
                        ) : (
                            <StepIcon size={14} color={Colors.SteelMist} />
                        )}
                    </View>
                    {!isLast && (
                        <View style={styles.timelineLineContainer}>
                            <View
                                style={[
                                    styles.timelineLine,
                                    step.isCompleted && styles.timelineLineCompleted,
                                ]}
                            />
                        </View>
                    )}
                </View>

                {/* Content Column */}
                <View style={[styles.stepContent, !isLast && styles.stepContentSpacing]}>
                    <View style={styles.stepHeader}>
                        <Text
                            style={[
                                styles.stepTitle,
                                step.isActive && styles.stepTitleActive,
                                !step.isCompleted && !step.isActive && styles.stepTitlePending,
                            ]}
                        >
                            {step.title}
                        </Text>
                        <Text
                            style={[
                                styles.stepTime,
                                step.isActive && styles.stepTimeActive,
                            ]}
                        >
                            {step.time}
                        </Text>
                    </View>
                    <Text
                        style={[
                            styles.stepSubtitle,
                            !step.isCompleted && !step.isActive && styles.stepSubtitlePending,
                        ]}
                    >
                        {step.subtitle}
                    </Text>
                </View>
            </Animated.View>
        );
    };

    return (
        <>
            <MainContainer
                statusBarStyle="dark-content"
                containerBackgroundColor={Colors.DefaultWhite}
                showHeader
                header={{
                    headerTitle: 'Track Order',
                    headerTitleColor: Colors.NoirBlack,
                    headerBackgroundColor: Colors.DefaultWhite,
                    headerLeft: {
                        icon: IMAGES.ic_Back,
                        onPress: () => goBack(),
                        color: Colors.NoirBlack,
                    },
                }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Order Summary Card */}
                    <View style={styles.orderSummaryCard}>
                        <View style={styles.orderSummaryHeader}>
                            <View>
                                <Text style={styles.orderIdLabel}>Order ID</Text>
                                <Text style={styles.orderIdValue}>
                                    #{order?.orderId ?? '888333777'}
                                </Text>
                            </View>
                            <View style={styles.estimatedTimeContainer}>
                                <Text style={styles.estimatedLabel}>Estimated</Text>
                                <Text style={styles.estimatedTime}>25 min</Text>
                            </View>
                        </View>

                        <View style={styles.orderSummaryDivider} />

                        <View style={styles.orderItemRow}>
                            <View style={styles.orderItemImageContainer}>
                                <Image
                                    source={order?.image ?? IMAGES.ordinary_burgers}
                                    style={styles.orderItemImage}
                                />
                            </View>
                            <View style={styles.orderItemDetails}>
                                <Text style={styles.orderItemName}>
                                    {order?.itemName ?? 'Burger With Meat'}
                                </Text>
                                <Text style={styles.orderItemQuantity}>
                                    {order?.quantity ?? '14 Items'}
                                </Text>
                            </View>
                            <Text style={styles.orderItemPrice}>
                                {order?.price ?? '$12,230'}
                            </Text>
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressSection}>
                        <View style={styles.progressBarBackground}>
                            <Animated.View
                                style={[
                                    styles.progressBarFill,
                                    {
                                        width: progressAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', `${progressPercent * 100}%`],
                                        }),
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.progressLabel}>
                            {Math.round(progressPercent * 100)}% completed
                        </Text>
                    </View>

                    {/* Delivery Map Entry */}
                    <View style={styles.mapButtonContainer}>
                        <CustomButton
                            title="View Delivery Map"
                            onPress={() =>
                                navigate('DeliveryMapScreen', {
                                    order,
                                })
                            }
                            disableAllCaps
                        />
                    </View>

                    {/* Tracking Steps */}
                    <View style={styles.trackingCard}>
                        <Text style={styles.trackingTitle}>Order Status</Text>
                        <View style={styles.stepsContainer}>
                            {TRACKING_STEPS.map(renderTrackingStep)}
                        </View>
                    </View>

                    {/* Delivery Partner Card */}
                    <View style={styles.deliveryPartnerCard}>
                        <Text style={styles.deliveryPartnerTitle}>Delivery Partner</Text>
                        <View style={styles.partnerRow}>
                            <Image
                                source={IMAGES.user_three}
                                style={styles.partnerAvatar}
                            />
                            <View style={styles.partnerInfo}>
                                <Text style={styles.partnerName}>James Rodriguez</Text>
                                <View style={styles.partnerRatingRow}>
                                    <Image
                                        source={IMAGES.ic_Star}
                                        style={styles.starIcon}
                                    />
                                    <Text style={styles.partnerRating}>4.8</Text>
                                    <Text style={styles.partnerTrips}>• 234 deliveries</Text>
                                </View>
                            </View>
                            <View style={styles.partnerActions}>
                                <TouchableOpacity
                                    style={styles.partnerActionButton}
                                    activeOpacity={0.7}
                                >
                                    <Phone size={18} color={Colors.SunburstFlame} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.partnerActionButton}
                                    activeOpacity={0.7}
                                >
                                    <MessageCircle size={18} color={Colors.SunburstFlame} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Delivery Address Card */}
                    <View style={styles.addressCard}>
                        <Text style={styles.addressTitle}>Delivery Address</Text>
                        <View style={styles.addressRow}>
                            <View style={styles.addressIconContainer}>
                                <MapPin size={20} color={Colors.SunburstFlame} />
                            </View>
                            <View style={styles.addressDetails}>
                                <Text style={styles.addressName}>Home</Text>
                                <Text style={styles.addressText}>
                                    2464 Royal Ln. Mesa, New Jersey 45463
                                </Text>
                            </View>
                            <ChevronRight size={20} color={Colors.SteelMist} />
                        </View>
                    </View>

                    {/* Order Details Card */}
                    <View style={styles.orderDetailsCard}>
                        <Text style={styles.orderDetailsTitle}>Order Details</Text>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Subtotal</Text>
                            <Text style={styles.detailValue}>
                                {order?.price ?? '$12,230'}
                            </Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Delivery Fee</Text>
                            <Text style={styles.detailValue}>$2.50</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Discount</Text>
                            <Text style={[styles.detailValue, styles.discountValue]}>
                                -$3.00
                            </Text>
                        </View>

                        <View style={styles.totalDivider} />

                        <View style={styles.detailRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>
                                {order?.price ?? '$12,230'}
                            </Text>
                        </View>
                    </View>

                    {/* Cancel Order Button */}
                    {!isOrderCancelled && (
                        <TouchableOpacity
                            style={styles.cancelButton}
                            activeOpacity={0.7}
                            onPress={openCancelOrderModal}
                        >
                            <Text style={styles.cancelButtonText}>Cancel Order</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </MainContainer>

            {/* Cancel Order Modal */}
            <CustomModal
                ref={cancelModalRef}
                title="Cancel Order"
                message="Please select a reason for cancelling this order."
                buttons={cancelOrderButtons}
                animationType="scale"
                buttonLayout="vertical"
                customContent={
                    <View>
                        <View style={styles.reasonsContainer}>
                            {CANCEL_REASONS.map((reason) => {
                                const isSelected = selectedCancelReason === reason;
                                return (
                                    <TouchableOpacity
                                        key={reason}
                                        activeOpacity={0.8}
                                        onPress={() => setSelectedCancelReason(reason)}
                                        style={[
                                            styles.reasonRow,
                                            isSelected && styles.reasonRowSelected,
                                        ]}
                                    >
                                        <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                                            {isSelected && <View style={styles.radioInner} />}
                                        </View>
                                        <Text style={styles.reasonText}>{reason}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {isOtherReason && (
                            <View style={styles.otherReasonContainer}>
                                <Text style={styles.otherReasonLabel}>Tell us more</Text>
                                <TextInput
                                    value={cancelNote}
                                    onChangeText={setCancelNote}
                                    placeholder="Type here..."
                                    placeholderTextColor={Colors.SteelMist}
                                    style={styles.otherReasonInput}
                                    multiline
                                />
                                {isCancelConfirmDisabled && (
                                    <Text style={styles.otherReasonError}>
                                        Please add a short note for “Other”.
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>
                }
            />

            {/* Cancel Success Sheet */}
            <CustomActionSheet ref={cancelSuccessSheetRef}>
                <View style={ActionSheetStyles.actionSheetContent}>
                    <View style={styles.cancelSuccessContent}>
                        <View style={styles.cancelSuccessIcon}>
                            <CustomAnimation
                                animationFile={ANIMATIONS.Success}
                                animationStyle={{
                                    width: ResponsivePixels.size180,
                                    height: ResponsivePixels.size180,
                                }}
                            />
                        </View>
                        <Text style={styles.cancelSuccessTitle}>Order Cancelled</Text>
                        <Text style={styles.cancelSuccessSubtitle}>
                            Your order has been cancelled successfully.
                        </Text>
                    </View>

                    <CustomButton
                        style={{ marginBottom: ResponsivePixels.size10 }}
                        title="Back to Orders"
                        onPress={handleCancelSuccessDone}
                        disableAllCaps
                    />
                </View>
            </CustomActionSheet>
        </>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: ResponsivePixels.size12,
        paddingTop: ResponsivePixels.size10,
        paddingBottom: ResponsivePixels.size40,
    },

    // Order Summary Card
    orderSummaryCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size16,
        ...ShadowStyles.shadow,
    },
    orderSummaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    orderIdLabel: {
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size4,
        ...Typography.bodySmallRegular,
    },
    orderIdValue: {
        color: Colors.NoirBlack,
        ...Typography.bodyLargeBold,
    },
    estimatedTimeContainer: {
        alignItems: 'flex-end',
    },
    estimatedLabel: {
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size4,
        ...Typography.bodySmallRegular,
    },
    estimatedTime: {
        color: Colors.SunburstFlame,
        ...Typography.bodyLargeBold,
    },
    orderSummaryDivider: {
        borderTopWidth: 1,
        borderTopColor: Colors.FrostedMist,
        marginVertical: ResponsivePixels.size14,
    },
    orderItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderItemImageContainer: {
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size50,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: ResponsivePixels.size12,
    },
    orderItemImage: {
        width: '100%',
        height: '100%',
    },
    orderItemDetails: {
        flex: 1,
        gap: ResponsivePixels.size4,
    },
    orderItemName: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    orderItemQuantity: {
        color: Colors.SteelMist,
        ...Typography.bodySmallRegular,
    },
    orderItemPrice: {
        color: Colors.SunburstFlame,
        ...Typography.bodyMediumBold,
    },

    // Progress Section
    progressSection: {
        marginBottom: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size4,
    },
    progressBarBackground: {
        height: ResponsivePixels.size6,
        backgroundColor: Colors.FrostedHaze,
        borderRadius: ResponsivePixels.size4,
        overflow: 'hidden',
        marginBottom: ResponsivePixels.size8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.SunburstFlame,
        borderRadius: ResponsivePixels.size4,
    },
    progressLabel: {
        color: Colors.SteelMist,
        textAlign: 'right',
        ...Typography.bodySuperSmallMedium,
    },

    mapButtonContainer: {
        marginBottom: ResponsivePixels.size20,
    },

    // Tracking Card
    trackingCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size16,
        ...ShadowStyles.shadow,
    },
    trackingTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size20,
        ...Typography.bodyLargeSemiBold,
    },
    stepsContainer: {
        paddingLeft: ResponsivePixels.size4,
    },

    // Step Styles
    stepContainer: {
        flexDirection: 'row',
    },
    timelineColumn: {
        alignItems: 'center',
        width: ResponsivePixels.size32,
    },
    stepDot: {
        width: ResponsivePixels.size28,
        height: ResponsivePixels.size28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    stepDotCompleted: {
        backgroundColor: '#2ECC71',
    },
    stepDotActive: {
        backgroundColor: Colors.SunburstFlame,
    },
    stepDotPending: {
        backgroundColor: Colors.FrostedHaze,
        borderWidth: 1.5,
        borderColor: Colors.CloudWhisper,
    },
    activePulse: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    timelineLineContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size2,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: Colors.CloudWhisper,
    },
    timelineLineCompleted: {
        backgroundColor: '#2ECC71',
    },

    // Step Content
    stepContent: {
        flex: 1,
        marginLeft: ResponsivePixels.size12,
        paddingTop: ResponsivePixels.size2,
    },
    stepContentSpacing: {
        paddingBottom: ResponsivePixels.size24,
    },
    stepHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ResponsivePixels.size4,
    },
    stepTitle: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    stepTitleActive: {
        color: Colors.SunburstFlame,
    },
    stepTitlePending: {
        color: Colors.SteelMist,
    },
    stepTime: {
        color: Colors.SteelMist,
        ...Typography.bodySuperSmallMedium,
    },
    stepTimeActive: {
        color: Colors.SunburstFlame,
    },
    stepSubtitle: {
        color: Colors.SteelMist,
        ...Typography.bodySmallRegular,
    },
    stepSubtitlePending: {
        color: Colors.SilverHaze,
    },

    // Delivery Partner Card
    deliveryPartnerCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size16,
        ...ShadowStyles.shadow,
    },
    deliveryPartnerTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size14,
        ...Typography.bodyLargeSemiBold,
    },
    partnerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    partnerAvatar: {
        width: ResponsivePixels.size48,
        height: ResponsivePixels.size48,
        borderRadius: 24,
        marginRight: ResponsivePixels.size12,
    },
    partnerInfo: {
        flex: 1,
        gap: ResponsivePixels.size4,
    },
    partnerName: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    partnerRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size4,
    },
    starIcon: {
        width: ResponsivePixels.size14,
        height: ResponsivePixels.size14,
    },
    partnerRating: {
        color: Colors.NoirBlack,
        ...Typography.bodySmallSemiBold,
    },
    partnerTrips: {
        color: Colors.SteelMist,
        ...Typography.bodySmallRegular,
    },
    partnerActions: {
        flexDirection: 'row',
        gap: ResponsivePixels.size10,
    },
    partnerActionButton: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 20,
        backgroundColor: Colors.SunburstFlameFaded,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Address Card
    addressCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size16,
        ...ShadowStyles.shadow,
    },
    addressTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size14,
        ...Typography.bodyLargeSemiBold,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressIconContainer: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 12,
        backgroundColor: Colors.SunburstFlameFaded,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size12,
    },
    addressDetails: {
        flex: 1,
        gap: ResponsivePixels.size4,
    },
    addressName: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    addressText: {
        color: Colors.SteelMist,
        ...Typography.bodySmallRegular,
    },

    // Order Details Card
    orderDetailsCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size20,
        ...ShadowStyles.shadow,
    },
    orderDetailsTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size16,
        ...Typography.bodyLargeSemiBold,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ResponsivePixels.size10,
    },
    detailLabel: {
        color: Colors.SteelMist,
        ...Typography.bodyMediumRegular,
    },
    detailValue: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    discountValue: {
        color: '#2ECC71',
    },
    totalDivider: {
        borderTopWidth: 1,
        borderTopColor: Colors.FrostedMist,
        marginVertical: ResponsivePixels.size10,
    },
    totalLabel: {
        color: Colors.NoirBlack,
        ...Typography.bodyLargeBold,
    },
    totalValue: {
        color: Colors.SunburstFlame,
        ...Typography.bodyLargeBold,
    },

    // Cancel Button
    cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: ResponsivePixels.size14,
        borderRadius: ResponsivePixels.size30,
        borderWidth: 1,
        borderColor: Colors.ErrorRedLight,
        marginBottom: ResponsivePixels.size20,
    },
    cancelButtonText: {
        color: Colors.ErrorRedLight,
        ...Typography.bodyMediumSemiBold,
    },

    // Cancel Flow (Modal)
    reasonsContainer: {
        marginTop: ResponsivePixels.size12,
        gap: ResponsivePixels.size10,
    },
    reasonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.CloudWhisper,
        borderRadius: ResponsivePixels.size14,
        paddingVertical: ResponsivePixels.size12,
        paddingHorizontal: ResponsivePixels.size14,
        backgroundColor: Colors.DefaultWhite,
        gap: ResponsivePixels.size12,
    },
    reasonRowSelected: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.SunlitAlmond,
    },
    radioOuter: {
        width: ResponsivePixels.size18,
        height: ResponsivePixels.size18,
        borderRadius: ResponsivePixels.size18,
        borderWidth: 2,
        borderColor: Colors.MoonDust,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterSelected: {
        borderColor: Colors.SunburstFlame,
    },
    radioInner: {
        width: ResponsivePixels.size8,
        height: ResponsivePixels.size8,
        borderRadius: ResponsivePixels.size8,
        backgroundColor: Colors.SunburstFlame,
    },
    reasonText: {
        flex: 1,
        color: Colors.NoirBlack,
        ...Typography.bodyMediumMedium,
    },
    otherReasonContainer: {
        marginTop: ResponsivePixels.size14,
    },
    otherReasonLabel: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size8,
        ...Typography.bodySmallSemiBold,
    },
    otherReasonInput: {
        minHeight: ResponsivePixels.size90,
        borderWidth: 1,
        borderColor: Colors.CloudWhisper,
        borderRadius: ResponsivePixels.size14,
        paddingHorizontal: ResponsivePixels.size14,
        paddingVertical: ResponsivePixels.size12,
        color: Colors.NoirBlack,
        backgroundColor: Colors.DefaultWhite,
        textAlignVertical: 'top',
        ...Typography.bodyMediumRegular,
    },
    otherReasonError: {
        marginTop: ResponsivePixels.size8,
        color: Colors.ErrorRedLight,
        ...Typography.bodySmallRegular,
    },

    // Cancel Flow (Success Sheet)
    cancelSuccessContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelSuccessIcon: {
        marginBottom: ResponsivePixels.size6,
    },
    cancelSuccessTitle: {
        color: Colors.NoirBlack,
        textAlign: 'center',
        marginBottom: ResponsivePixels.size8,
        ...Typography.h5SemiBold,
    },
    cancelSuccessSubtitle: {
        color: Colors.SteelMist,
        textAlign: 'center',
        marginBottom: ResponsivePixels.size24,
        paddingHorizontal: ResponsivePixels.size10,
        ...Typography.bodyMediumMedium,
    },
});

export default TrackOrderScreen;

import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import MainContainer from '../common/MainContainer';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { IMAGES } from '../Assets/Images';
import { goBack, navigate } from '../Navigators/Navigator';
import { Typography, ShadowStyles } from '../Theme/Typographys';
import { themes } from '../Assets/StyleUtilities/CommonStyleSheets/theme';
import { Package, Clock, CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react-native';

type OrderStatus = 'In Delivery' | 'Completed' | 'Cancelled';

interface Order {
    id: string;
    orderId: string;
    itemName: string;
    price: string;
    quantity: string;
    status: OrderStatus;
    date: string;
    image: any;
}

const ORDERS: Order[] = [
    {
        id: '1',
        orderId: '888333777',
        itemName: 'Burger With Meat',
        price: '$12,230',
        quantity: '14 Items',
        status: 'In Delivery',
        date: 'Feb 16, 2026',
        image: IMAGES.ordinary_burgers,
    },
    {
        id: '2',
        orderId: '888333776',
        itemName: 'Ordinary Burgers',
        price: '$8,500',
        quantity: '8 Items',
        status: 'Completed',
        date: 'Feb 14, 2026',
        image: IMAGES.ordinary_burgers,
    },
    {
        id: '3',
        orderId: '888333775',
        itemName: 'Burger With Meat',
        price: '$5,200',
        quantity: '3 Items',
        status: 'Completed',
        date: 'Feb 12, 2026',
        image: IMAGES.ordinary_burgers,
    },
    {
        id: '4',
        orderId: '888333774',
        itemName: 'Ordinary Burgers',
        price: '$3,100',
        quantity: '2 Items',
        status: 'Cancelled',
        date: 'Feb 10, 2026',
        image: IMAGES.ordinary_burgers,
    },
    {
        id: '5',
        orderId: '888333773',
        itemName: 'Burger With Meat',
        price: '$15,000',
        quantity: '10 Items',
        status: 'Completed',
        date: 'Feb 8, 2026',
        image: IMAGES.ordinary_burgers,
    },
    {
        id: '6',
        orderId: '888333772',
        itemName: 'Ordinary Burgers',
        price: '$6,750',
        quantity: '5 Items',
        status: 'In Delivery',
        date: 'Feb 6, 2026',
        image: IMAGES.ordinary_burgers,
    },
];

type FilterTab = 'All' | 'Active' | 'Completed' | 'Cancelled';

const FILTER_TABS: FilterTab[] = ['All', 'Active', 'Completed', 'Cancelled'];

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'In Delivery':
            return Colors.SunburstFlame;
        case 'Completed':
            return '#2ECC71';
        case 'Cancelled':
            return Colors.ErrorRedLight;
        default:
            return Colors.SteelMist;
    }
};

const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
        case 'In Delivery':
            return Clock;
        case 'Completed':
            return CheckCircle;
        case 'Cancelled':
            return XCircle;
        default:
            return Package;
    }
};

const MyOrdersScreen: React.FC = ({ route }: any) => {
    const [activeTab, setActiveTab] = useState<FilterTab>('All');
    const [orders, setOrders] = useState<Order[]>(ORDERS);
    const lastCancelledRef = useRef<string | null>(null);

    useEffect(() => {
        const cancelledOrderId = route?.params?.cancelledOrderId;
        if (!cancelledOrderId || cancelledOrderId === lastCancelledRef.current) return;

        lastCancelledRef.current = cancelledOrderId;
        setOrders(prev =>
            prev.map(o =>
                o.id === cancelledOrderId || o.orderId === cancelledOrderId
                    ? { ...o, status: 'Cancelled' }
                    : o
            )
        );
        setActiveTab('Cancelled');
    }, [route?.params?.cancelledOrderId]);

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Active') return order.status === 'In Delivery';
        return order.status === activeTab;
    });

    const renderFilterTab = (tab: FilterTab) => {
        const isActive = activeTab === tab;
        return (
            <TouchableOpacity
                key={tab}
                style={[
                    styles.filterTab,
                    isActive && styles.filterTabActive,
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
            >
                <Text
                    style={[
                        styles.filterTabText,
                        isActive && styles.filterTabTextActive,
                    ]}
                >
                    {tab}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderOrderItem = ({ item }: { item: Order }) => {
        const StatusIcon = getStatusIcon(item.status);
        const statusColor = getStatusColor(item.status);

        return (
            <TouchableOpacity style={styles.orderCard} activeOpacity={0.7}>
                {/* Order Header */}
                <View style={styles.orderHeader}>
                    <View style={styles.orderIdRow}>
                        <Text style={styles.orderIdLabel}>Order ID</Text>
                        <Text style={styles.orderId}>{item.orderId}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: `${statusColor}18` }]}>
                        <StatusIcon size={12} color={statusColor} />
                        <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Order Content */}
                <View style={styles.orderContent}>
                    <View style={styles.foodImageContainer}>
                        <Image source={item.image} style={styles.orderImage} />
                    </View>
                    <View style={styles.orderDetails}>
                        <Text style={styles.orderItemName}>{item.itemName}</Text>
                        <Text style={styles.orderPrice}>{item.price}</Text>
                    </View>
                    <View style={styles.orderRightSection}>
                        <Text style={styles.orderQuantity}>{item.quantity}</Text>
                        <Text style={styles.orderDate}>{item.date}</Text>
                    </View>
                </View>

                {/* Action Footer */}
                <View style={styles.orderFooter}>
                    {item.status === 'In Delivery' && (
                        <TouchableOpacity style={styles.trackButton} activeOpacity={0.7} onPress={() => navigate('TrackOrderScreen', { order: item })}>
                            <Text style={styles.trackButtonText}>Track Order</Text>
                            <ChevronRight size={16} color={Colors.DefaultWhite} />
                        </TouchableOpacity>
                    )}
                    {item.status === 'Completed' && (
                        <TouchableOpacity style={styles.reorderButton} activeOpacity={0.7}>
                            <RotateCcw size={14} color={Colors.SunburstFlame} />
                            <Text style={styles.reorderButtonText}>Re-Order</Text>
                        </TouchableOpacity>
                    )}
                    {item.status === 'Cancelled' && (
                        <TouchableOpacity style={styles.reorderButton} activeOpacity={0.7}>
                            <RotateCcw size={14} color={Colors.SunburstFlame} />
                            <Text style={styles.reorderButtonText}>Order Again</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Image source={IMAGES.no_order_Illustration} style={styles.emptyImage} resizeMode="contain" />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptySubtitle}>
                You don't have any {activeTab !== 'All' ? activeTab.toLowerCase() : ''} orders yet.
            </Text>
        </View>
    );

    return (
        <MainContainer
            statusBarStyle="dark-content"
            containerBackgroundColor={Colors.DefaultWhite}
            showHeader
            header={{
                headerTitle: 'My Orders',
                headerTitleColor: Colors.NoirBlack,
                headerBackgroundColor: Colors.DefaultWhite,
                headerLeft: {
                    icon: IMAGES.ic_Back,
                    onPress: () => goBack(),
                    color: Colors.NoirBlack,
                },
            }}
        >
            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                {FILTER_TABS.map(renderFilterTab)}
            </View>

            {/* Orders List */}
            <FlatList
                data={filteredOrders}
                renderItem={renderOrderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
            />
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size12,
        gap: ResponsivePixels.size8,
    },
    filterTab: {
        flex: 1,
        paddingVertical: ResponsivePixels.size10,
        borderRadius: ResponsivePixels.size24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.FrostedHaze,
    },
    filterTabActive: {
        backgroundColor: Colors.SunburstFlame,
    },
    filterTabText: {
        color: Colors.SteelMist,
        ...Typography.bodySmallSemiBold,
    },
    filterTabTextActive: {
        color: Colors.DefaultWhite,
    },
    listContainer: {
        paddingHorizontal: ResponsivePixels.size12,
        paddingBottom: ResponsivePixels.size30,
        gap: ResponsivePixels.size14,
    },
    orderCard: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        padding: ResponsivePixels.size16,
        ...ShadowStyles.shadow,
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderIdRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size8,
    },
    orderIdLabel: {
        color: Colors.SteelMist,
        ...Typography.bodySmallSemiBold,
    },
    orderId: {
        color: Colors.NoirBlack,
        ...Typography.bodySmallSemiBold,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size4,
        paddingHorizontal: ResponsivePixels.size10,
        paddingVertical: ResponsivePixels.size4,
        borderRadius: ResponsivePixels.size12,
    },
    statusText: {
        ...Typography.bodySuperSmallSemiBold,
    },
    divider: {
        borderTopWidth: 1,
        borderTopColor: Colors.FrostedMist,
        marginVertical: ResponsivePixels.size12,
    },
    orderContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    foodImageContainer: {
        width: ResponsivePixels.size54,
        height: ResponsivePixels.size54,
        overflow: 'hidden',
        borderRadius: 8,
        marginRight: ResponsivePixels.size14,
    },
    orderImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    orderDetails: {
        flex: 1,
        gap: ResponsivePixels.size4,
    },
    orderItemName: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    orderPrice: {
        color: Colors.SunburstFlame,
        ...Typography.bodyMediumBold,
    },
    orderRightSection: {
        alignItems: 'flex-end',
        gap: ResponsivePixels.size4,
    },
    orderQuantity: {
        color: Colors.NoirBlack,
        ...Typography.bodySmallMedium,
    },
    orderDate: {
        color: Colors.SteelMist,
        ...Typography.bodySuperSmallRegular,
    },
    orderFooter: {
        marginTop: ResponsivePixels.size12,
        alignItems: 'flex-end',
    },
    trackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.SunburstFlame,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size8,
        borderRadius: ResponsivePixels.size24,
        gap: ResponsivePixels.size4,
    },
    trackButtonText: {
        color: Colors.DefaultWhite,
        ...Typography.bodySmallSemiBold,
    },
    reorderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.SunburstFlame,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size8,
        borderRadius: ResponsivePixels.size24,
        gap: ResponsivePixels.size6,
    },
    reorderButtonText: {
        color: Colors.SunburstFlame,
        ...Typography.bodySmallSemiBold,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: ResponsivePixels.size100,
        paddingHorizontal: ResponsivePixels.size30,
    },
    emptyImage: {
        width: ResponsivePixels.size200,
        height: ResponsivePixels.size200,
        marginBottom: ResponsivePixels.size24,
    },
    emptyTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size8,
        ...Typography.bodyLargeBold,
    },
    emptySubtitle: {
        color: Colors.SteelMist,
        textAlign: 'center',
        ...Typography.bodyMediumRegular,
    },
});

export default MyOrdersScreen;

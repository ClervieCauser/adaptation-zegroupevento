// components/ui/DragZone.tsx
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import { useOrderProcessing } from '@/context/OrderProcessingContext';
import { MOCK_ORDERS } from '@/types/order';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
    runOnJS
} from 'react-native-reanimated';

const DragZone = ({ zoneId }) => {
    const { getOrderByZone, addOrderToZone, toggleItemReady } = useOrderProcessing();
    const order = getOrderByZone(zoneId);
    const orderData = order ? MOCK_ORDERS.find(o => o.id === order.orderId) : null;

    return (
        <View style={[styles.dragZone, order?.isCompleted && styles.dragZoneCompleted]}>
            {!orderData ? (
                <>
                    <View style={styles.plusIcon}>
                        <ThemedText style={styles.plusText}>+</ThemedText>
                    </View>
                    <ThemedText style={styles.dragText}>DRAG AN ORDER</ThemedText>
                </>
            ) : (
                <>
                    <ThemedText style={styles.orderTitle}>Order #{orderData.id}</ThemedText>
                    <View style={styles.itemsContainer}>
                        {order.items.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.item, item.isReady && styles.itemReady]}
                                onPress={() => toggleItemReady(order.orderId, index)}
                            >
                                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                                <ThemedText style={styles.itemQuantity}>x{item.quantity}</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    dragZone: {
        flex: 1,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#E8A85F',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        gap: 8,
    },
    plusIcon: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusText: {
        fontSize: 24,
        color: '#E8A85F',
    },
    dragText: {
        color: '#1C0D45',
        fontFamily: 'Jua',
    },

    itemsContainer: {
        width: '100%',
        padding: 8,
        gap: 8,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8A85F',
    },
    itemReady: {
        backgroundColor: '#E8F5E9',
        borderColor: '#4CAF50',
    },
    orderTitle: {
        fontSize: 18,
        fontFamily: 'Jua',
        marginBottom: 16,
    },
    dragZoneCompleted: {
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
    }
});

export default DragZone;

// components/ui/DragZone.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useOrderProcessing } from '@/context/OrderProcessingContext';
import { MOCK_ORDERS } from '@/types/order';
import Animated, {
    useAnimatedStyle,
    withTiming,
    withSequence,
    withDelay
} from "react-native-reanimated";

const DragZone = ({ zoneId, onMeasure, onReadyAll }) => {
    const { getOrderByZone, toggleItemReady, removeOrderFromZone } = useOrderProcessing();
    const order = getOrderByZone(zoneId);
    const orderData = order ? MOCK_ORDERS.find(o => o.id === order.orderId) : null;
    const [isCompleted, setIsCompleted] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const opacity = useAnimatedStyle(() => ({
        opacity: withTiming(isTransitioning ? 0 : 1, { duration: 500 })
    }));

    const borderColorStyle = useAnimatedStyle(() => ({
        borderColor: withTiming(
            isCompleted ? '#4CAF50' : '#E8A85F',
            { duration: 300 }
        )
    }));

    useEffect(() => {
        if (order?.isCompleted && !isCompleted) {
            setIsCompleted(true);
            setIsTransitioning(true);

            const timer = setTimeout(() => {
                removeOrderFromZone(order.orderId);
                setIsCompleted(false);
                setIsTransitioning(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [order?.isCompleted]);

    return (
        <Animated.View
            style={[
                styles.dragZone,
                borderColorStyle,
                !!orderData && styles.dragZoneWithOrder,
                isCompleted && styles.dragZoneCompleted
            ]}
            onLayout={(event) => onMeasure?.(zoneId, event.nativeEvent.layout)}
        >
            {!orderData ? (
                <>
                    <View style={styles.plusIcon}>
                        <ThemedText style={styles.plusText}>+</ThemedText>
                    </View>
                    <ThemedText style={styles.dragText}>GLISSER UNE COMMANDE</ThemedText>
                </>
            ) : (
                <Animated.View style={[styles.content, opacity]}>
                    <ThemedText style={styles.orderTitle}>Commande #{orderData.id}</ThemedText>
                    <TouchableOpacity
                        style={styles.readyAllButton}
                        onPress={() => onReadyAll(order.orderId)}
                    >
                        <ThemedText style={styles.readyAllText}>Tout Prêt</ThemedText>
                    </TouchableOpacity>
                    <ScrollView style={styles.itemsContainer}>
                        {order?.items?.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.item,
                                    item.isReady && styles.itemReady
                                ]}
                                onPress={() => !isCompleted && toggleItemReady(order.orderId, index)}
                            >
                                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                                <ThemedText style={styles.itemQuantity}>x{item.quantity}</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Animated.View>
            )}
        </Animated.View>
    );
};

const OrderTag = ({ id, isCompleted }) => (
    <View style={[styles.tag, isCompleted && styles.tagCompleted]}>
        <ThemedText style={styles.tagText}>#{id}</ThemedText>
    </View>
);

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
        padding: 16,
        gap: 8,
    },
    dragZoneWithOrder: {
        borderStyle: 'solid',
    },
    content: {
        width: '100%',
        height: '100%',
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
    orderTitle: {
        fontSize: 18,
        fontFamily: 'Jua',
        color: '#1C0D45',
        marginBottom: 16,
    },
    itemsContainer: {
        maxHeight: 300,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8A85F',
    },
    itemReady: {
        backgroundColor: '#E8F5E9',
        borderColor: '#4CAF50',
    },
    itemName: {
        color: '#1C0D45',
        fontFamily: 'Jua',
    },
    itemQuantity: {
        color: '#1C0D45',
        fontFamily: 'Jua',
    },
    itemNameReady: {
        color: '#4CAF50',
    },
    tag: {
        backgroundColor: '#E8A85F',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginHorizontal: 4,
    },
    tagCompleted: {
        backgroundColor: '#4CAF50',
    },
    tagText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
        fontSize: 14,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    readyAllButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
    },
    readyAllText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Jua',
    },
});

export default DragZone;

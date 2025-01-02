import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Order } from '@/types/order';

type OrderCardProps = {
    order: Order;
    onCook: (orderId: string) => void;
    isSelectMode?: boolean;
    isSelected?: boolean;
    onSelect?: (id: string) => void;
};

const MAX_VISIBLE_ITEMS = 7;

const OrderCard = ({ order, onCook, isSelectMode, isSelected, onSelect }: OrderCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasMoreItems = order.items.length > MAX_VISIBLE_ITEMS;
    const visibleItems = isExpanded ? order.items : order.items.slice(0, MAX_VISIBLE_ITEMS);
    const remainingItems = order.items.length - MAX_VISIBLE_ITEMS;

    const renderToggleButton = () => {
        if (!hasMoreItems) return null;
        
        if (isExpanded) {
            return (
                <TouchableOpacity 
                    style={[styles.itemBox, styles.seeMoreBox]}
                    onPress={() => setIsExpanded(false)}
                >
                    <ThemedText style={styles.seeMoreText}>See less</ThemedText>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity 
                style={[styles.itemBox, styles.seeMoreBox]}
                onPress={() => setIsExpanded(true)}
            >
                <ThemedText style={styles.seeMoreText}>See more ({remainingItems})</ThemedText>
            </TouchableOpacity>
        );
    };

    const isExpert = order.items.length > 4;

    return (
        <ThemedView style={[styles.card, isExpanded && styles.cardExpanded]}>
            {isSelectMode && (
                <TouchableOpacity
                    style={[styles.selectCircle, isSelected && styles.selectCircleActive]}
                    onPress={() => onSelect?.(order.id)}
                >
                    {isSelected && <View style={styles.selectCircleDot} />}
                </TouchableOpacity>
            )}
            
            <View style={styles.cardHeader}>
                <ThemedText style={styles.orderId}>ORDER#{order.id} <ThemedText style={styles.time}>{order.time}</ThemedText></ThemedText>
            </View>

            <View style={styles.tags}>
                <View style={styles.tag}>
                    <ThemedText style={styles.tagText}>main course</ThemedText>
                </View>
                <View style={styles.tag}>
                    <ThemedText style={styles.tagText}>Latest</ThemedText>
                </View>
                <View style={[styles.tag, isExpert ? styles.expertTag : styles.noviceTag]}>
                    <ThemedText style={styles.tagText}>{isExpert ? 'EXPERT' : 'NOVICE'}</ThemedText>
                </View>
            </View>

            <View style={styles.itemsGrid}>
                {visibleItems.map((item, index) => (
                    <View key={index} style={styles.itemBox}>
                        <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                        <ThemedText style={styles.itemQuantity}>×{item.quantity}</ThemedText>
                    </View>
                ))}
                {renderToggleButton()}
            </View>

            <TouchableOpacity
                style={styles.cookButton}
                onPress={() => onCook(order.id)}
            >
                <ThemedText style={styles.cookButtonText}>Cook</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#DEEEFA',
        borderRadius: 16,
        padding: 16,
        width: 'calc(25% - 12px)',
        minWidth: 280,
        maxWidth: 320,
        margin: 6,
        transition: 'all 0.3s ease',
    },
    cardExpanded: {
        width: '100%',
        maxWidth: 'calc(100% - 12px)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    orderId: {
        fontSize: 18,
        fontFamily: 'Jua',
        color: '#1C0D45',
    },
    time: {
        fontSize: 14,
        color: '#1C0D45',
        opacity: 0.6,
    },
    tags: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16,
    },
    tag: {
        backgroundColor: '#E8A85F',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    expertTag: {
        backgroundColor: '#EF476F',
    },
    noviceTag: {
        backgroundColor: '#008AEC',
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Jua',
    },
    itemsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
        justifyContent: 'center',
    },
    itemBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        width: 'calc(50% - 4px)',
        minWidth: 120,
    },
    seeMoreBox: {
        justifyContent: 'center',
        cursor: 'pointer',
    },
    itemName: {
        fontSize: 14,
        color: '#1C0D45',
        fontFamily: 'Jua',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#1C0D45',
        opacity: 0.6,
    },
    seeMoreText: {
        fontSize: 14,
        color: '#E8A85F',
        fontFamily: 'Jua',
        textAlign: 'center',
        width: '100%',
    },
    cookButton: {
        backgroundColor: '#E8A85F',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 'auto',
    },
    cookButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Jua',
    },
    selectCircle: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E8A85F',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    selectCircleActive: {
        backgroundColor: '#E8A85F',
    },
    selectCircleDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
});

export default OrderCard;
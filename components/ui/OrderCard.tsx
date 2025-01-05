import React, {useCallback, useState} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Order } from '@/types/order';
import { useRouter } from 'expo-router';
import { useOrderSelection } from '@/context/OrderContext';

type OrderCardProps = {
    order: Order;
    onCook?: (orderId: string) => void;
    expanded: boolean;
    onToggleExpand: () => void;
    isSelectMode: boolean;
    isSelected: boolean;
    onSelect: (id: string) => void;
    showContinue?: boolean;
};

const OrderCard = ({
                       order,
                       expanded,
                       onToggleExpand,
                       isSelectMode,
                       isSelected,
                       onSelect,
                       showContinue = false
                   }) => {
    const router = useRouter();
    const { handleSingleCook } = useOrderSelection();
    const GRID_COLUMNS = 2;
    const MAX_VISIBLE_ROWS = 2;
    const EXPANDED_COLUMNS = 8;
    const MAX_VISIBLE_ITEMS = GRID_COLUMNS * MAX_VISIBLE_ROWS;
    const hasMoreItems = order.items.length > MAX_VISIBLE_ITEMS;
    const [isExpanded, setIsExpanded] = useState(false);
    const visibleItems = isExpanded ? order.items : order.items.slice(0, MAX_VISIBLE_ITEMS);
    const remainingItems = order.items.length - MAX_VISIBLE_ITEMS;
    const isExpert = order.items.length > 4;

    const handleContinue = useCallback(() => {
        // Utiliser order.groupId de la props
        handleSingleCook(order.id.split(', #')[0], order.groupId);
    }, [order.id, order.groupId, handleSingleCook]);

    const renderToggleButton = () => {
        if (!hasMoreItems) return null;
        
        if (isExpanded) {
            return (
                <TouchableOpacity 
                    style={[styles.itemBox, styles.seeMoreBox]}
                    onPress={() => setIsExpanded(false)}
                >
                    <ThemedText style={styles.seeMoreText}>Voir moins</ThemedText>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity 
                style={[styles.itemBox, styles.seeMoreBox]}
                onPress={() => setIsExpanded(true)}
            >
                <ThemedText style={styles.seeMoreText}>Voir plus ({remainingItems})</ThemedText>
            </TouchableOpacity>
        );
    };

    return (
        <ThemedView style={[
            styles.card,
            expanded && styles.cardExpanded,
            { width: expanded ? '100%' : 'calc(25% - 12px)' }]}>   
            {isSelectMode && (
                <TouchableOpacity
                    style={[styles.selectCircle, isSelected && styles.selectCircleActive]}
                    onPress={() => onSelect?.(order.id)}
                >
                    {isSelected && <View style={styles.selectCircleDot} />}
                </TouchableOpacity>
            )}
            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <View style={styles.orderInfo}>
                        <ThemedText style={styles.orderId}>Commande #{order.id}</ThemedText>
                        <ThemedText style={styles.time}>{order.time}</ThemedText>
                    </View>
                    <View style={styles.tags}>
                        <View style={styles.tag}>
                            <ThemedText style={styles.tagText}>Plat principal</ThemedText>
                        </View>
                        <View style={styles.tag}>
                            <ThemedText style={styles.tagText}>Plus ancien</ThemedText>
                        </View>
                        <View style={[styles.tag, isExpert ? styles.expertTag : styles.noviceTag]}>
                            <ThemedText style={styles.tagText}>{isExpert ? 'EXPERT' : 'NOVICE'}</ThemedText>
                        </View>
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

                {!showContinue ? (
                    <TouchableOpacity
                        style={styles.cookButton}
                        onPress={() => handleSingleCook(order.id)}
                    >
                        <ThemedText style={styles.cookButtonText}>Cuisiner</ThemedText>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.cookButton, styles.continueButton]}
                        onPress={handleContinue}
                    >
                        <ThemedText style={styles.cookButtonText}>Continuer</ThemedText>
                    </TouchableOpacity>
                )}
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#DEEEFA',
        borderRadius: 16,
        padding: 16,
        width: '60%',
        minWidth: 280,
        maxWidth: 320,
        margin: 6,
        flexShrink: 1,
    },
    cardExpanded: {
        width: '100%',
        maxWidth: '100%',
    },
    itemCompleted: {
        backgroundColor: '#E8F5E9',
        borderColor: '#4CAF50',
        borderWidth: 1
    },
    cardContent: {
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    orderInfo: {
        alignItems: 'center',
        gap: 4,
    },
    orderId: {
        fontSize: 16,
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
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    tagExport: {
        backgroundColor: '#EF476F',
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
    },
    itemBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        width: '48%',
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
    },
    cookButton: {
        backgroundColor: '#E8A85F',
        borderRadius: 12,
        padding: 10,
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
    continueButton: {
        backgroundColor: '#4CAF50',
    },
});

export default OrderCard;

import React from 'react';
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

    const renderMealGrid = () => {
        const visibleItems = expanded ? order.items : order.items.slice(0, MAX_VISIBLE_ITEMS);
        const rows = [];
        const columns = expanded ? EXPANDED_COLUMNS : GRID_COLUMNS;
        const numRows = Math.ceil(visibleItems.length / columns);

        for (let i = 0; i < numRows; i++) {
            const rowItems = visibleItems.slice(i * columns, (i + 1) * columns);
            const isLastVisibleRow = !expanded && i === MAX_VISIBLE_ROWS - 1;
            const showSeeMore = hasMoreItems && isLastVisibleRow;

            const row = (
                <View key={i} style={styles.gridRow}>
                    {rowItems.map((item, index) => (
                        <View key={index} style={styles.gridCell}>
                            <ThemedText style={styles.mealName}>{item.name}</ThemedText>
                            <ThemedText style={styles.mealQuantity}>×{item.quantity}</ThemedText>
                        </View>
                    ))}
                    {showSeeMore && rowItems.length === GRID_COLUMNS && (
                        <TouchableOpacity
                            style={[styles.gridCell, styles.seeMoreCell]}
                            onPress={onToggleExpand}
                        >
                            <ThemedText style={styles.seeMoreText}>see more</ThemedText>
                        </TouchableOpacity>
                    )}
                    {rowItems.length < columns && !showSeeMore && (
                        Array(columns - rowItems.length).fill(0).map((_, i) => (
                            <View key={`empty-${i}`} style={[styles.gridCell, styles.emptyCell]} />
                        ))
                    )}
                </View>
            );
            rows.push(row);
        }
        return rows;
    };

    const handleContinue = () => {
        handleSingleCook(order.id);
        router.push('/recipe-prep');
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
                        <ThemedText style={styles.orderId}>ORDER#{order.id}</ThemedText>
                        <ThemedText style={styles.time}>{order.time}</ThemedText>
                    </View>
                    <View style={styles.tags}>
                        <View style={styles.tag}>
                            <ThemedText style={styles.tagText}>main course</ThemedText>
                        </View>
                        <View style={styles.tag}>
                            <ThemedText style={styles.tagText}>Latest</ThemedText>
                        </View>
                        <View style={[styles.tag, styles.tagExport]}>
                            <ThemedText style={styles.tagText}>EXPORT</ThemedText>
                        </View>
                    </View>
                </View>

                <View style={[
                    styles.mealsContainer,
                    expanded && styles.mealsContainerExpanded
                ]}>
                    {renderMealGrid()}
                </View>

                {!showContinue ? (
                    <TouchableOpacity
                        style={styles.cookButton}
                        onPress={() => handleSingleCook(order.id)}
                    >
                        <ThemedText style={styles.cookButtonText}>Cook</ThemedText>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.cookButton, styles.continueButton]}
                        onPress={handleContinue}
                    >
                        <ThemedText style={styles.cookButtonText}>Continue</ThemedText>
                    </TouchableOpacity>
                )}
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F8F9FE',
        borderRadius: 12,
        height: 420,
        margin: 6,
        overflow: 'hidden',
    },
    cardExpanded: {
        marginBottom: 24,
        height: 'auto',
    },
    cardContent: {
        padding: 16,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
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
        gap: 8,
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
    tagText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Jua',
    },
    mealsContainer: {
        flex: 1,
        marginVertical: 16,
    },
    gridRow: {
        flexDirection: 'row',
        marginBottom: 8,
        gap: 8,
    },
    gridCell: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeMoreCell: {
        justifyContent: 'center',
    },
    emptyCell: {
        backgroundColor: 'transparent',
    },
    mealName: {
        fontSize: 14,
        color: '#1C0D45',
    },
    mealQuantity: {
        fontSize: 14,
        color: '#1C0D45',
        opacity: 0.6,
        marginLeft: 8,
    },
    seeMoreText: {
        color: '#E8A85F',
        fontSize: 14,
        textAlign: 'center',
    },
    cookButton: {
        backgroundColor: '#E8A85F',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
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

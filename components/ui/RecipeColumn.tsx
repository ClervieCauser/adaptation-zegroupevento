import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useMemo, useRef } from 'react';
import DraggableOrderCircle from './DraggableOrderCircle';
import { useOrderProcessing } from '@/context/OrderProcessingContext';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Order {
    id: string;
    items: Array<{ name: string; quantity: number }>;
    time: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    zoneId?: string;
}

interface RecipeColumnProps {
    recipeName: string;
    orders: Order[];
    onDragEnd: (orderId: string, position: { x: number; y: number }) => void;
    onAddToWaitingZone: (order: Order) => void;
    autoSelectedOrders: string[];
}

const RecipeColumn: React.FC<RecipeColumnProps> = ({ 
    recipeName, 
    orders, 
    onDragEnd, 
    onAddToWaitingZone,
    autoSelectedOrders 
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [greyedOutOrders, setGreyedOutOrders] = useState<string[]>([]);
    const [showFinished, setShowFinished] = useState(false);
    const { completedOrders, getCompletedOrderIds } = useOrderProcessing();
    const completedIds = getCompletedOrderIds();

    const handleDragStart = (order: Order) => {
        setGreyedOutOrders(prev => [...prev, order.id]);
        onAddToWaitingZone(order);
    };

    const handleScroll = (event: any) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const isAtStart = contentOffset.x <= 0;
        const isAtEnd = contentOffset.x + layoutMeasurement.width >= contentSize.width;

        setShowLeftArrow(!isAtStart);
        setShowRightArrow(!isAtEnd);
    };

    const scrollTo = (direction: 'left' | 'right') => {
        if (!scrollViewRef.current) return;

        scrollViewRef.current.scrollTo({
            x: direction === 'left' ? 0 : 1000,
            animated: true,
        });
    };

    // Filtrer les commandes par recette
    const filterOrdersByRecipe = (ordersList: any[]) => {
        return ordersList.filter(order => {
            const quantities = new Map<string, number>();
            const items = order.items || [];
            items.forEach((item: { name: string; quantity: number; }) => {
                quantities.set(item.name, (quantities.get(item.name) || 0) + item.quantity);
            });
            const maxEntry = Array.from(quantities.entries())
                .reduce((max, current) => current[1] > max[1] ? current : max, ['', 0]);
            return maxEntry[0] === recipeName;
        });
    };

    // Obtenir les commandes actives et terminées pour cette recette
    const { activeOrders, completedRecipeOrders } = useMemo(() => {
        const filteredOrders = filterOrdersByRecipe(orders);
        const filteredCompletedOrders = filterOrdersByRecipe(completedOrders);

        return {
            activeOrders: filteredOrders.filter(order => !completedIds.includes(order.id)),
            completedRecipeOrders: filteredCompletedOrders
        };
    }, [orders, completedOrders, completedIds, recipeName]);

    // Sélectionner les commandes à afficher selon l'état
    const displayedOrders = showFinished ? completedRecipeOrders : activeOrders;

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.columnTitle}>{recipeName}</Text>
            <TouchableOpacity
                style={[
                    styles.toggleButton,
                    showFinished && styles.toggleButtonActive
                ]}
                onPress={() => setShowFinished(!showFinished)}
            >
                <Text style={[
                    styles.toggleButtonText,
                    showFinished && styles.toggleButtonTextActive
                ]}>
                    {showFinished ? 'Voir en cours' : `Terminées (${completedRecipeOrders.length})`}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.column}>
            {renderHeader()}

            <View style={styles.scrollContainer}>
                {showLeftArrow && (
                    <TouchableOpacity 
                        style={[styles.arrow, styles.leftArrow]}
                        onPress={() => scrollTo('left')}
                    >
                        <ChevronLeft size={24} color="#E8A85F" />
                    </TouchableOpacity>
                )}

                <ScrollView 
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <View style={styles.ordersList}>
                        {displayedOrders.length > 0 ? (
                            displayedOrders.map(order => (
                                <View 
                                    key={order.orderId || order.id} 
                                    style={[
                                        styles.orderItem,
                                        (greyedOutOrders.includes(order.id) || autoSelectedOrders.includes(order.id)) && 
                                        styles.greyedOut,
                                        showFinished && styles.completedItem
                                    ]}
                                >
                                    <DraggableOrderCircle 
                                        order={order}
                                        onDragEnd={onDragEnd}
                                        onDragStart={() => !showFinished && handleDragStart(order)}
                                        isCompleted={showFinished}
                                    />
                                </View>
                            ))
                        ) : (
                            <View>
                                <Text style={[styles.emptyText, styles.invertText]}>
                                    {showFinished ? 'Aucune commande terminée' : 'Aucune commande en cours'}
                                </Text>
                                <Text style={styles.emptyText}>
                                    {showFinished ? 'Aucune commande terminée' : 'Aucune commande en cours'}
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {showRightArrow && (
                    <TouchableOpacity 
                        style={[styles.arrow, styles.rightArrow]}
                        onPress={() => scrollTo('right')}
                    >
                        <ChevronRight size={24} color="#E8A85F" />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.bottomTitleContainer}>
                {renderHeader()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        width: 350,
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: '#E8A85F',
        position: 'relative',
        marginHorizontal: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 0,
    },
    columnTitle: {
        fontSize: 18,
        fontFamily: 'Jua',
        color: '#1C0D45',
    },
    toggleButton: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginTop: 2,
    },
    toggleButtonActive: {
        backgroundColor: '#E8A85F',
        borderColor: '#E8A85F',
    },
    toggleButtonText: {
        fontSize: 12,
        fontFamily: 'Jua',
        color: '#1C0D45',
    },
    toggleButtonTextActive: {
        color: 'white',
    },
    scrollContainer: {
        position: 'relative',
        flex: 1,
        marginVertical: 4,
    },
    scrollViewContent: {
        minHeight: 70,
        paddingTop: 0,
        maxHeight: 160,
    },
    ordersList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 2,
    },
    orderItem: {
        margin: 2,
    },
    completedItem: {
        opacity: 0.7,
        backgroundColor: '#E8F5E9',
        borderRadius: 15,
        padding: 4,
    },
    bottomTitleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ rotate: '180deg' }],
        paddingHorizontal: 12,
        marginBottom: 0,
    },
    greyedOut: {
        opacity: 0.5,
    },
    emptyText: {
        fontFamily: 'Jua',
        color: '#9E9E9E',
        fontSize: 14,
        textAlign: 'center',
    },
    invertText: {
        transform: [{ rotate: '180deg' }],
        marginBottom: 8,
    },
    arrow: {
        position: 'absolute',
        top: '40%',
        transform: [{ translateY: -12 }],
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    leftArrow: {
        left: 4,
    },
    rightArrow: {
        right: 4,
    }
});

export default RecipeColumn;
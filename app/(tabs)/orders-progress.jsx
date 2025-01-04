// app/(tabs)/orders-progress.tsx
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SearchBar from '@/components/ui/SearchBar';
import OrderCard from '@/components/ui/OrderCard';
import CustomHeader from "@/components/ui/CustomHeader";
import { useOrderProcessing } from "@/context/OrderProcessingContext";
import {useOrderSelection} from "../../context/OrderContext";

const OrdersInProgress = () => {
    const [searchText, setSearchText] = useState('');
    const [expandedCardId, setExpandedCardId] = useState(null);
    const { processingOrders } = useOrderProcessing();
    const { cleanupOrderState } = useOrderSelection();

    useEffect(() => {
        // Cleanup une seule fois
        console.log("CleanupOrderState appelé depuis OrdersInProgress");
        cleanupOrderState();
    }, [cleanupOrderState]);
    return (
        <ThemedView style={styles.container}>
            <View style={styles.topSection}>
                <CustomHeader />
                <View style={styles.searchContainer}>
                    <SearchBar value={searchText} onChangeText={setSearchText} placeholder="Rechercher par commande" />
                </View>
            </View>

            <ScrollView style={styles.mainContent}>
                <View style={styles.headerSection}>
                    <View style={styles.titleContainer}>
                        <ThemedText style={styles.title}>Commandes en cours</ThemedText>
                    </View>
                </View>

                <View style={styles.scrollableContent}>
                    <View style={styles.ordersGrid}>
                        {processingOrders.map((processingOrder) => {
                            const completedItems = processingOrder.items.filter(item => item.isReady).length;
                            const totalItems = processingOrder.items.length;

                            return (
                                <OrderCard
                                    key={`order-${processingOrder.orderId}`}
                                    order={{
                                        id: processingOrder.orderId,
                                        items: processingOrder.items,
                                        status: 'IN_PROGRESS',
                                        time: `${completedItems}/${totalItems} ready`
                                    }}
                                    expanded={expandedCardId === processingOrder.orderId}
                                    onToggleExpand={() => setExpandedCardId(
                                        expandedCardId === processingOrder.orderId ? null : processingOrder.orderId
                                    )}
                                    showContinue={true}
                                    isSelectMode={false}
                                    isSelected={false}
                                    onSelect={() => {}}
                                />
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F7FA',
        paddingTop: 24,
    },
    topSection: {
        backgroundColor: '#F9F7FA',
    },
    searchContainer: {
        marginLeft: 15,
        marginRight: 15,
    },
    headerSection: {
        padding: 24,
        backgroundColor: '#F9F7FA',
        zIndex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Jua',
        color: '#1C0D45',
    },
    scrollableContent: {
        flex: 1,
        paddingHorizontal: 24,
    },
    ordersGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        paddingBottom: 80,
        alignItems: 'flex-start',
    },
});

export default OrdersInProgress;

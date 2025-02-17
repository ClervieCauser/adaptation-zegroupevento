// app/(tabs)/orders-progress.tsx
import React, {useEffect, useMemo, useState} from 'react';
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

    // Grouper les ordres par groupId
    const [expandedCardId, setExpandedCardId] = useState(null);
    const { processingOrders } = useOrderProcessing();
    const { cleanupOrderState } = useOrderSelection();

    // Grouper les ordres par groupId
    const groupedOrders = useMemo(() => {
        const groups = {};
        processingOrders.forEach(order => {
            if (!groups[order.groupId]) {
                groups[order.groupId] = [];
            }
            groups[order.groupId].push(order);
        });
        return Object.values(groups);
    }, [processingOrders]);

    useEffect(() => {
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
                        {groupedOrders.map((group) => {

                            const orderGroup = group[0];
                            const groupIds = group.map(order => order.orderId);
                            const completedItems = group.reduce((sum, order) =>
                                sum + order.items.filter(item => item.isReady).reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
                            const totalItems = group.reduce((sum, order) =>
                                sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);


                            const aggregatedItems = group.reduce((acc, order) => {
                                order.items.forEach(item => {
                                    const key = item.name;
                                    if (!acc[key]) {
                                        acc[key] = {
                                            name: key,
                                            quantity: 0,
                                            readyCount: 0,
                                            isReady: false
                                        };
                                    }
                                    acc[key].quantity += item.quantity;
                                    if (item.isReady) {
                                        acc[key].readyCount += item.quantity;
                                        acc[key].isReady = acc[key].readyCount === acc[key].quantity;
                                    }
                                });
                                return acc;
                            }, {});

                            const readyOrders = group.map(order => {
                                return order.items.every(item => item.isReady) ? order.orderId : null
                            }).filter(Boolean);

                            const isOrderReady = (orderIdToCheck) => {
                                return group.find(o => o.orderId === orderIdToCheck)?.items.every(item => item.isReady);
                            };
                            return (
                                <OrderCard
                                    key={`order-${orderGroup.groupId}`}
                                    order={{
                                        id: groupIds.join(', #'),
                                        items: Object.values(aggregatedItems),
                                        status: 'IN_PROGRESS',
                                        time: `${completedItems}/${totalItems} prêts`,
                                        groupId: orderGroup.groupId,
                                        readyOrders: readyOrders
                                    }}
                                    expanded={expandedCardId === orderGroup.groupId}
                                    onToggleExpand={() => setExpandedCardId(
                                        expandedCardId === orderGroup.groupId ? null : orderGroup.groupId
                                    )}
                                    showContinue={true}
                                    isSelectMode={false}
                                    isSelected={false}
                                    showProgress={true}
                                    onSelect={() => {}}
                                    showButton={true}
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

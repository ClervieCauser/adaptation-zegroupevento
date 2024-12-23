// app/(tabs)/orders.tsx
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SearchBar from '@/components/ui/SearchBar';
import OrderCard from '@/components/ui/OrderCard';
import { MOCK_ORDERS } from '@/types/order';
import { router } from 'expo-router';

const FilterButton = ({ label, active, onPress }) => (
    <TouchableOpacity
        style={[styles.filterButton, active && styles.filterButtonActive]}
        onPress={onPress}
    >
        <ThemedText style={[styles.filterText, active && styles.filterTextActive]}>
            {label}
        </ThemedText>
    </TouchableOpacity>
);

const PendingOrders = () => {
    const [searchText, setSearchText] = useState('');
    const [activeFilter, setActiveFilter] = useState('Meal');
    const [expandedCardId, setExpandedCardId] = useState(null);

    const handleCookPress = () => {
        router.push('/pages/recipe');
      };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.headerSection}>
                <SearchBar value={searchText} onChangeText={setSearchText} />

                <View style={styles.filtersContainer}>
                    {/* ... FilterButtons restent les mêmes ... */}
                </View>

                <View style={styles.titleContainer}>
                    <ThemedText style={styles.title}>Pending orders</ThemedText>
                    <TouchableOpacity style={styles.selectButton}>
                        <ThemedText style={styles.selectButtonText}>Select</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Zone scrollable pour les cartes */}
            <View style={styles.scrollableContent}>
                <View style={styles.ordersGrid}>
                    {MOCK_ORDERS.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            expanded={expandedCardId === order.id}
                            onToggleExpand={() => {
                                setExpandedCardId(expandedCardId === order.id ? null : order.id);
                            }}
                            onCook={() => {
                                console.log('Cook order:', order.id);
                                handleCookPress();
                            }}
                        />
                    ))}
                </View>
            </View>

            {/* Pagination en bas fixe */}
            <View style={styles.paginationContainer}>
                <View style={styles.pagination}>
                    {[1, 2, '...', 4, 5].map((page, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.pageButton,
                                typeof page === 'number' && page === 1 && styles.pageButtonActive,
                            ]}
                        >
                            <ThemedText style={styles.pageButtonText}>{page}</ThemedText>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.nextButton}>
                        <ThemedText style={styles.nextButtonText}>Next</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F7FA',
    },
    header: {
        paddingHorizontal: 32,
        paddingTop: 32,
        paddingBottom: 16,
        backgroundColor: '#F9F7FA',
    },
    headerSection: {
        padding: 24,
        backgroundColor: '#F9F7FA',
        zIndex: 1,
    },

    filtersContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
        marginBottom: 32,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E8A85F',
    },
    filterButtonActive: {
        backgroundColor: '#E8A85F',
    },
    filterText: {
        color: '#E8A85F',
        fontFamily: 'Jua',
    },
    filterTextActive: {
        color: '#FFFFFF',
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
    selectButton: {
        backgroundColor: '#E8A85F',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    selectButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
    },
    cardsOuterContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    cardsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 32,
    },
    pageButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8A85F',
    },
    pageButtonActive: {
        backgroundColor: '#E8A85F',
    },
    pageButtonText: {
        fontFamily: 'Jua',
        color: '#E8A85F',
    },
    pageButtonTextActive: {
        color: '#FFFFFF',
    },
    nextButton: {
        backgroundColor: '#E8A85F',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginLeft: 8,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
    },
    scrollableContent: {
        flex: 1,
        paddingHorizontal: 24,
        overflow: 'auto', // Pour permettre le scroll sur web
    },

    ordersGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        paddingBottom: 80,
        alignItems: 'flex-start', // Important pour que les cartes s'alignent correctement
    },
    paginationContainer: {
        position: 'sticky',
        bottom: 0,
        backgroundColor: '#F9F7FA',
        padding: 24,
        borderTop: '1px solid #EAEAEA',
    },
});

export default PendingOrders;

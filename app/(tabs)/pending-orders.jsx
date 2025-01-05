import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SearchBar from '@/components/ui/SearchBar';
import OrderCard from '@/components/ui/OrderCard';
import { MOCK_ORDERS } from '@/types/order';
import { MOCK_USER } from '@/types/user';
import { router } from 'expo-router';
import CustomHeader from "../../components/ui/CustomHeader";
import { useOrderSelection } from "@/context/OrderContext";
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import { Columns } from 'lucide-react';


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
    const [currentPage, setCurrentPage] = useState(1);
    const { isTablet } = useResponsiveLayout();

    const {
        isSelectMode,
        selectedIds,
        toggleSelectMode,
        toggleOrderSelection,
        handleCookSelected,
        handleSingleCook,
        resetOrders,
    } = useOrderSelection();

    const { pendingOrders } = useOrderSelection();

    const isNoviceUser = MOCK_USER.level === 'NOVICE';
    const ORDERS_PER_PAGE = isNoviceUser ? 4 : 2;

    const filterOrdersByUserLevel = (orders) => {
        if (isNoviceUser) {
            return orders.filter((order) => order.items.length <= 4);
        }
        return orders;
    };

    const filteredOrders = filterOrdersByUserLevel(pendingOrders);

    const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ORDERS_PER_PAGE,
        currentPage * ORDERS_PER_PAGE
    );

    const handleCookPress = (orderId) => {
        const targetRoute = MOCK_USER.level === 'EXPERT' ? '/recipe-prep' : '/recipe';
        setSelectionState(prev => ({ ...prev, orderToCook: orderId }));
        router.push(targetRoute);
    };

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
                    <View style={styles.filtersContainer}>
                        {/* Les FilterButtons restent les mêmes */}
                    </View>

                    <View style={[styles.titleContainer, {flexDirection: isTablet ? 'row' : 'column'}]}>
                        <ThemedText style={styles.title}>Commandes en attente</ThemedText>
                        {!isSelectMode && !isNoviceUser ? (
                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={toggleSelectMode}
                            >
                                <ThemedText style={styles.selectButtonText}>Selectionner</ThemedText>
                            </TouchableOpacity>
                        ) : (
                            isSelectMode && (
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        style={styles.cookButton}
                                        onPress={() => handleCookSelected()}
                                    >
                                        <ThemedText style={styles.cookButtonText}>
                                            Cook({selectedIds.length})
                                        </ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={toggleSelectMode}
                                    >
                                        <ThemedText style={styles.cancelButtonText}>Annuler</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            )
                        )}
                    </View>
                </View>

                {/* Zone scrollable pour les cartes */}
                <View style={styles.scrollableContent}>
                    <View style={styles.ordersGrid}>
                        {paginatedOrders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                expanded={expandedCardId === order.id}
                                onToggleExpand={() =>
                                    setExpandedCardId(expandedCardId === order.id ? null : order.id)
                                }
                                onCook={() => handleSingleCook(order.id)}
                                isSelectMode={isSelectMode}
                                isSelected={selectedIds.includes(order.id)}
                                onSelect={toggleOrderSelection}
                                showProgress={false}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Pagination en bas fixe */}
            <View style={styles.paginationContainer}>
                <View style={styles.pagination}>
                    {currentPage > 1 && (
                        <TouchableOpacity style={styles.prevButton} onPress={handlePreviousPage}>
                            <ThemedText style={styles.prevButtonText}>Precedent</ThemedText>
                        </TouchableOpacity>
                    )}
                    {[...Array(totalPages)].map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.pageButton,
                                currentPage === index + 1 && styles.pageButtonActive,
                            ]}
                            onPress={() => handlePageChange(index + 1)}
                        >
                            <ThemedText
                                style={[
                                    styles.pageButtonText,
                                    currentPage === index + 1 && styles.pageButtonTextActive,
                                ]}
                            >
                                {index + 1}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                    {currentPage < totalPages && (
                        <TouchableOpacity style={styles.nextButton} onPress={handleNextPage}>
                            <ThemedText style={styles.nextButtonText}>Suivant</ThemedText>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F7FA',
        paddingTop: 24,
    },
    header: {
        paddingHorizontal: 32,
        paddingTop: 32,
        backgroundColor: '#F9F7FA',
    },
    headerSection: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 6,
        backgroundColor: '#F9F7FA',
        zIndex: 1,
    },
    searchContainer:{
        marginLeft: 15,
        marginRight: 15,
    },
    filtersContainer: {
        flexDirection: 'row',
        gap: 12,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Jua',
        color: '#1C0D45',
        marginBottom: 8,
        marginTop: 8,
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
    prevButton: {
        backgroundColor: '#E8A85F',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginRight: 8,
    },
    prevButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
    },
    scrollableContent: {
        flex: 1,
        paddingHorizontal: 24,
        height: 'calc(100vh - 300px)',
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
        scrollbarColor: '#E8A85F #F9F7FA',
    },
    ordersGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 16,
        paddingBottom: 80,
    },
    paginationContainer: {
        position: 'sticky',
        bottom: 10,
        backgroundColor: '#F9F7FA',
        borderTop: '1px solid #EAEAEA',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    cancelButton: {
        backgroundColor: '#E8A85F',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
    },
    cookButton: {
        backgroundColor: '#E8A85F',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    cookButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
    },
    resetButton: {
        backgroundColor: '#E8A85F',
        padding: 4,
        borderRadius: 8,
        marginBottom: 5,
        width: 100,
    },
    resetButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
    },
});

export default PendingOrders;

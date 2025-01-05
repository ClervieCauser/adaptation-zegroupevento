// OrderContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { router } from 'expo-router';
import { MOCK_USER } from '@/types/user';
import { MOCK_ORDERS, Order } from '@/types/order';
import { useOrderProcessing } from "@/context/OrderProcessingContext";
import { recipes } from '../app/recipe';

type OrderSelectionContextType = {
    selectedIds: string[];
    orderToCook: string | null;
    isSelectMode: boolean;
    pendingOrders: Order[];
    toggleSelectMode: () => void;
    toggleOrderSelection: (orderId: string) => void;
    handleCookSelected: () => void;
    handleSingleCook: (orderId: string) => void;
    getOrdersToShow: () => string[];
    resetSelection: () => void;
    markOrdersAsInProgress: (orderIds: string[]) => void;
};

const OrderSelectionContext = createContext<OrderSelectionContextType | undefined>(undefined);

export const OrderSelectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [orderToCook, setOrderToCook] = useState<string | null>(null);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [pendingOrders, setPendingOrders] = useState<Order[]>(MOCK_ORDERS);
    const { addOrderToProcessing, processingOrders } = useOrderProcessing();

    const markOrdersAsInProgress = useCallback((orderIds: string[]) => {
        setPendingOrders(prev => prev.filter(order => !orderIds.includes(order.id)));
    }, []);

    const toggleSelectMode = useCallback(() => {
        setIsSelectMode(prev => !prev);
        setSelectedIds([]); // Reset selection when toggling mode
    }, []);

    const toggleOrderSelection = useCallback((orderId: string) => {
        setSelectedIds(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    }, []);

    const handleCookSelected = useCallback(() => {
        if (selectedIds.length > 0) {
            const groupId = `group_${Date.now()}`;
            const selectedOrders = pendingOrders.filter(order => selectedIds.includes(order.id));

            selectedOrders.forEach(order => {
                addOrderToProcessing(order, groupId);
            });

            setPendingOrders(prev => prev.filter(order => !selectedIds.includes(order.id)));
            router.push('/recipe-prep');
        }
    }, [selectedIds, pendingOrders, addOrderToProcessing]);

    const handleSingleCook = useCallback(
        (orderId: string, groupId?: string) => {
            if (MOCK_USER.level === 'EXPERT') {
                setSelectedIds([]); // Clear previous selections

                if (groupId) {
                    // Pour les ordres déjà en cours
                    const groupOrders = processingOrders.filter(o => o.groupId === groupId);
                    const orderIds = groupOrders.map(o => o.orderId);
                    setSelectedIds(orderIds);
                } else {
                    // Pour les nouvelles commandes
                    const order = pendingOrders.find(o => o.id === orderId);
                    if (order) {
                        const newGroupId = `single_${orderId}`;
                        addOrderToProcessing(order, newGroupId);
                        setPendingOrders(prev => prev.filter(o => o.id !== orderId));
                        setSelectedIds([orderId]);
                    }
                }
                router.push('/recipe-prep');
            } else {
                const order = pendingOrders.find(o => o.id === orderId);
                if (order) {
                    const recipeIds = order.items
                        .map(item => recipes.find(recipe => recipe.name === item.name)?.id)
                        .filter(Boolean);

                    if (recipeIds.length > 0) {
                        router.push({
                            pathname: '/recipe',
                            params: { id: recipeIds.join(','),
                                    reset: 1,
                                    orderId: orderId
                             }, // Utilisation correcte de `query` dans next/router
                        });
                    }
                }
            }
        },
        [pendingOrders, addOrderToProcessing, processingOrders, router]
    );


    const getOrdersToShow = useCallback(() => {
        if (orderToCook) return [orderToCook];

        const selectedOrders = processingOrders.filter(order => selectedIds.includes(order.orderId));
        if (selectedOrders.length > 0) {
            const groupId = selectedOrders[0].groupId;
            return processingOrders
                .filter(order => order.groupId === groupId)
                .map(order => order.orderId);
        }

        return selectedIds;
    }, [orderToCook, selectedIds, processingOrders]);

    const resetSelection = useCallback(() => {
        setIsSelectMode(false);
        setSelectedIds([]);
        setOrderToCook(null);
    }, []);

    const cleanupOrderState = useCallback(() => {
        setOrderToCook(null);
        setSelectedIds([]);
        setIsSelectMode(false);
    }, []);

    return (
        <OrderSelectionContext.Provider value={{
            selectedIds,
            orderToCook,
            isSelectMode,
            pendingOrders,
            toggleSelectMode,
            toggleOrderSelection,
            handleCookSelected,
            handleSingleCook,
            getOrdersToShow,
            resetSelection,
            markOrdersAsInProgress,
            cleanupOrderState,
        }}>
            {children}
        </OrderSelectionContext.Provider>
    );
};

export const useOrderSelection = () => {
    const context = useContext(OrderSelectionContext);
    if (context === undefined) {
        throw new Error('useOrderSelection must be used within an OrderSelectionProvider');
    }
    return context;
};

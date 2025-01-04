// context/OrderContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { router } from 'expo-router';
import { MOCK_USER } from '@/types/user';
import { MOCK_ORDERS, Order } from '@/types/order';
import {useOrderProcessing} from "@/context/OrderProcessingContext";

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
        if (isSelectMode) {
            setSelectedIds([]);
        }
    }, [isSelectMode]);

    const toggleOrderSelection = useCallback((orderId: string) => {
        setSelectedIds(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    }, []);

    const handleCookSelected = useCallback(() => {
        if (selectedIds.length > 0) {
            const groupId = Date.now().toString();
            selectedIds.forEach(id => {
                const order = pendingOrders.find(o => o.id === id);
                if (order) addOrderToProcessing(order, groupId);
            });
            // Retire les commandes sélectionnées
            setPendingOrders(prev => prev.filter(order => !selectedIds.includes(order.id)));
            router.push('/recipe-prep');
        }
    }, [selectedIds, pendingOrders, addOrderToProcessing]);

    const handleSingleCook = useCallback((orderId: string, groupId?: string) => {
        if (groupId) {
            // Logique existante pour les commandes déjà en processing
            const order = processingOrders.find(o => o.groupId === groupId);
            if (order) {
                setSelectedIds(processingOrders
                    .filter(o => o.groupId === groupId)
                    .map(o => o.orderId)
                );
            }
        } else {
            // Nouvelle commande à mettre en processing
            const order = pendingOrders.find(o => o.id === orderId);
            if (order) {
                addOrderToProcessing(order, orderId);
                setPendingOrders(prev => prev.filter(o => o.id !== orderId));
                setSelectedIds([orderId]);
            }
        }
        router.push('/recipe-prep');
    }, [processingOrders, pendingOrders, addOrderToProcessing]);

    const getOrdersToShow = useCallback(() => {
        return orderToCook ? [orderToCook] : selectedIds;
    }, [orderToCook, selectedIds]);

    const resetSelection = useCallback(() => {
        setIsSelectMode(false);
        setSelectedIds([]);
        setOrderToCook(null);
    }, []);

    const resetOrders = useCallback(() => {
        setPendingOrders(MOCK_ORDERS);
    }, []);

    const cleanupOrderState = useCallback(() => {
        setOrderToCook(null);
        setSelectedIds([]);
        setIsSelectMode(false);
    }, []);


    const value = {
        selectedIds,
        orderToCook,
        isSelectMode,
        toggleSelectMode,
        toggleOrderSelection,
        handleCookSelected,
        handleSingleCook,
        getOrdersToShow,
        resetSelection
    };

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
            resetOrders,
            cleanupOrderState
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

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
            selectedIds.forEach(id => {
                const order = pendingOrders.find(o => o.id === id);
                if (order) addOrderToProcessing(order);
            });
            setOrderToCook(null); // Clear orderToCook when using selection
            markOrdersAsInProgress(selectedIds);
            router.push('/recipe-prep');
        }
    }, [selectedIds, pendingOrders, markOrdersAsInProgress]);

    const handleSingleCook = useCallback((orderId: string) => {
        const existingOrder = processingOrders.find(o => o.orderId === orderId);
        setOrderToCook(orderId);
        setSelectedIds([]);

        if (!existingOrder) {
            const order = pendingOrders.find(o => o.id === orderId);
            if (order) {
                addOrderToProcessing(order);
            }
        }

        router.push('/recipe-prep');
    }, [pendingOrders, processingOrders]);

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

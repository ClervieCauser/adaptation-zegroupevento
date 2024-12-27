// context/OrderContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { router } from 'expo-router';
import { MOCK_USER } from '@/types/user';

type OrderSelectionContextType = {
    selectedIds: string[];
    orderToCook: string | null;
    isSelectMode: boolean;
    toggleSelectMode: () => void;
    toggleOrderSelection: (orderId: string) => void;
    handleCookSelected: () => void;
    handleSingleCook: (orderId: string) => void;
    getOrdersToShow: () => string[];
    resetSelection: () => void;
};

const OrderSelectionContext = createContext<OrderSelectionContextType | undefined>(undefined);

export const OrderSelectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [orderToCook, setOrderToCook] = useState<string | null>(null);
    const [isSelectMode, setIsSelectMode] = useState(false);

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
            router.push(MOCK_USER.level === 'EXPERT' ? '/recipe-prep' : '/recipe');
        }
    }, [selectedIds]);

    const handleSingleCook = useCallback((orderId: string) => {
        setOrderToCook(orderId);
        router.push(MOCK_USER.level === 'EXPERT' ? '/recipe-prep' : '/recipe');
    }, []);

    const getOrdersToShow = useCallback(() => {
        return orderToCook ? [orderToCook] : selectedIds;
    }, [orderToCook, selectedIds]);

    const resetSelection = useCallback(() => {
        setIsSelectMode(false);
        setSelectedIds([]);
        setOrderToCook(null);
        router.push('/pending-orders');
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
        <OrderSelectionContext.Provider value={value}>
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

// context/OrderContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { router } from 'expo-router';
import { MOCK_USER } from '@/types/user';
import { MOCK_ORDERS, Order } from '@/types/order';
import {useOrderProcessing} from "@/context/OrderProcessingContext";
import {recipes} from "../app/recipe";

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
            router.push('/recipe-prep');
        }
    }, [selectedIds, pendingOrders]);

    const handleSingleCook = useCallback((orderId: string, groupId?: string) => {
        if(MOCK_USER.level === 'EXPERT') {
            const order = processingOrders.find(o => o.groupId === groupId);
            if (order) {
                setSelectedIds(processingOrders
                    .filter(o => o.groupId === groupId)
                    .map(o => o.orderId)
                );
            }
            router.push('/recipe-prep');
        } else if(MOCK_USER.level === 'NOVICE') {
            const order = pendingOrders.find(o => o.id === orderId);

            // Vérifie si l'ordre est trouvé et récupère les recettes en fonction de leur nom
            const recipeIds = order?.items
            .map(item => recipes.find(recipe => recipe.name === item.name)?.id)
            .filter(Boolean);  // On filtre les IDs undefined s'il y en a
            if(recipeIds.length > 0) {
            // Si des IDs de recettes sont trouvés, redirige vers la page correspondante
            if (recipeIds.length > 0) {
            router.push({
                pathname: '/recipe',
                params: { id: recipeIds.join(',') },  // On joint les ids par des virgules dans la query
            });
            } else {
            // Gérer le cas où aucune recette n'est trouvée
            console.log("Aucune recette trouvée pour cet ordre");
                }
            }
        }
    }, [processingOrders]);

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

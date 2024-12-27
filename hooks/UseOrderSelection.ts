import { useState } from "react";
import { MOCK_USER } from "@/types/user";
import { router } from "expo-router";

let globalState = {
    selectedIds: [],
    orderToCook: null,
    isSelectMode: false
};

export const useOrderSelection = () => {
    const [selectionState, setSelectionState] = useState(globalState);

    const updateState = (newState) => {
        globalState = {...newState};
        setSelectionState({...newState});
    };

    const handleSingleCook = (orderId) => {
        updateState({...globalState, orderToCook: orderId});
        router.push(MOCK_USER.level === 'EXPERT' ? '/recipe-prep' : '/recipe');
    };

    const handleCookSelected = () => {
        if (selectionState.selectedIds.length > 0) {
            router.push(MOCK_USER.level === 'EXPERT' ? '/recipe-prep' : '/recipe');
        }
    };

    const toggleSelectMode = () => updateState({
        ...globalState,
        isSelectMode: !globalState.isSelectMode
    });

    const resetSelection = () => {
        globalState = {
            isSelectMode: false,
            selectedIds: [],
            orderToCook: null
        };
        setSelectionState({...globalState});
        router.push('/pending-orders');
    };

    const toggleOrderSelection = (orderId) => updateState({
        ...globalState,
        selectedIds: globalState.selectedIds.includes(orderId)
            ? globalState.selectedIds.filter(id => id !== orderId)
            : [...globalState.selectedIds, orderId]
    });

    const getOrdersToShow = () => selectionState.orderToCook ? [selectionState.orderToCook] : selectionState.selectedIds;

    return {
        ...selectionState,
        toggleSelectMode,
        toggleOrderSelection,
        handleCookSelected,
        handleSingleCook,
        getOrdersToShow,
        resetSelection
    };
};

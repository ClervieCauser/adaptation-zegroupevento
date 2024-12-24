// hooks/useOrderSelection.js
import {useState} from "react";

export const useOrderSelection = () => {
    const [selectionState, setSelectionState] = useState({
        isSelectMode: false,
        selectedIds: []
    });

    const toggleSelectMode = () => setSelectionState(prev => ({
        ...prev,
        isSelectMode: !prev.isSelectMode,
        selectedIds: []
    }));

    const toggleOrderSelection = (orderId) => setSelectionState(prev => ({
        ...prev,
        selectedIds: prev.selectedIds.includes(orderId)
            ? prev.selectedIds.filter(id => id !== orderId)
            : [...prev.selectedIds, orderId]
    }));

    return {
        ...selectionState,
        toggleSelectMode,
        toggleOrderSelection
    };
};

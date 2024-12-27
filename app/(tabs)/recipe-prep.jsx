// app/(tabs)/recipe-prep.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';
import CustomHeader from '@/components/ui/CustomHeader';
import { useOrderSelection } from '@/hooks/UseOrderSelection';
import {router} from "expo-router";



const DisplayOption = ({ mode, isSelected, onSelect }) => (
    <TouchableOpacity
        style={[styles.displayOption, isSelected && styles.selectedOption]}
        onPress={() => onSelect(mode)}
    >
        <View style={[styles.preview, styles[`preview${mode}`]]}>
            {Array(parseInt(mode)).fill(0).map((_, i) => (
                <View key={i} style={styles.previewCell} />
            ))}
        </View>
    </TouchableOpacity>
);

const RecipePrep = () => {
    const { selectedIds,getOrdersToShow, resetSelection  } = useOrderSelection();
    const [displayMode, setDisplayMode] = useState('4');
    const [showSettings, setShowSettings] = useState(true);

    const ordersToDisplay = getOrdersToShow();

    const handleValidate = () => {
        setShowSettings(false);
    };

    const handleBack = () => {
        resetSelection();
        console.log("je go back");
    };

    console.log(ordersToDisplay);

    return (
        <ThemedView style={styles.container}>
            <CustomHeader />

            <View style={styles.content}>
                <View style={styles.ordersList}>
                    <ThemedText style={styles.ordersTitle}>ORDERS:</ThemedText>
                    {ordersToDisplay.map(id => (
                        <View key={id} style={styles.orderTag}>
                            <ThemedText style={styles.tagText}>#{id}</ThemedText>
                        </View>
                    ))}
                </View>

                <View style={styles.mainArea}>
                    {showSettings ? (
                        <View style={styles.settingsModal}>
                            <ThemedText style={styles.modalTitle}>Choose your display setting</ThemedText>
                            <View style={styles.optionsGrid}>
                                {['1', '2', '3', '4'].map(mode => (
                                    <DisplayOption
                                        key={mode}
                                        mode={mode}
                                        isSelected={displayMode === mode}
                                        onSelect={setDisplayMode}
                                    />
                                ))}
                            </View>
                            <CustomButton
                                title="VALIDATE"
                                containerStyles={styles.validateButton}
                                onPress={handleValidate}
                            />
                        </View>
                    ) : (
                        <View style={styles.dragArea}>
                            <ThemedText>DRAG AN ORDER +</ThemedText>
                        </View>
                    )}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={[styles.backButton, { padding: 10, borderRadius: 8 }]}
                    >
                        <ThemedText style={{ color: '#FFF' }}>Back</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowSettings(true)}>
                        <ThemedText>Change display</ThemedText>
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
    content: {
        flex: 1,
        padding: 24,
    },
    ordersList: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },

    orderTag: {
        backgroundColor: '#E8A85F',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    mainArea: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#E8A85F',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton:{
        backgroundColor:'#E8A85F',
    },
    settingsModal: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#F8F9FE',
        padding: 24,
        borderRadius: 12,
    },
    optionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 24,
    },
    displayOption: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 8,
    },
    selectedOption: {
        borderColor: '#E8A85F',
        backgroundColor: '#FDF4E7',
    },
    preview: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#E8A85F',
    },
    validateButton: {
        backgroundColor: '#E8A85F',
        marginTop: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },
    dragArea: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#E8A85F',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ordersTitle: {
        fontSize: 18,
        color: '#1C0D45', // Changed to dark color
        fontFamily: 'Jua',
    },
    modalTitle: {
        fontSize: 20,
        color: '#1C0D45', // Changed to dark color
        fontFamily: 'Jua',
        textAlign: 'center',
    },
    tagText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
    },
});

export default RecipePrep;

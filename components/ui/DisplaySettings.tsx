import {useState} from "react";
import {DisplayConfig, DisplayMode} from "@/types/display";
import {MOCK_ORDERS} from "@/types/order";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';


export const DisplaySettings = ({ onValidate, selectedMode, onModeChange }) => (
    <View style={styles.modalContent}>
        <ThemedText style={styles.modalTitle}>Choose your display setting</ThemedText>
        <View style={styles.displayOptions}>
            {['1', '2', '3', '4'].map((mode) => (
                <DisplayOption
                    key={mode}
                    mode={mode}
                    isSelected={selectedMode === mode}
                    onSelect={onModeChange}
                />
            ))}
        </View>
        <CustomButton title="VALIDATE" onPress={onValidate} />
    </View>
);

const DisplayOption = ({ mode, isSelected, onSelect }) => (
    <TouchableOpacity
        style={[styles.displayOption, isSelected && styles.selectedOption]}
        onPress={() => onSelect(mode)}
    >
        <View style={[styles.displayContent]}>
            {mode === '1' && (
                <View style={styles.bigSquare} />
            )}
            {mode === '2' && (
                <View style={styles.horizontalLayout}>
                    <View style={styles.verticalRectangle} />
                    <View style={styles.verticalRectangle} />
                </View>
            )}
            {mode === '3' && (
                <View>
                    <View style={styles.horizontalLayout}>
                        <View style={styles.square} />
                        <View style={styles.square} />
                    </View>
                    <View style={styles.horizontalRectangle} />
                </View>
            )}
            {mode === '4' && (
                <View>
                    <View style={styles.horizontalLayout}>
                        <View style={styles.square} />
                        <View style={styles.square} />
                    </View>
                    <View style={styles.horizontalLayout}>
                        <View style={styles.square} />
                        <View style={styles.square} />
                    </View>
                </View>
            )}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    displayOption: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 8,
        padding: 10,
    },
    selectedOption: {
        borderColor: '#E8A85F',
        borderWidth: 2,
        backgroundColor: '#FDF4E7',
    },
    displayContent: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontalLayout: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 5,
    },
    bigSquare: {
        aspectRatio: 1,
        height: '100%',
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 4,
    },
    verticalRectangle: {
        flex: 1,
        height: '100%',
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 4,
    },
    horizontalRectangle: {
        height: 30,
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 4,
    },
    square: {
        flex: 1,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 4,
    },
    previewOne: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    singleSquare: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#E8A85F',
    },
    previewTwo: {
        width: 60,
        height: 60,
        flexDirection: 'row',
        gap: 4,
    },
    rectangle: {
        flex: 1,
        height: '100%',
        borderWidth: 1,
        borderColor: '#E8A85F',
    },
    previewThree: {
        width: 60,
        height: 60,
        gap: 4,
    },
    topRow: {
        flexDirection: 'row',
        gap: 4,
        height: '50%',
    },

    bottomRectangle: {
        height: '50%',
        borderWidth: 1,
        borderColor: '#E8A85F',
    },
    previewFour: {
        width: 60,
        height: 60,
        gap: 4,
    },
    row: {
        flexDirection: 'row',
        gap: 4,
        flex: 1,
    },
    smallSquare: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E8A85F',
    },
});

export default DisplaySettings;

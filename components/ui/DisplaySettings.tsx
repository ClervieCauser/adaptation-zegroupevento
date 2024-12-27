import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/ui/CustomButton';

export const DisplaySettings = ({ onValidate, selectedMode, onModeChange }) => (
    <View style={styles.settingsModal}>
        <ThemedText style={styles.modalTitle}>Choose your display setting</ThemedText>
        <View style={styles.optionsGrid}>
            {['1', '2', '3', '4'].map((mode) => (
                <DisplayOption
                    key={mode}
                    mode={mode}
                    isSelected={selectedMode === mode}
                    onSelect={onModeChange}
                />
            ))}
        </View>
        <CustomButton
            title="VALIDATE"
            containerStyles={styles.validateButton}
            onPress={onValidate}
        />
    </View>
);

const DisplayOption = ({ mode, isSelected, onSelect }) => (
    <TouchableOpacity
        style={[styles.displayOption, isSelected && styles.selectedOption]}
        onPress={() => onSelect(mode)}
    >
        <View style={[styles.checkMarkContainer, isSelected && styles.checkMarkContainerSelected]}>
            <View style={[styles.checkMark, isSelected && styles.checkMarkSelected]} />
        </View>
        <View style={styles.optionContent}>
            {/* Option 1: Un seul grand carré */}
            {mode === '1' && (
                <View style={styles.singleSquare} />
            )}

            {/* Option 2: Deux rectangles verticaux */}
            {mode === '2' && (
                <View style={styles.twoVerticalContainer}>
                    <View style={styles.verticalRect} />
                    <View style={styles.verticalRect} />
                </View>
            )}

            {/* Option 3: Deux carrés en haut et un rectangle en bas */}
            {mode === '3' && (
                <View style={styles.threeLayout}>
                    <View style={styles.topRow}>
                        <View style={styles.square} />
                        <View style={styles.square} />
                    </View>
                    <View style={styles.bottomRect} />
                </View>
            )}

            {/* Option 4: Quatre carrés en grille 2x2 */}
            {mode === '4' && (
                <View style={styles.fourLayout}>
                    <View style={styles.gridRow}>
                        <View style={styles.square} />
                        <View style={styles.square} />
                    </View>
                    <View style={styles.gridRow}>
                        <View style={styles.square} />
                        <View style={styles.square} />
                    </View>
                </View>
            )}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    settingsModal: {
        width: '100%',
        maxWidth: 600,
        padding: 24,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: 'Jua',
        color: '#1C0D45',
        marginBottom: 32,
    },
    optionsGrid: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 32,
    },
    displayOption: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E8A85F',
        padding: 10,
        position: 'relative',
    },
    selectedOption: {
        borderWidth: 2,
        backgroundColor: '#FDF4E7',
    },
    checkMarkContainer: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E8A85F',
        backgroundColor: 'white',
        zIndex: 1,
    },
    checkMarkContainerSelected: {
        backgroundColor: '#E8A85F',
    },
    optionContent: {
        flex: 1,
        padding: 5,
    },
    singleSquare: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 4,
    },
    twoVerticalContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
    },
    verticalRect: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 4,
    },
    threeLayout: {
        flex: 1,
        gap: 5,
    },
    topRow: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
    },
    square: {
        flex: 1,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 4,
    },
    bottomRect: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E8A85F',
        borderRadius: 4,
    },
    fourLayout: {
        flex: 1,
        gap: 5,
    },
    gridRow: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
    },
    validateButton: {
        backgroundColor: '#E8A85F',
        paddingHorizontal: 48,
        paddingVertical: 12,
        borderRadius: 24,
    },
});

export default DisplaySettings;

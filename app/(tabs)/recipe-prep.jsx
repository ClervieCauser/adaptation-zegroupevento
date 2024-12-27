import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CustomHeader from '@/components/ui/CustomHeader';
import { useOrderSelection } from '@/context/OrderContext';
import DisplaySettings from '@/components/ui/DisplaySettings';
import DragAreaLayout from '@/components/ui/DragAreaLayout';



const RecipePrep = () => {
    const { getOrdersToShow, resetSelection } = useOrderSelection();
    const [displayMode, setDisplayMode] = useState('4');
    const [showSettings, setShowSettings] = useState(true);
    const ordersToDisplay = getOrdersToShow();

    const handleValidate = () => {
        console.log('Validate clicked, current showSettings:', showSettings);
        setShowSettings(false);
        console.log('ShowSettings set to false');
    };

    console.log('Rendering RecipePrep, showSettings:', showSettings);

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

                <View style={[styles.mainArea, showSettings && styles.mainAreaSettings]}>
                    {showSettings ? (
                        <DisplaySettings
                            selectedMode={displayMode}
                            onModeChange={setDisplayMode}
                            onValidate={handleValidate}
                        />
                    ) : (
                        <DragAreaLayout mode={displayMode} />
                    )}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={resetSelection}
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
    },
    mainAreaSettings: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: '#E8A85F',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },
    ordersTitle: {
        fontSize: 18,
        color: '#1C0D45',
        fontFamily: 'Jua',
    },
    tagText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
    }
});

export default RecipePrep;

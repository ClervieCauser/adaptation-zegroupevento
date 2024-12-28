import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CustomHeader from '@/components/ui/CustomHeader';
import { useOrderSelection } from '@/context/OrderContext';
import DisplaySettings from '@/components/ui/DisplaySettings';
import DragAreaLayout from '@/components/ui/DragAreaLayout';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {runOnJS, useAnimatedGestureHandler, useSharedValue} from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import { useOrderProcessing } from '@/context/OrderProcessingContext';
const OrderTag = ({id, onDrop}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: () => {},
        onActive: (event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        },
        onEnd: (event) => {
            runOnJS(onDrop)(id);
            translateX.value = 0;
            translateY.value = 0;
        },
    });

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.orderTag, {
                transform: [
                    { translateX: translateX },
                    { translateY: translateY }
                ],
                zIndex: 1000, // Ajouter ceci pour le premier plan
                elevation: 5,  // Pour Android
            }]}>
                <ThemedText style={styles.tagText}>#{id}</ThemedText>
            </Animated.View>
        </PanGestureHandler>
    );
};
const RecipePrep = () => {
    const { getOrdersToShow, resetSelection } = useOrderSelection();
    const [displayMode, setDisplayMode] = useState('4');
    const [showSettings, setShowSettings] = useState(true);
    const ordersToDisplay = getOrdersToShow();
    const { addOrderToZone } = useOrderProcessing();
    const handleValidate = () => {
        console.log('Validate clicked, current showSettings:', showSettings);
        setShowSettings(false);
        console.log('ShowSettings set to false');
    };

    useEffect(() => {
        return () => {
            setShowSettings(true);
            setDisplayMode('4');
        };
    }, []);

    console.log('Rendering RecipePrep, showSettings:', showSettings);

    return (
        <ThemedView style={styles.container}>
            <CustomHeader />
            <View style={styles.content}>
                <View style={styles.ordersList}>
                    <ThemedText style={styles.ordersTitle}>ORDERS:</ThemedText>
                    {ordersToDisplay.map(id => (
                        <OrderTag
                            key={id}
                            id={id}
                            onDrop={(id) => {
                                // Logique pour déterminer la zone et ajouter l'ordre
                                addOrderToZone(id, 'zone1');
                            }}
                        />
                    ))}
                </View>

                <View style={[
                    styles.mainArea,
                    showSettings ? styles.mainAreaWithSettings  : styles.mainAreaWithDrag
                ]}>
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
                        style={styles.footerButton}
                    >
                        <ThemedText style={styles.buttonText}>Back</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.footerButton}
                        onPress={() => setShowSettings(true)}
                    >
                        <ThemedText style={styles.buttonText}>Settings</ThemedText>
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
    },
    mainAreaWithSettings: {
        borderWidth: 2,
        borderColor: '#E8A85F',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainAreaWithDrag: {
        borderWidth: 0
    },
    footerButton: {
        backgroundColor: '#E8A85F',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'Jua',
    }
});

export default RecipePrep;

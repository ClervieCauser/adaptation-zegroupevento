import React, {useState, useEffect, useRef, useCallback} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CustomHeader from '@/components/ui/CustomHeader';
import { useOrderSelection } from '@/context/OrderContext';
import DisplaySettings from '@/components/ui/DisplaySettings';
import DragAreaLayout from '@/components/ui/DragAreaLayout';
import { Alert } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring, withTiming
} from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import { useOrderProcessing } from '@/context/OrderProcessingContext';
import {router} from "expo-router";
const OrderTag = ({ id, onDrop, isCompleted }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: () => {
            if (isCompleted) return;
            'worklet';
        },
        onActive: (event) => {
            if (isCompleted) return;
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        },
        onEnd: (event) => {
            if (isCompleted) return;
            const position = {
                x: event.absoluteX,
                y: event.absoluteY
            };
            runOnJS(onDrop)(id, position);
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        },
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: isCompleted ? 0 : translateX.value },
            { translateY: isCompleted ? 0 : translateY.value }
        ],
        backgroundColor: withTiming(
            isCompleted ? '#4CAF50' : '#E8A85F',
            { duration: 300 }
        ),
        opacity: withTiming(1, { duration: 300 }),
        position: 'relative',
        zIndex: 1000,
    }));

    return (
        <PanGestureHandler enabled={!isCompleted} onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.tag, animatedStyle]}>
                <ThemedText style={styles.text}>#{id}</ThemedText>
            </Animated.View>
        </PanGestureHandler>
    );
};

const RecipePrep = () => {
    const { getOrdersToShow, resetSelection,markOrdersAsInProgress  } = useOrderSelection();
    const ordersToDisplay = getOrdersToShow();
    const { addOrderToZone, getCompletedOrderIds,
        resetOrderProcessing,setProcessingOrders,resetZonesAndItems  } = useOrderProcessing();

    // Store these in ref to avoid re-renders
    const initialState = useRef({
        displayMode: '4',
        showSettings: true,
        zoneMeasures: {}
    });

    const [displayMode, setDisplayMode] = useState(initialState.current.displayMode);
    const [showSettings, setShowSettings] = useState(initialState.current.showSettings);
    const [zoneMeasures, setZoneMeasures] = useState(initialState.current.zoneMeasures);
    const completedOrderIds = getCompletedOrderIds();
    const [isFinishing, setIsFinishing] = useState(false);

    // Single useEffect for mounting/unmounting
    useEffect(() => {
        if (!ordersToDisplay?.length) {
            router.replace('/pending-orders');
        }
    }, [ordersToDisplay]);

    const allOrdersCompleted = ordersToDisplay.length > 0 &&
        ordersToDisplay.every(id => completedOrderIds.includes(id));

    const fadeAnim = useAnimatedStyle(() => ({
        opacity: withTiming(isFinishing ? 0 : 1, { duration: 1000 }),
        transform: [{
            scale: withSpring(isFinishing ? 1.2 : 1)
        }]
    }));

    // Dans OrderProcessingContext, ajoutez une méthode


// Puis utilisez-la dans handleFinishOrders
    const handleFinishOrders = async () => {
        setIsFinishing(true);
        setTimeout(() => {
            resetSelection();
            resetZonesAndItems();
            setIsFinishing(false);
            router.push('/pending-orders');
        }, 1500);
    };
    const measureZone = (zoneId: string, layout: { x: number; y: number; width: number; height: number }) => {
        setZoneMeasures(prev => ({
            ...prev,
            [zoneId]: layout
        }));
    };

    const handleDropInZone = (orderId: string, droppedPosition: { x: number; y: number }) => {
        if (completedOrderIds.includes(orderId)) {
            Alert.alert(
                "Order Already Completed",
                "This order is ready to be served and cannot be modified!",
                [{ text: "OK" }],
                {
                    cancelable: false,
                    userInterfacePriority: 'high'
                }
            );
            return;
        }

        for (const [zoneId, measure] of Object.entries(zoneMeasures)) {
            const isInZone =
                droppedPosition.x >= measure.x &&
                droppedPosition.x <= measure.x + measure.width &&
                droppedPosition.y >= measure.y &&
                droppedPosition.y <= measure.y + measure.height;

            if (isInZone) {
                addOrderToZone(orderId, zoneId);
                return;
            }
        }
    };

    const handleValidate = () => {
        console.log('Validate clicked, current showSettings:', showSettings);
        setShowSettings(false);
        console.log('ShowSettings set to false');
    };



    console.log('Rendering RecipePrep, showSettings:', showSettings);

    return (
        <ThemedView style={styles.container}>
            <Animated.View style={[styles.content, fadeAnim]}>
                <CustomHeader />
                <View style={styles.content}>
                    <View style={styles.ordersList}>
                        <ThemedText style={styles.ordersTitle}>ORDERS:</ThemedText>
                        {ordersToDisplay.map(id => (
                            <OrderTag
                                key={id}
                                id={id}
                                isCompleted={completedOrderIds.includes(id)}
                                onDrop={(id, position) => handleDropInZone(id, position)}
                            />
                        ))}
                    </View>

                    <View style={[
                        styles.mainArea,
                        showSettings ? styles.mainAreaWithSettings  : styles.mainAreaWithDrag
                    ]} data-testid="main-area">
                        {showSettings ? (
                            <DisplaySettings
                                selectedMode={displayMode}
                                onModeChange={setDisplayMode}
                                onValidate={handleValidate}
                            />
                        ) : (
                            <DragAreaLayout mode={displayMode} onMeasure={measureZone} />
                        )}
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={resetSelection}
                            style={styles.footerButton}
                        >
                            <ThemedText style={styles.buttonText}>Back</ThemedText>
                        </TouchableOpacity>
                        {allOrdersCompleted ? (
                            <TouchableOpacity
                                style={[styles.footerButton, styles.finishButton]}
                                onPress={handleFinishOrders}
                            >
                                <ThemedText style={styles.buttonText}>Finish Orders</ThemedText>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.footerButton}
                                onPress={() => setShowSettings(true)}
                            >
                                <ThemedText style={styles.buttonText}>Settings</ThemedText>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Animated.View>
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
    },

    tagCompleted: {
        backgroundColor: '#4CAF50',
    },
    text: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
        fontSize: 14,
    },

    finishButton: {
        backgroundColor: '#4CAF50',
    },

    dragZone: {
        flex: 1,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#E8A85F',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 16,
        gap: 8,
    },
    dragZoneWithOrder: {
        borderStyle: 'solid',
    },


    itemCompleted: {
        backgroundColor: '#E8F5E9',
        borderColor: '#4CAF50',
    },

    dragZoneCompleted: {
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginHorizontal: 4,
    }


});

export default RecipePrep;

import { StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useOrderSelection } from "@/context/OrderContext";
import { useOrderProcessing } from "@/context/OrderProcessingContext";
import RecipeColumn from './RecipeColumn';
import DragAreaLayout from './DragAreaLayout';
import DragZone from './DragZone';
import DisplaySettings from './DisplaySettings';
import { DisplayMode } from '../../types/display';
import { ThemedText } from '../ThemedText';
import CustomButton from './CustomButton';
import OrderSideBox from './OrderSideBox';

const OrdersTableDisplay = () => {
  const orderSelection = useOrderSelection();
  const { processingOrders } = useOrderProcessing();
  const { addOrderToZone, getCompletedOrderIds, resetZonesAndItems } = useOrderProcessing();

  const { getOrdersToShow, resetSelection } = useOrderSelection();
  const ordersToDisplay = getOrdersToShow();
  const completedOrderIds = useMemo(() => getCompletedOrderIds(), [getCompletedOrderIds]);
  const [showSettings, setShowSettings] = useState(false);
  const [displayMode, setSelectedMode] = useState('4' as DisplayMode);
  const [zoneMeasures, setZoneMeasures] = useState<{ [key: string]: any }>({});
  const [allItemsReady, setAllItemsReady] = useState(false);

  const handleValidate = useCallback(() => {
    console.log('Validate clicked, current showSettings:', showSettings);
    setShowSettings(false);
}, [showSettings]);


  const handleModeChange = (mode: DisplayMode) => {
    setSelectedMode(mode);
  };

  const handleMeasure = () => {
    // Measure logic here
  };

  const handleReadyAll = () => {
    // Ready all logic here
    setAllItemsReady(true);
  };

  const measureZone = useCallback((zoneId: string, layout: any) => {
    requestAnimationFrame(() => {
        setZoneMeasures(prev => ({
            ...prev,
            [zoneId]: layout
        }));
    });
}, []);

  return (
    <View style={styles.container}>
        <View style={styles.sidePart}>
            <OrderSideBox></OrderSideBox>
            <CustomButton 
              title="Settings" 
              onPress={() => setShowSettings(!showSettings)} 
              containerStyles={styles.buttonContainer} 
              textStyles={styles.buttonText} 
              isLoading={false} 
            />
        </View>
        <View data-testid="main-area">
            {showSettings ? (
                <DisplaySettings
                    selectedMode={displayMode}
                    onModeChange={setSelectedMode}
                    onValidate={handleValidate}
                />
            ) : (
                <View style={styles.mainArea}>
                    <DragAreaLayout
                        mode={displayMode}
                        onMeasure={measureZone}
                        onReadyAll={handleReadyAll}
                    >
                        <DragZone 
                            zoneId="zone-1" 
                            onMeasure={handleMeasure} 
                            onReadyAll={handleReadyAll}
                        >
                        </DragZone>
                    </DragAreaLayout>
                </View>
            )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: 16,
},
ordersTableDisplay: {
    flex: 1,
    width: '80%'
  },
  sidePart: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '20%',
    maxWidth: 200,
  },
    mainArea: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
  buttonContainer : {
    backgroundColor: '#E8A85F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    width: '100%',
    height: '10%',
  },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    }
  
});

export default OrdersTableDisplay;
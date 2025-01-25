import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import OrderCircle from './OrderCircle';
import { Order } from '@/types/order';

interface DraggableOrderCircleProps {
  order: Order;
  onDragEnd?: (id: string, position: { x: number; y: number }) => void;
  onDragStart?: () => void;
  onRemove?: (orderId: string) => void;
  isCompleted?: boolean;
  showMinus?: boolean;
}

const DraggableOrderCircle: React.FC<DraggableOrderCircleProps> = ({ 
  order, 
  onDragEnd, 
  onDragStart,
  onRemove,
  isCompleted = false,
  showMinus = false
}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const context = useSharedValue({ x: 0, y: 0 });
  
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { x: translateX.value, y: translateY.value };
        if (onDragStart) {
          runOnJS(onDragStart)();
        }
      })
      .onUpdate((event) => {
        translateX.value = event.translationX + context.value.x;
        translateY.value = event.translationY + context.value.y;
      })
      .onEnd((event) => {
        if (onDragEnd) {
          runOnJS(onDragEnd)(order.id, {
            x: event.absoluteX,
            y: event.absoluteY
          });
        }
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      });
  
    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value }
        ],
      };
    });
  
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.draggableContainer, rStyle]}>
          <OrderCircle 
            order={order} 
            isCompleted={isCompleted} 
            showMinus={showMinus}
            onRemove={onRemove}
          />
        </Animated.View>
      </GestureDetector>
    );
  };

const styles = StyleSheet.create({
  draggableContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 1000,
  }
});

export default DraggableOrderCircle;
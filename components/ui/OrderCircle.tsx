import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Order } from '@/types/order';
import RecipeImage from './RecipeImage';
import { recipes } from '../../app/recipe';
import { Minus } from 'lucide-react';

interface OrderCircleProps {
  order: Order;
  isCompleted?: boolean;
  showMinus?: boolean;
  onRemove?: (orderId: string) => void;
}

const MAX_IMAGES = 3;

const OrderCircle = ({ 
  order, 
  isCompleted = false, 
  showMinus = false,
  onRemove
}: OrderCircleProps) => {
  const getRecipeImage = (recipeName: string) => {
    const recipe = recipes.find(recipe => recipe.name === recipeName);
    return recipe?.imageUrl || '/images/citron.png';
  };

  const totalItems = order.items.length;
  const displayedItems = order.items.slice(0, MAX_IMAGES);
  const remainingItems = totalItems > MAX_IMAGES ? totalItems - MAX_IMAGES : 0;

  const handleRemove = () => {
    if (onRemove) {
      onRemove(order.id);
    }
  };

  return (
    <View style={[styles.orderContainer, isCompleted && styles.completedOrder]}>
      {showMinus && (
        <TouchableOpacity 
          style={styles.minus}
          onPress={handleRemove}
        >
          <Minus size={20} />
        </TouchableOpacity>
      )}
      <View style={styles.imagesGrid}>
        {displayedItems.map((item, index) => (
          <RecipeImage
            key={`${order.id}-${item.name}-${index}`}
            recipeName={item.name}
            quantity={item.quantity}
            image={getRecipeImage(item.name)}
          />
        ))}
        {remainingItems > 0 && (
          <View style={styles.remainingBadge}>
            <Text style={styles.remainingText}>+{remainingItems}</Text>
            <View style={styles.invertedTextContainer}>
              <Text style={styles.remainingTextInverted}>+{remainingItems}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    alignItems: 'center',
    marginVertical: 3,
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 15,
    zIndex: 10,
  },
  minus: {
    position: 'absolute',
    top: -8,
    right: -8,
    color: '#E8A85F',
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: '#E8A85F',
    borderWidth: 1,
    zIndex: 10,
  },
  completedOrder: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    backgroundColor: '#E8F5E9',
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    width: 84,
    justifyContent: 'center',
    marginTop: 4,
  },
  remainingBadge: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#E8A85F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  remainingText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Jua',
    position: 'absolute',
    top: 4,
  },
  invertedTextContainer: {
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
    bottom: 4,
  },
  remainingTextInverted: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Jua',
  },
});

export default OrderCircle;
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Order } from '@/types/order';
import RecipeImage from './RecipeImage';
import { recipes } from '../../app/recipe';

interface OrderCircleProps {
  order: Order;
}

const MAX_IMAGES = 3;

const OrderCircle = ({ order }: OrderCircleProps) => {
  const getRecipeImage = (recipeName: string) => {
    const recipe = recipes.find(recipe => recipe.name === recipeName);
    return recipe?.imageUrl || '/images/citron.png';
  };

  const totalItems = order.items.length;
  const displayedItems = order.items.slice(0, MAX_IMAGES);
  const remainingItems = totalItems > MAX_IMAGES ? totalItems - MAX_IMAGES : 0;

  return (
    <View style={styles.orderContainer}>
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
    marginVertical: 12,
    width: 120,
    height: 120,
    justifyContent: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    padding: 8,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    width: 84,
    justifyContent: 'center',
    marginTop: 8,
  },
  remainingBadge: {
    width: 40,
    height: 40,
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
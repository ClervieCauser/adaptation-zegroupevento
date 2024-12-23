import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IngredientProps {
  ingredient: string;
  quantity: number;
  unit: string;
}

const Ingredient: React.FC<IngredientProps> = ({ ingredient, quantity, unit }) => {
  return (
    <View style={styles.ingredientRow}>
      <Text style={styles.ingredientName}>{ingredient}</Text>
      <Text style={styles.ingredientQuantity}>{quantity} {unit}</Text>
    </View>
  );
};

export default Ingredient;

const styles = StyleSheet.create({
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ingredientName: {
    fontSize: 16,
  },
  ingredientQuantity: {
    fontSize: 16,
  },
});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IngredientRowProps {
  ingredient: string;
  quantity: number | string;
  unit: string;
}

const IngredientRow: React.FC<IngredientRowProps> = ({ ingredient, quantity, unit }) => {
  return (
    <View style={styles.ingredientRow}>
      <Text style={styles.ingredientName}>{ingredient}</Text>
      <Text style={styles.ingredientQuantity}>{quantity} {unit}</Text>
    </View>
  );
};

export default IngredientRow;

const styles = StyleSheet.create({
  ingredientRow: {
    width: '46%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: "#FFEFDF",
    borderRadius: 11,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  ingredientName: {
    fontSize: 16,
    width: '50%',
    fontFamily:'Jua'
  },
  ingredientQuantity: {
    fontSize: 16,
    color: '#666',
    width: '50%',
    textAlign: 'right',
    fontFamily:'Jua'
  },
});
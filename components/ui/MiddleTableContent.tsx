import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { useOrderSelection } from "@/context/OrderContext";
import RecipeColumn from './RecipeColumn';

const MiddleTableContent = () => {
  const { pendingOrders } = useOrderSelection();

  const uniqueRecipes = useMemo(() => {
    const recipeNames = new Set<string>();
    pendingOrders?.forEach(order => {
      order.items.forEach(item => {
        recipeNames.add(item.name);
      });
    });
    return Array.from(recipeNames).sort();
  }, [pendingOrders]);

  return (
    <View style={styles.container}>
      {uniqueRecipes.map(recipeName => (
        <RecipeColumn 
          key={recipeName}
          recipeName={recipeName}
          orders={pendingOrders || []}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

export default MiddleTableContent;
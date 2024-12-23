// RecipePage.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NutritionalInfo from '../../components/ui/NutritionalInfo';
import Tags from '../../components/ui/Tags';
import TabButton from '../../components/ui/TabButton';
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import CustomHeader from '../../components/ui/CustomHeader';


const IngredientRow = ({ ingredient, quantity, unit }) => (
  <View style={styles.ingredientRow}>
    <Text style={styles.ingredientName}>{ingredient}</Text>
    <Text style={styles.ingredientQuantity}>{quantity} {unit}</Text>
  </View>
);

const RecipePage = () => {
  const { isTablet } = useResponsiveLayout();

  if(isTablet) {
    return (
      <ScrollView style={styles.container}>
        <CustomHeader />
    
          <View style={styles.tagContainer}>
              <Tags text="Four" />
              <Tags text="Simple" />
              <Tags text="Poulet" />
              <Tags text="Léger" />
          </View>

        <View style={styles.mainImageContainer}>
          <Image
            source={require('../../assets/images/citron.jpg')}
            style={styles.mainImage}
          />
        </View>

        <View style={styles.servingContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.servingAdjuster}>
            <TouchableOpacity style={styles.adjustButton}>
              <Feather name="minus" size={20} color="#666" />
            </TouchableOpacity>
            <Text style={styles.servingNumber}>4</Text>
            <TouchableOpacity style={styles.adjustButton}>
              <Feather name="plus" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ingredientsContainer}>
          <IngredientRow ingredient="Poulet" quantity="1.2" unit="kg" />
          <IngredientRow ingredient="Citrons jaunes" quantity="200" unit="g" />
          <IngredientRow ingredient="Ails" quantity="4" unit="gousses" />
          <IngredientRow ingredient="Romarins" quantity="2" unit="brins" />
          <IngredientRow ingredient="Thym" quantity="2" unit="brins" />
          <IngredientRow ingredient="Huile d'olive" quantity="3" unit="c. à soupe" />
          <IngredientRow ingredient="Beurre" quantity="20" unit="g" />
          <IngredientRow ingredient="Sel" quantity="1" unit="c. à café" />
          <IngredientRow ingredient="Poivre" quantity="1/2" unit="c. à café" />
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Total:</Text>
          <Text style={styles.timeValue}>1h</Text>
          <Text style={styles.timeLabel}>Cuisson au four:</Text>
          <Text style={styles.timeValue}>50 min</Text>
          <Text style={styles.timeLabel}>Préparation des ingrédients:</Text>
          <Text style={styles.timeValue}>10 min</Text>
        </View>

        <NutritionalInfo
          calories={380}
          proteins={42}
          carbs={22}
          sugar={4}
          fiber={1}
        />

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Commencer la recette !</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <CustomHeader/>
        <View style={styles.tagContainer}>
            <Tags text="Four" />
            <Tags text="Simple" />
            <Tags text="Poulet" />
            <Tags text="Léger" />
        </View>

        <View style={styles.tabContainer}>
          <TabButton text="Ingredients" isActive={true} />
          <TabButton text="Ustensiles" />
          <TabButton text="Autres" />
        </View>

      <View style={styles.mainImageContainer}>
        <Image
          source={require('../../assets/images/citron.jpg')}
          style={styles.mainImage}
        />
      </View>

      <View style={styles.servingContainer}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.servingAdjuster}>
          <TouchableOpacity style={styles.adjustButton}>
            <Feather name="minus" size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.servingNumber}>4</Text>
          <TouchableOpacity style={styles.adjustButton}>
            <Feather name="plus" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ingredientsContainer}>
        <IngredientRow ingredient="Poulet" quantity="1.2" unit="kg" />
        <IngredientRow ingredient="Citrons jaunes" quantity="200" unit="g" />
        <IngredientRow ingredient="Ails" quantity="4" unit="gousses" />
        <IngredientRow ingredient="Romarins" quantity="2" unit="brins" />
        <IngredientRow ingredient="Thym" quantity="2" unit="brins" />
        <IngredientRow ingredient="Huile d'olive" quantity="3" unit="c. à soupe" />
        <IngredientRow ingredient="Beurre" quantity="20" unit="g" />
        <IngredientRow ingredient="Sel" quantity="1" unit="c. à café" />
        <IngredientRow ingredient="Poivre" quantity="1/2" unit="c. à café" />
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeLabel}>Total:</Text>
        <Text style={styles.timeValue}>1h</Text>
        <Text style={styles.timeLabel}>Cuisson au four:</Text>
        <Text style={styles.timeValue}>50 min</Text>
        <Text style={styles.timeLabel}>Préparation des ingrédients:</Text>
        <Text style={styles.timeValue}>10 min</Text>
      </View>

      <NutritionalInfo
        calories={380}
        proteins={42}
        carbs={22}
        sugar={4}
        fiber={1}
      />

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Commencer la recette !</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainImageContainer: {
    width: '40%',
    aspectRatio: 4/3,
    marginBottom: 16,
    marginLeft: 10,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  servingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  servingAdjuster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  adjustButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 20,
  },
  servingNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    padding: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ingredientName: {
    fontSize: 16,
  },
  ingredientQuantity: {
    fontSize: 16,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  timeContainer: {
    padding: 16,
  },
  timeLabel: {
    fontSize: 16,
    color: '#666',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#E9A23B',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipePage;
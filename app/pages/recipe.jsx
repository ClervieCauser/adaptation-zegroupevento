// RecipePage.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NutritionalInfo from '../../components/ui/NutritionalInfo';
import Tags from '../../components/ui/Tags';
import TabButton from '../../components/ui/TabButton';
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import CustomHeader from '../../components/ui/CustomHeader';
import IngredientRow from '../../components/ui/IngredientRow';
import Counter from '../../components/ui/Counter';

const RecipePage = () => {
  const { isTablet } = useResponsiveLayout();

  if(isTablet) {
    return (
      <ScrollView style={styles.container}>
        <CustomHeader />
    
          <Text style={styles.title}>Poulet Citron</Text>
          
          <View style={styles.tagContainer}>
              <Tags text="Four" />
              <Tags text="Simple" />
              <Tags text="Poulet" />
              <Tags text="Léger" />
          </View>

        <View style={styles.imageAndText}>
          <View style={styles.mainImageContainer}>
            <Image
              source={require('../../assets/images/citron.jpg')}
              style={styles.mainImage}
            />
          </View>

          <View style={styles.ingredients}>
            <View style={styles.ingredientTextAndCounter}>
              <Text style={styles.ingredientsText}>Ingredients</Text>
              <Counter/>  
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
          </View>
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

      <Text style={styles.title}>Poulet Citron</Text>

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

        <View style={styles.imageAndText}>
          <View style={styles.mainImageContainer}>
            <Image
              source={require('../../assets/images/citron.jpg')}
              style={styles.mainImage}
            />
          </View>

          <Counter/>
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
  imageAndText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  ingredients:{
    width: '60%',
  },
  ingredientsText: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'Jua'
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  ingredientTextAndCounter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Jua',
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
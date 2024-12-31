import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import NutritionalInfo from '../../components/ui/NutritionalInfo';
import Tags from '../../components/ui/Tags';
import TabButton from '../../components/ui/TabButton';
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import CustomHeader from '../../components/ui/CustomHeader';
import IngredientRow from '../../components/ui/IngredientRow';
import Counter from '../../components/ui/Counter';
import CustomButton from '../../components/ui/CustomButton';
import Pagination from '../../components/ui/Pagination';
import UtensilRow from '../../components/ui/UtensilRow';
import {recipes} from '../../app/recipe';

const RecipePage = () => {
  const { isTablet } = useResponsiveLayout();
  const [activeTab, setActiveTab] = useState('ingredients');
  const [activePage, setActivePage] = useState(0);
  const [isRecipeHome, setIsRecipeHome] = useState(true);
  const totalPages = 2;

  const id = 2;
  const recipe = recipes.find((recipe) => recipe.id === id);
  
  const handlePageChange = (page) => {
    setActivePage(page);
    setActiveTab(page === 0 ? 'ingredients' : 'utensils');
  };

  const handleStartRecipe = () => {
    setIsRecipeHome(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return (
          <>
            <View style={styles.imageAndText}>
              <View style={styles.mainImageContainer}>
                <Image
                  source={require('../../assets/images/citron.jpg')}
                  style={styles.mainImage}
                />
              </View>

              <Counter/>
            </View>

            <ScrollView style={styles.scrollableContainerPhone} contentContainerStyle={styles.ingredientsContainer}>
            {recipe.ingredients.map((item, index) => (
                <View key={index} style={styles.ingredientContainer}>
                  <IngredientRow 
                    ingredient={item.ingredient} 
                    quantity={item.quantity} 
                    unit={item.unit} 
                    quantityStyle={styles.textPhone} 
                    nameStyle={styles.textPhone} 
                    containerStyle={styles.ingredientRowPhone}
                  />
                </View>
              ))}
            </ScrollView>
          </>
        );
      case 'utensils':
        return (
          <>
            <View style={styles.imageAndText}>
              <View style={styles.mainImageContainer}>
                <Image
                  source={require('../../assets/images/citron.jpg')}
                  style={styles.mainImage}
                />
              </View>
            </View>
                <ScrollView style={styles.scrollableContainer} contentContainerStyle={styles.ingredientsContainer}>
                  {recipe.utensils.map((item, index) => (
                    <View key={index} style={styles.ingredientContainer}>
                      <UtensilRow utensil={item.utensil} styleText={styles.textPhone} styleContainer={styles.utensilRowPhone}/>
                    </View>
                  ))}
                </ScrollView>
              </>
        );
      case 'autres':
        return (
          <>
            <View style={styles.imageAndText}>
              <View style={styles.mainImageContainer}>
                <Image
                  source={require('../../assets/images/citron.jpg')}
                  style={styles.mainImage}
                />
              </View>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeLabelPhone}>Total:</Text>
                <Text style={styles.timeValuePhone}>{recipe.totalTime}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeLabelPhone}>Cuisson au four:</Text>
                <Text style={styles.timeValuePhone}>{recipe.cookingTime}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeLabelPhone}>Préparation des ingrédients:</Text>
                <Text style={styles.timeValuePhone}>{recipe.prepTime}</Text>
              </View>
              <View style={styles.nutritionalInfoContainer}>
                {recipe.nutrition.map((item, index) => (
                  <NutritionalInfo key={index} quantity={item.quantity} text={item.text}/>
                ))}
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  // TODO: Créer un composant pour afficher les étapes de la recette
  if (!isRecipeHome) {
    return (
      <View style={styles.container}>
        <CustomHeader /> empty
        {/* TODO: Ajouter le contenu des étapes de la recette */}
        {/* TODO: Ajouter la navigation entre les étapes */}
        {/* TODO: Ajouter un bouton pour revenir à la page d'accueil de la recette */}
      </View>
    );
  }

  if(isTablet) {
    return (
      <View style={styles.container}>
        <CustomHeader />
    
        <Text style={styles.title}>{recipe.name}</Text>

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

            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Total:</Text>
              <Text style={styles.timeValue}>{recipe.totalTime}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Cuisson au four:</Text>
              <Text style={styles.timeValue}>{recipe.cookingTime}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Préparation des ingrédients:</Text>
              <Text style={styles.timeValue}>{recipe.prepTime}</Text>
            </View>

            <View style={styles.nutritionalInfoContainer}>
              {recipe.nutrition.map((item, index) => (
                <NutritionalInfo key={index} quantity={item.quantity} text={item.text}/>
              ))}
            </View>
          </View>

          <View style={styles.ingredients}>
            {activeTab === 'ingredients' ? (
              <>
                <View style={styles.ingredientTextAndCounter}>
                  <Text style={styles.ingredientsText}>Ingredients</Text>
                  <Counter/>  
                </View>
                
                <ScrollView style={styles.scrollableContainer} contentContainerStyle={styles.ingredientsContainer}>
                  {recipe.ingredients.map((item, index) => (
                    <View key={index} style={styles.ingredientContainer}>
                      <IngredientRow ingredient={item.ingredient} quantity={item.quantity} unit={item.unit} />
                    </View>
                  ))}
                </ScrollView>
              </>
            ) : (
              <>
                <View style={styles.ingredientTextAndCounter}>
                  <Text style={styles.ingredientsText}>Ustensils</Text>
                  <Counter/>  
                </View>
                
                <ScrollView style={styles.scrollableContainer} contentContainerStyle={styles.ingredientsContainer}>
                  {recipe.utensils.map((item, index) => (
                    <View key={index} style={styles.ingredientContainer}>
                      <UtensilRow utensil={item.utensil} />
                    </View>
                  ))}
                </ScrollView>
              </>
            )}

            <Pagination
              current={activePage}
              total={totalPages}
              onDotClick={handlePageChange}
            />
            <CustomButton 
              title="Commencer la recette !" 
              textStyles={styles.startButtonText} 
              containerStyles={styles.startButton}
              style={styles.paginationDots}
              onPress={handleStartRecipe}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.containerPhone}>
      <CustomHeader/>

      <Text style={styles.title}>{recipe.name}</Text>

      <View style={styles.tagContainer}>
        <Tags text="Four" />
        <Tags text="Simple" />
        <Tags text="Poulet" />
        <Tags text="Léger" />
      </View>

      <View style={styles.tabsContainer}>
          <TabButton 
            text="Ingredients" 
            isActive={activeTab === 'ingredients'}
            onPress={() => setActiveTab('ingredients')}
          />
          <TabButton 
            text="Ustensiles" 
            isActive={activeTab === 'utensils'}
            onPress={() => setActiveTab('utensils')}
          />
          <TabButton 
            text="Autres" 
            isActive={activeTab === 'autres'}
            onPress={() => setActiveTab('autres')}
          />
        </View>

      <View style={styles.border}>
        {renderContent()}
      </View>

      <CustomButton 
        title="Commencer la recette !" 
        textStyles={styles.startButtonTextPhone} 
        containerStyles={styles.startButtonPhone}
        style={styles.paginationDots}
        onPress={handleStartRecipe}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  border: {
    borderColor: '#ED9405',
    borderWidth: 2,
    marginLeft: 8,
    marginRight: 8,
    maxHeight: 450,
    minHeight: 450,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F7FA',
    paddingTop: 24,
  },
  containerPhone: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  mainImageContainer: {
    width: '40%',
    aspectRatio: 4/3,
  },
  mainImage: {
    width: '100%',
    height: '60%',
    borderRadius: 8,
    marginBottom: 24,
  },
  imageAndText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  ingredients: {
    width: '60%',
  },
  ingredientsText: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Jua',
  },
  scrollableContainer: {
    maxHeight: 400,
  },
  scrollableContainerPhone: {
    maxHeight: 300,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    maxHeight: 400,
    minHeight: 400,
  },
  ingredientContainer: {
    width: '48%',
    marginBottom: 16,
  },
  ingredientRowPhone: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: "#FFEFDF",
    borderRadius: 11,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    height: 40,
  },
  ingredientTextAndCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  nutritionalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
  paginationDots: {
    alignSelf: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginLeft: 8,
    marginRight: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  textPhone: {
    fontSize: 12,
    fontFamily: 'Jua',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: 'Jua',
  },
  timeLabelPhone:{
    fontSize: 12,
    fontFamily: 'Jua',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Jua',
    color: '#ED9405',
  },
  timeValuePhone:{
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Jua',
    color: '#ED9405',
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
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  startButtonPhone:{
    backgroundColor: '#E9A23B',
    margin: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Jua',
  },
  startButtonTextPhone:{
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Jua',
  },
  utensilRowPhone:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: "#FFEFDF",
    borderRadius: 11,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    height: 40,
  }
});

export default RecipePage;
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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

const ingredients = [
  { ingredient: 'Poulet', quantity: '1.2', unit: 'kg' },
  { ingredient: 'Citrons jaunes', quantity: '200', unit: 'g' },
  { ingredient: 'Ails', quantity: '4', unit: 'gousses' },
  { ingredient: 'Romarins', quantity: '2', unit: 'brins' },
  { ingredient: 'Thym', quantity: '2', unit: 'brins' },
  { ingredient: 'Huile d\'olive', quantity: '3', unit: 'c. à soupe' },
  { ingredient: 'Beurre', quantity: '20', unit: 'g' },
  { ingredient: 'Sel', quantity: '1', unit: 'c. à café' },
  { ingredient: 'Poivre', quantity: '1/2', unit: 'c. à café' },
];

const utensils = [
  { utensil: 'Planche à découper' },
  { utensil: 'Cuillère à soupe' },
  { utensil: 'Couteau de cuisine'},
  { utensil: 'Cuillère à café' },
  { utensil: 'Plat pour le four'},
  { utensil: 'Four préchauffé'},
];

const RecipePage = () => {
  const { isTablet } = useResponsiveLayout();
  const [activeTab, setActiveTab] = useState('ingredients');
  const [activePage, setActivePage] = useState(0);
  const totalPages = 2;

  const handlePageChange = (page) => {
    setActivePage(page);
    setActiveTab(page === 0 ? 'ingredients' : 'utensils');
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
            {ingredients.map((item, index) => (
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
                  {utensils.map((item, index) => (
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
                <Text style={styles.timeValuePhone}>1h</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeLabelPhone}>Cuisson au four:</Text>
                <Text style={styles.timeValuePhone}>50 min</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeLabelPhone}>Préparation des ingrédients:</Text>
                <Text style={styles.timeValuePhone}>10 min</Text>
              </View>
              <View style={styles.nutritionalInfoContainer}>
                <NutritionalInfo quantity='380' text='kcal'/>
                <NutritionalInfo quantity='42g' text='protéines'/>
                <NutritionalInfo quantity='22g' text='glucides'/>
                <NutritionalInfo quantity='4g' text='sucre'/>
                <NutritionalInfo quantity='1g' text='fibres'/>
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  if(isTablet) {
    return (
      <View style={styles.container}>
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

            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Total:</Text>
              <Text style={styles.timeValue}>1h</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Cuisson au four:</Text>
              <Text style={styles.timeValue}>50 min</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Préparation des ingrédients:</Text>
              <Text style={styles.timeValue}>10 min</Text>
            </View>

            <View style={styles.nutritionalInfoContainer}>
              <NutritionalInfo quantity='380' text='kcal'/>
              <NutritionalInfo quantity='42g' text='protéines'/>
              <NutritionalInfo quantity='22g' text='glucides'/>
              <NutritionalInfo quantity='4g' text='sucre'/>
              <NutritionalInfo quantity='1g' text='fibres'/>
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
                  {ingredients.map((item, index) => (
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
                  {utensils.map((item, index) => (
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
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.containerPhone}>
      <CustomHeader/>

      <Text style={styles.title}>Poulet Citron</Text>

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
    height: '100%',
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
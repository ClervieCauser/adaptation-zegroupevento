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
import { Lightbulb, Bell, MessageSquare, ChevronRight } from 'lucide-react';

const RecipePage = () => {
  const { isTablet } = useResponsiveLayout();
  const [activeTab, setActiveTab] = useState('ingredients');
  const [activePage, setActivePage] = useState(0);
  const [isRecipeHome, setIsRecipeHome] = useState(true);
  const totalPages = 2;
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const id = 1;
  const recipe = recipes.find((recipe) => recipe.id === id);
  console.log(recipe);
  const handlePageChange = (page) => {
    setActivePage(page);
    setActiveTab(page === 0 ? 'ingredients' : 'utensils');
  };

  const handleStartRecipe = () => {
    setIsRecipeHome(false);
  };

  const handleNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCompletedSteps(new Set([...completedSteps, currentStep]));
    }
  };

  const handleBackToHome = () => {
    setIsRecipeHome(true);
    setCurrentStep(0);
    setCompletedSteps(new Set());
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
    const currentStepData = recipe.steps[currentStep];
    return (
      <View style={isTablet ? styles.container : styles.containerPhone}>
        <CustomHeader onBack={handleBackToHome} />
        
        <View style={styles.recipeHeader}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeNumber}>#{recipe.recipeNumber}</Text>
          <View style={styles.headerIcons}>
            <MessageSquare size={24} />
            <Bell size={24} />
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
            </View>
          </View>
        </View>

        <View style={styles.stepContent}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumberCircle}>
              <Text style={styles.stepNumber}>{currentStepData.id}</Text>
            </View>
            <Text style={styles.stepTitle}>{currentStepData.title}: {currentStepData.duration}</Text>
          </View>

          <ScrollView style={styles.substepsContainer}>
          {currentStepData.substeps.map((substep, index) => (
            <View key={index} style={styles.substepBox}>
              {substep.gif && (
                <Image 
                  source={substep.gif}
                  style={styles.stepGif}
                  resizeMode="cover"
                />
              )}
              {substep.important && (
                <View style={styles.importantIndicator}>
                  <Text style={styles.warningText}>{substep.instruction}</Text>
                </View>
              )}
              {!substep.important && (
                <Text style={styles.substepText}>{substep.instruction}</Text>
              )}
              {substep.tip && (
                <View style={styles.tipContainer}>
                  <Lightbulb size={20} color="#FFB800" />
                  <Text style={styles.tipText}>{substep.tip}</Text>
                </View>
              )}
            </View>
          ))}
          </ScrollView>

          <View style={styles.navigationContainer}>
            <CustomButton
              title="Prochaine étape"
              onPress={handleNextStep}
              containerStyles={styles.nextButton}
              textStyles={styles.nextButtonText}
              Icon={ChevronRight}
            />
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Étape {currentStep + 1} sur {recipe.steps.length}
            </Text>
            <View style={styles.progressBar}>
              {recipe.steps.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressDot,
                    index === currentStep && styles.progressDotActive,
                    completedSteps.has(index) && styles.progressDotCompleted
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }

  if(isTablet) {
    return (
      <View style={styles.container}>
        <CustomHeader />
    
        <Text style={styles.title}>{recipe.name}</Text>

        <View style={styles.tagContainer}>
          {recipe.tags.map((item, index) => (
            <Tags key={index} text={item} />
          ))}
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
                <NutritionalInfo key={index} quantity={item.quantity} text={item.text} styleText={styles.textPhone}/>
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
        {recipe.tags.map((item, index) => (
          <Tags key={index} text={item} />
        ))}
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
    flexWrap: 'wrap',
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
  },

  // RECIPE PREP

  recipeHeader: {
    padding: 16,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipeName: {
    fontSize: 24,
    fontFamily: 'Jua',
    fontWeight: 'bold',
  },
  recipeNumber: {
    color: '#666',
    fontSize: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  difficultyBadge: {
    backgroundColor: '#E5F6FF',
    padding: 8,
    borderRadius: 16,
  },
  difficultyText: {
    color: '#0085FF',
    fontSize: 14,
  },
  stepContent: {
    padding: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepNumberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ED9405',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumber: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: 'Jua',
    flex: 1,
  },
  substepsContainer: {
    maxHeight: 400,
  },
  substepBox: {
    marginBottom: 16,
  },
  importantIndicator: {
    borderLeftWidth: 4,
    borderLeftColor: '#ED9405',
    paddingLeft: 12,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
  },
  warningText: {
    color: '#ED9405',
    fontWeight: 'bold',
  },
  substepText: {
    fontSize: 16,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEFDF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  tipText: {
    marginLeft: 8,
    color: '#666',
  },
  navigationContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#ED9405',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  progressContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
  },
  progressDotActive: {
    backgroundColor: '#ED9405',
    width: 24,
  },
  progressDotCompleted: {
    backgroundColor: '#ED9405',
  },
  stepGif: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  }
});

export default RecipePage;
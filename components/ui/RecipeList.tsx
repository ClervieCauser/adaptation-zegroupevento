import { StyleSheet, View, Text, FlatList, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 600;

export interface Recipe {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  imageUrl: string;
  ingredients?: string[];
  calories: string;
}

interface RecipeCardProps {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  imageUrl: string;
  ingredients?: string[];
  calories: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, duration, difficulty, imageUrl, ingredients, calories}) => {
  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;
  
  return (
    <Pressable style={styles.recipeCard}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.recipeImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{title}</Text>
        {isTablet && (
          <Text style={styles.recipeText}>{calories}</Text>
        )}
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeText}>{duration}</Text>
          <Text style={styles.recipeText}>{difficulty}</Text>
        </View>
        {isTablet && (
          <View>
            <Text style={styles.recipeTitle}>Ingredients (4 personnes) :</Text>
            <View style={styles.ingredients}>
              {ingredients && ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientContainer}>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push({
          pathname: '/recipe',
          params: { id }
        })}
      >
        <Text style={styles.buttonText}>Voir la recette</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

interface RecipeListProps {
  recipes: Recipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const numColumns = isTablet ? 3 : 1;
  
  const renderRecipe = ({ item }: { item: Recipe }) => (
    <RecipeCard
      id={item.id}
      title={item.title}
      duration={item.duration}
      difficulty={item.difficulty}
      imageUrl={item.imageUrl}
      ingredients={item.ingredients}
      calories={item.calories}
    />
  );

  return (
    <FlatList<Recipe>
      data={recipes}
      renderItem={renderRecipe}
      keyExtractor={item => item.id}
      style={styles.recipeList}
      contentContainerStyle={styles.recipeListContent}
      showsVerticalScrollIndicator={false}
      horizontal={isTablet ? false : true}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  recipeList: {
    flex: 1,
    marginTop: 20,
  },
  recipeListContent: {
    paddingLeft: '2%',
    paddingRight: '2%',
    height: isTablet ? '80%': '70%',
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: isTablet ? wp('25%') : wp('35%'),
    marginRight: 15,
    marginTop: 8,
    },
  imageContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recipeImage: {
    margin: isTablet ? wp('1%') : wp('2%'),
    height: isTablet ? wp('9%') : wp('25%'),
    width: isTablet ? wp('18%') : wp('30%'),
    borderRadius: 12,
    },
  recipeInfo: {
    padding: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontFamily: 'Jua',
    color: '#1C0D45',
    marginBottom: '6%',
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#E8A85F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    alignSelf: 'center',
    width: isTablet? '50%' : '80%',
    margin: isTablet ? '5%' : '10%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Jua',
    fontSize: 16,
  },
  ingredientsContainer: {
    marginTop: 10,
  },
  ingredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientContainer: {
    backgroundColor: '#FFEFDF',
    borderRadius: 12,
    padding: 10,
    margin: 5,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingredientText: {
    fontSize: 14,
    fontFamily: 'Jua',
    color: '#666',
  },
});
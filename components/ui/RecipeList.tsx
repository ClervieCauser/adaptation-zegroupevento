import { StyleSheet, View, Text, FlatList, Image, Pressable, Dimensions } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react'

const { width, height } = Dimensions.get('window');
const isTablet = width >= 600;

export interface Recipe {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  imageUrl: string;
}

interface RecipeCardProps {
  title: string;
  duration: string;
  difficulty: string;
  imageUrl: string;
}

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    duration: '30 min',
    difficulty: 'Facile',
    imageUrl: 'https://example.com/carbonara.jpg',
  },
  {
    id: '2',
    title: 'Poulet Rôti',
    duration: '1h30',
    difficulty: 'Moyen',
    imageUrl: 'https://example.com/poulet.jpg',
  },
  {
    id: '3',
    title: 'Poulet Citron',
    duration: '1h30',
    difficulty: 'Moyen',
    imageUrl: '../../assets/images/citron.jpg',
  },
];

const RecipeCard: React.FC<RecipeCardProps> = ({ title, duration, difficulty, imageUrl }) => {
  return (
    <Pressable style={styles.recipeCard}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/images/citron.jpg')}
          style={styles.recipeImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeText}>{duration}</Text>
          <Text style={styles.recipeText}>{difficulty}</Text>
        </View>
      </View>
    </Pressable>
  );
};

interface RecipeListProps {
  recipes: Recipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const renderRecipe = ({ item }: { item: Recipe }) => (
    <RecipeCard
      title={item.title}
      duration={item.duration}
      difficulty={item.difficulty}
      imageUrl={item.imageUrl}
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
      horizontal={true}
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
    height: isTablet ? '70%': '70%',
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
    },
  imageContainer: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
});
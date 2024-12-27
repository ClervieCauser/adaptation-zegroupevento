import { StyleSheet, View, Text, FlatList, Image, Pressable } from 'react-native'
import React from 'react'

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
];

const RecipeCard: React.FC<RecipeCardProps> = ({ title, duration, difficulty, imageUrl }) => {
  return (
    <Pressable style={styles.recipeCard}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
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
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FA',
    paddingTop: 24,
  },
  topSection: {
    paddingTop: 16,
  },
  searchContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  recipeList: {
    flex: 1,
    marginTop: 20,
  },
  recipeListContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  recipeInfo: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontFamily: 'Jua',
    color: '#1C0D45',
    marginBottom: 8,
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
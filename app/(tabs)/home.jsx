import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from "../../components/ui/CustomHeader";
import SearchBar from '@/components/ui/SearchBar';
import { ThemedView } from '@/components/ThemedView';
import { RecipeList } from '@/components/ui/RecipeList';
import { ThemedText } from '@/components/ThemedText';
import { recipes } from '../../app/recipe';

const { width } = Dimensions.get('window');
const isTablet = width >= 600;

const adaptedRecipes = recipes.map(recipe => ({
  id: recipe.id.toString(),
  title: recipe.name,
  duration: recipe.duration,
  difficulty: recipe.difficulty,
  imageUrl: recipe.imageUrl,
  ingredients: recipe.ingredients.map(ingredient => ingredient.ingredient),
  calories: recipe.calories,
}));

const Home = () => {
  const [searchText, setSearchText] = useState('');

  const filteredRecipes = adaptedRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderContent = () => (
    <>
      <View style={styles.topSection}>
        <CustomHeader />
        <View style={styles.searchContainer}>
          <SearchBar value={searchText} onChangeText={setSearchText} placeholder="Rechercher par recette" />
        </View>
      </View>
      <ThemedText style={styles.title}>Liste des recettes</ThemedText>
      <RecipeList recipes={filteredRecipes} style={styles.recipeList} />
    </>
  );

  return (
    <ThemedView style={styles.container}>
      {isTablet ? (
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={renderContent}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.scrollViewContent}
        />
      ) : (
        renderContent()
      )}
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FA',
    paddingTop: 24,
  },
  searchContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Jua',
    color: '#1C0D45',
    margin: 10,
  },
  recipeList: {
    display: 'flex',
    flexDirection: 'row',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

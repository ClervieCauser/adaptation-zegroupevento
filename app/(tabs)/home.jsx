import { StyleSheet, ScrollView, View, FlatList, Dimensions, TouchableOpacity, Text} from 'react-native';
import React, { useState, useEffect} from 'react';
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
  tags: recipe.tags,
}));

const allTags = [...new Set(adaptedRecipes.flatMap(recipe => recipe.tags))];

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {}, [selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredRecipes = adaptedRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedTags.length === 0 || selectedTags.every(tag => recipe.tags.includes(tag)))
  );

  const renderContent = () => (
    <>
      <View style={styles.topSection}>
        <CustomHeader />
        <View style={styles.searchContainer}>
          <SearchBar value={searchText} onChangeText={setSearchText} placeholder="Rechercher par recette" />
        </View>
        <ScrollView horizontal={true} style={styles.tagScrollView} contentContainerStyle={styles.tagContainer}>
          {['Four', 'Poulet', 'Fromage', 'Léger', 'Réconfortant'].map(tag => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                selectedTags.includes(tag) && styles.tagButtonSelected
              ]}
              onPress={() => toggleTag(tag)}
            >
              <Text key={tag} style={[
                styles.tagButtonText,
                selectedTags.includes(tag) && styles.tagButtonTextSelected
                ]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  tagContainer: {
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
  },
  tagButton: {
    padding: 10,
    margin: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#E8A85F',
    borderWidth: 2,
    fontFamily: 'Jua',
  },
  tagButtonSelected: {
    backgroundColor: '#E8A85F',
    color: '#fff',
  },
  tagButtonText: {
    color: '#E8A85F',
    fontFamily: 'Jua',
  },
  tagButtonTextSelected: {
    color: '#fff'
  },
});

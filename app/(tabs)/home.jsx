import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from "../../components/ui/CustomHeader";
import SearchBar from '@/components/ui/SearchBar';
import { ThemedView } from '@/components/ThemedView';
import { RecipeList, SAMPLE_RECIPES} from '@/components/ui/RecipeList';
import { ThemedText } from '@/components/ThemedText';

const Home = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topSection}>
        <CustomHeader />
        <View style={styles.searchContainer}>
          <SearchBar value={searchText} onChangeText={setSearchText} />
        </View>
      </View>
      <ThemedText style={styles.title}>List of recipe</ThemedText>
      <RecipeList recipes={SAMPLE_RECIPES}/>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FA',
    paddingTop: 24,
  },
  header: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: '#F9F7FA',
  },
  headerSection: {
    padding: 24,
    backgroundColor: '#F9F7FA',
    zIndex: 1,
  },
  searchContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8A85F',
  },
  filterButtonActive: {
    backgroundColor: '#E8A85F',
  },
  filterText: {
    color: '#E8A85F',
    fontFamily: 'Jua',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Jua',
    color: '#1C0D45',
    margin: 10,
  },
  selectButton: {
    backgroundColor: '#E8A85F',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Jua',
  },
  cardsOuterContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
  },
  pageButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8A85F',
  },
  pageButtonActive: {
    backgroundColor: '#E8A85F',
  },
  pageButtonText: {
    fontFamily: 'Jua',
    color: '#E8A85F',
  },
  pageButtonTextActive: {
    color: '#FFFFFF',
  },
  scrollableContent: {
    flex: 1,
    paddingHorizontal: 24,
    height: 'calc(100vh - 300px)',
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    scrollbarColor: '#E8A85F #F9F7FA',
  },
  containerRecipe: {
    backgroundColor: '#A5BDEF',
    width: 100,
    height: 100,
    borderRadius: 5,
  }
})
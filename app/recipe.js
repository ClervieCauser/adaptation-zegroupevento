import axios from 'axios';

// Variable pour stocker les recettes récupérées, initialisée vide
let recipes = [];

// Fonction asynchrone pour récupérer les recettes depuis l'API
const fetchRecipes = async () => {
  try {
    const response = await axios.get('http://localhost:3012/menus'); // Remplace par l'URL de ton API
    recipes = response.data;  // Rempli `recipes` avec les données récupérées
    console.log('Recipes loaded:', recipes);
  } catch (err) {
    console.error('Failed to load recipes:', err);
    recipes = [];  // En cas d'erreur, `recipes` devient vide
  }
};

// Fonction pour accéder à `recipes`
const getRecipes = () => recipes;

// Appel pour récupérer les recettes lorsqu'on importe ce fichier
fetchRecipes();

// On exporte la fonction fetchRecipes et la méthode getRecipes pour pouvoir les utiliser ailleurs
export { fetchRecipes, getRecipes, recipes };

const mockRecipe = {
  title: 'Poulet Citron',
  tag: [
    { text: 'Four' },
    { text: 'Simple' },
    { text: 'Poulet' },
    { text: 'Léger'},
  ],
  ingredients: [
    { ingredient: 'Poulet', quantity: '1.2', unit: 'kg' },
    { ingredient: 'Citrons jaunes', quantity: '200', unit: 'g' },
    { ingredient: 'Ails', quantity: '4', unit: 'gousses' },
    { ingredient: 'Romarins', quantity: '2', unit: 'brins' },
    { ingredient: 'Thym', quantity: '2', unit: 'brins' },
    { ingredient: 'Huile d\'olive', quantity: '3', unit: 'c. à soupe' },
    { ingredient: 'Beurre', quantity: '20', unit: 'g' },
    { ingredient: 'Sel', quantity: '1', unit: 'c. à café' },
    { ingredient: 'Poivre', quantity: '1/2', unit: 'c. à café' },
  ],
  utensils: [
    { utensil: 'Planche à découper' },
    { utensil: 'Cuillère à soupe' },
    { utensil: 'Couteau de cuisine' },
    { utensil: 'Cuillère à café' },
    { utensil: 'Plat pour le four' },
    { utensil: 'Four préchauffé' },
  ],
  steps: [
    'Préchauffez le four à 200°C.',
    'Coupez les citrons en rondelles.',
    'Épluchez les gousses d\'ail.',
    'Placez le poulet dans un plat pour le four.',
    'Ajoutez les rondelles de citron, les gousses d\'ail, les brins de romarin et de thym autour du poulet.',
    'Arrosez le poulet avec l\'huile d\'olive et ajoutez des morceaux de beurre.',
    'Assaisonnez avec le sel et le poivre.',
    'Enfournez le poulet pendant 50 minutes, en arrosant de temps en temps avec le jus de cuisson.',
    'Servez chaud avec des légumes ou une salade.'
  ],
  nutritionalInfo: [
    { text: 'kcal', quantity: '380' },
    { text: 'protéines', quantity: '42g' },
    { text: 'glucides', quantity: '22g' },
    { text: 'sucres', quantity: '4g' },
    { text: 'fibres', quantity: '1g' },
  ],
  totalTime: '1h',
  cookingTime: '50 min',
  prepTime: '10 min',
};

export default mockRecipe;

export type SubStep = {
  instruction: string;
  tip?: string;
  important: boolean;
  gif?: any;
};

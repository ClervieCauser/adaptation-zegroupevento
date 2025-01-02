export const recipes = [
    {
      id: 1,
    name: 'Poulet citron',
    difficulty: 'Novice',
    recipeNumber: '#1234',
    steps: [
      {
        id: 1,
        title: 'Préparer son environnement de cuisine',
        duration: '1 min',
        substeps: [
          {
            instruction: 'Préchauffez votre four à 200 degrés',
            tip: 'En prechauffant son four avant, on optimise son temps !',
            important: true
          }
        ]
      },
      {
        id: 2,
        title: 'Préparer le poulet',
        duration: '5 min',
        substeps: [
          {
            instruction: 'Rincez et séchez le poulet',
            important: false
          },
          {
            instruction: 'Placez le poulet dans un plat allant au four',
            tip: 'Utilisez un plat suffisamment grand pour que le poulet ne soit pas trop serré',
            important: true
          }
        ]
      },
      {
        id: 3,
        title: 'Préparer la marinade',
        duration: '4 min',
        substeps: [
          {
            instruction: 'Pressez les citrons pour extraire le jus',
            gif: require('../assets/gifs/lemon.gif'),
            important: false
          }
        ]
      },      
      {
        id: 4,
        title: 'Assaisonner le poulet',
        duration: '2 min',
        substeps: [
          {
            instruction: 'Badigeonnez le poulet avec le mélange citron-huile',
            important: false
          },
          {
            instruction: 'Saupoudrez d\'ail et de romarin',
            important: false
          },
          {
            instruction: 'Salez et poivrez généreusement',
            tip: 'N\'hésitez pas sur l\'assaisonnement, une partie s\'évaporera à la cuisson',
            important: true
          }
        ]
      },
      {
        id: 5,
        title: 'Cuisson',
        duration: '50 min',
        substeps: [
          {
            instruction: 'Enfournez le plat à 200°C',
            important: true
          },
          {
            instruction: 'Arrosez le poulet avec son jus toutes les 15 minutes',
            tip: 'Cela permet de garder le poulet bien moelleux',
            important: true
          }
        ]
      }
    ],
      ingredients: [
        { ingredient: 'Poulet', quantity: '1.2', unit: 'kg' },
        { ingredient: 'Citrons jaunes', quantity: '200', unit: 'g' },
        { ingredient: 'Ails', quantity: '4', unit: 'gousses' },
        { ingredient: 'Romarin', quantity: '10', unit: 'g' },
        { ingredient: 'Huile d’olive', quantity: '2', unit: 'c. à soupe' },
        { ingredient: 'Sel', quantity: '1', unit: 'pincée' },
        { ingredient: 'Poivre', quantity: '1', unit: 'pincée' },
      ],
      utensils: [
        { utensil: 'Planche à découper' },
        { utensil: 'Cuillère à soupe' },
        { utensil: 'Couteau de cuisine'},
        { utensil: 'Cuillère à café' },
        { utensil: 'Plat pour le four'},
        { utensil: 'Four préchauffé'},
      ],
      tags: ['Four', 'Simple', 'Poulet', 'Léger'],
      totalTime: '1h',
      cookingTime: '50 min',
      prepTime: '10 min',
      nutrition: [
        { quantity: '380', text: 'kcal' },
        { quantity: '42g', text: 'protéines' },
        { quantity: '22g', text: 'glucides' },
        { quantity: '4g', text: 'sucre' },
        { quantity: '1g', text: 'fibres' },
      ],
    },
    {
      id: 2,
      name: 'Tartiflette Savoyarde',
      ingredients: [
        { ingredient: 'Pommes de terre', quantity: '1.2', unit: 'kg' },
        { ingredient: 'Reblochon', quantity: '500', unit: 'g' },
        { ingredient: 'Lardons', quantity: '200', unit: 'g' },
        { ingredient: 'Crème fraîche', quantity: '20', unit: 'cl' },
        { ingredient: 'Oignons', quantity: '2', unit: '' },
        { ingredient: 'Ail', quantity: '2', unit: 'gousses' },
        { ingredient: 'Vin blanc', quantity: '10', unit: 'cl' },
        { ingredient: 'Sel', quantity: '1', unit: 'pincée' },
        { ingredient: 'Poivre', quantity: '1', unit: 'pincée' },
      ],
      utensils: [
        { utensil: 'Planche à découper' },
        { utensil: 'Cuillère à soupe' },
        { utensil: 'Couteau de cuisine'},
        { utensil: 'Cuillère à café' },
        { utensil: 'Plat pour le four'},
        { utensil: 'Four préchauffé'},
      ],
      tags: ['Fromage', 'Savoyarde', 'Chaud', 'Réconfortant'],
      totalTime: '1h 30 min',
      cookingTime: '1h',
      prepTime: '30 min',
      nutrition: [
        { quantity: '550', text: 'kcal' },
        { quantity: '25g', text: 'protéines' },
        { quantity: '45g', text: 'glucides' },
        { quantity: '10g', text: 'lipides' },
        { quantity: '1g', text: 'fibres' },
      ],
    },
    // Ajoute les autres recettes de manière similaire
  ];
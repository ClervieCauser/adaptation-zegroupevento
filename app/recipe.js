export const recipes = [
  {
    id: 1,
    name: 'Poulet citron',
    difficulty: 'Novice',
    imageUrl: require('../assets/images/citron.jpg'),
    duration: '1h',
    calories: '380 kcal',
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
            gif: require('../assets/gifs/preheat.gif'),
            important: true
          },
          {
            instruction: 'Sortez votre poulet du frigo pour qu\'il soit à température ambiante',
            important: false
          },
        ]
      },
      {
        id: 2,
        title: 'Préparer le poulet',
        duration: '5 min',
        substeps: [
          {
            instruction: 'Coupez et rincez le poulet',
            gif: require('../assets/gifs/cutchicken.gif'),
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
    difficulty: 'Intermédiaire',
    imageUrl: require('../assets/images/tartiflette.jpg'),
    duration: '1h',
    calories: '380 kcal',
    recipeNumber: '#5678',
    steps: [
      {
        id: 1,
        title: 'Préparer les pommes de terre',
        duration: '10 min',
        substeps: [
          {
            instruction: 'Pelez et coupez les pommes de terre en rondelles',
            important: true
          },
          {
            instruction: 'Faites-les cuire dans de l\'eau salée jusqu\'à tendreté',
            tip: 'Ne laissez pas les pommes de terre trop molles, elles doivent rester fermes',
            important: false
          }
        ]
      },
      {
        id: 2,
        title: 'Préparer les oignons et lardons',
        duration: '8 min',
        substeps: [
          {
            instruction: 'Émincez les oignons',
            important: false
          },
          {
            instruction: 'Faites revenir les lardons et les oignons dans une poêle',
            important: true
          }
        ]
      },
      {
        id: 3,
        title: 'Assemblage',
        duration: '12 min',
        substeps: [
          {
            instruction: 'Disposez une couche de pommes de terre dans un plat à gratin',
            important: false
          },
          {
            instruction: 'Ajoutez une couche de lardons et d\'oignons par-dessus',
            important: true
          },
          {
            instruction: 'Versez un filet de crème fraîche et un peu de vin blanc',
            tip: 'Le vin blanc ajoutera une touche savoureuse à votre tartiflette',
            important: true
          },
          {
            instruction: 'Répétez l’opération pour remplir le plat',
            important: false
          },
          {
            instruction: 'Terminez par des morceaux de reblochon disposés sur le dessus',
            important: true
          }
        ]
      },
      {
        id: 4,
        title: 'Cuisson',
        duration: '1h',
        substeps: [
          {
            instruction: 'Enfournez le plat à 200°C jusqu’à ce que le fromage soit doré et bouillonnant',
            important: true
          }
        ]
      }
    ],
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
    tags: ['Four', 'Fromage', 'Savoyarde', 'Chaud', 'Réconfortant'],
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
  {
    id: 3,
    name: 'Risotto aux champignons',
    difficulty: 'Intermédiaire',
    recipeNumber: '#2345',
    imageUrl: require('../assets/images/risotto.jpg'),
    duration: '1h',
    calories: '380 kcal',
    steps: [
      {
        id: 1,
        title: 'Préparer les champignons',
        duration: '10 min',
        substeps: [
          {
            instruction: 'Lavez, émincez et faites revenir les champignons dans une poêle avec du beurre',
            important: true
          }
        ]
      },
      {
        id: 2,
        title: 'Cuire le riz',
        duration: '20 min',
        substeps: [
          {
            instruction: 'Faites revenir le riz avec un peu d’huile d’olive jusqu’à ce qu’il devienne translucide',
            important: true
          },
          {
            instruction: 'Ajoutez le bouillon louche par louche, en remuant constamment',
            tip: 'N’ajoutez pas tout le bouillon d’un coup, laissez-le absorber par le riz entre chaque ajout',
            important: true
          }
        ]
      },
      {
        id: 3,
        title: 'Assembler le risotto',
        duration: '5 min',
        substeps: [
          {
            instruction: 'Incorporez les champignons au riz cuit',
            important: false
          },
          {
            instruction: 'Ajoutez du parmesan râpé et une noix de beurre pour une texture crémeuse',
            important: true
          }
        ]
      }
    ],
    ingredients: [
      { ingredient: 'Riz Arborio', quantity: '300', unit: 'g' },
      { ingredient: 'Champignons', quantity: '400', unit: 'g' },
      { ingredient: 'Bouillon de légumes', quantity: '1', unit: 'L' },
      { ingredient: 'Parmesan râpé', quantity: '50', unit: 'g' },
      { ingredient: 'Beurre', quantity: '30', unit: 'g' },
      { ingredient: 'Huile d’olive', quantity: '2', unit: 'c. à soupe' },
      { ingredient: 'Sel', quantity: '1', unit: 'pincée' },
      { ingredient: 'Poivre', quantity: '1', unit: 'pincée' },
    ],
    utensils: [
      { utensil: 'Poêle' },
      { utensil: 'Casserole' },
      { utensil: 'Cuillère en bois' },
      { utensil: 'Loupe' },
    ],
    tags: ['Risotto', 'Champignons', 'Italien', 'Réconfortant'],
    totalTime: '40 min',
    cookingTime: '30 min',
    prepTime: '10 min',
    nutrition: [
      { quantity: '450', text: 'kcal' },
      { quantity: '12g', text: 'protéines' },
      { quantity: '68g', text: 'glucides' },
      { quantity: '10g', text: 'lipides' },
      { quantity: '3g', text: 'fibres' },
    ],
  },
  {
    id: 4,
    name: 'Quiche Lorraine',
    difficulty: 'Facile',
    recipeNumber: '#3456',
    imageUrl: require('../assets/images/quiche.jpg'),
    duration: '1h',
    calories: '380 kcal',
    steps: [
      {
        id: 1,
        title: 'Préparer la pâte',
        duration: '5 min',
        substeps: [
          {
            instruction: 'Étalez la pâte feuilletée dans un moule à tarte et piquez-la avec une fourchette',
            important: true
          }
        ]
      },
      {
        id: 2,
        title: 'Préparer l’appareil',
        duration: '10 min',
        substeps: [
          {
            instruction: 'Battez les œufs avec la crème fraîche dans un bol',
            important: true
          },
          {
            instruction: 'Ajoutez du sel, du poivre et de la muscade râpée',
            important: false
          }
        ]
      },
      {
        id: 3,
        title: 'Assembler la quiche',
        duration: '5 min',
        substeps: [
          {
            instruction: 'Disposez les lardons sur la pâte',
            important: true
          },
          {
            instruction: 'Versez l’appareil par-dessus',
            important: true
          }
        ]
      },
      {
        id: 4,
        title: 'Cuisson',
        duration: '35 min',
        substeps: [
          {
            instruction: 'Enfournez la quiche à 180°C jusqu’à ce qu’elle soit dorée',
            important: true
          }
        ]
      }
    ],
    ingredients: [
      { ingredient: 'Pâte feuilletée', quantity: '1', unit: '' },
      { ingredient: 'Lardons', quantity: '200', unit: 'g' },
      { ingredient: 'Œufs', quantity: '3', unit: '' },
      { ingredient: 'Crème fraîche', quantity: '20', unit: 'cl' },
      { ingredient: 'Muscade', quantity: '1', unit: 'pincée' },
      { ingredient: 'Sel', quantity: '1', unit: 'pincée' },
      { ingredient: 'Poivre', quantity: '1', unit: 'pincée' },
    ],
    utensils: [
      { utensil: 'Moule à tarte' },
      { utensil: 'Bol' },
      { utensil: 'Fouet' },
      { utensil: 'Four préchauffé' },
    ],
    tags: ['Four', 'Quiche', 'Facile', 'Lardons', 'Familial'],
    totalTime: '55 min',
    cookingTime: '35 min',
    prepTime: '20 min',
    nutrition: [
      { quantity: '520', text: 'kcal' },
      { quantity: '15g', text: 'protéines' },
      { quantity: '25g', text: 'lipides' },
      { quantity: '42g', text: 'glucides' },
    ],
  },
];

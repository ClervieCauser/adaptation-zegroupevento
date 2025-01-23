import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

interface RecipeImageProps {
  recipeName: string;
  quantity: number;
  image: string;
}

const RecipeImage = ({ recipeName, quantity, image }: RecipeImageProps) => {
  const imageSource = typeof image === 'string' ? { uri: image } : image;

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
      {quantity > 1 && (
        <>
          {/* Badge en haut à droite */}
          <View style={styles.quantityBadgeTopRight}>
            <Text style={styles.quantityText}>x{quantity}</Text>
          </View>
          {/* Badge en bas à gauche */}
          <View style={styles.quantityBadgeBottomLeft}>
            <View style={styles.invertedTextContainer}>
              <Text style={styles.quantityText}>x{quantity}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 35,
    height: 35,
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  quantityBadgeTopRight: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#E8A85F',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  quantityBadgeBottomLeft: {
    position: 'absolute',
    bottom: -6,
    left: -6,
    backgroundColor: '#E8A85F',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  invertedTextContainer: {
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
  },
  quantityText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Jua',
  },
});

export default RecipeImage;
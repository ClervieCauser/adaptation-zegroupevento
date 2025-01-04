// components/ui/Title.tsx
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const Title = () => {
    return (
        <View style={styles.titleContainer}>
            <ThemedText style={styles.titleText}>
                <ThemedText style={styles.titlePoly}>Poly</ThemedText>
                <ThemedText style={styles.titleRecipe}>Recipe</ThemedText>
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        marginTop: 24, // Ajout de marge en haut
        marginBottom: 32,
    },
    titleText: {
        fontSize: 24,
    },
    titlePoly: {
        color: '#3A1994',
        fontFamily: 'Jua',
    },
    titleRecipe: {
        color: '#E8A85F',
        fontFamily: 'Jua',
    },
});

export default Title;

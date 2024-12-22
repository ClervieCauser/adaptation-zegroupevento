// components/ui/NavItem.tsx
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const NavItem = ({ label, isActive, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.navItem, isActive && styles.activeNavItem]}>
                {isActive ? (
                    <View style={styles.activeIndicator}>
                        <ThemedText style={styles.activeLabel}>{label}</ThemedText>
                    </View>
                ) : (
                    <ThemedText style={styles.inactiveLabel}>{label}</ThemedText>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    navItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center', // Centre le contenu horizontalement
        width: '100%',
    },
    activeIndicator: {
        backgroundColor: '#E8A85F',
        borderRadius: 20,
        padding: 8,
        minWidth: 180, // Largeur minimale pour assurer une taille constante
        alignItems: 'center', // Centre le texte dans l'indicateur
    },
    activeLabel: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
        fontSize: 16,
    },
    inactiveLabel: {
        color: '#1C0D45',
        opacity: 0.5,
        fontFamily: 'Jua',
        fontSize: 16,
    },
});

export default NavItem;

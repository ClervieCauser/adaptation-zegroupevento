// components/ui/TabletNavigation.tsx
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Title from './Title';
import NavItem from './NavItem';

const TabletNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navigationItems = [
        // Notez que nous utilisons "(tabs)" dans les routes pour correspondre à la structure
        { label: 'Commandes en attente', route: '/(tabs)/pending-orders' },
        { label: 'Commandes en cours', route: '/(tabs)/orders-progress' },
        { label: 'Recette', route: '/(tabs)/home' },
        { label: 'Statistiques', route: '/(tabs)/stats' },
        { label: 'Paramètres', route: '/(tabs)/settings' },
    ];

    const handleNavigation = (route: string) => {
        // Supprime le préfixe "(tabs)" pour la navigation
        const cleanRoute = route.replace('/(tabs)', '');
        router.push(cleanRoute as any);
    };

    return (
        <ThemedView style={styles.container} lightColor="#FFFFFF">
            <View style={styles.topSection}>
                <Title />
                <View style={styles.navigationContainer}>
                    {navigationItems.map((item) => (
                        <NavItem
                            key={item.route}
                            label={item.label}
                            isActive={pathname.includes(item.route.replace('/(tabs)', ''))}
                            onPress={() => handleNavigation(item.route)}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.bottomSection}>
                <ThemedText style={styles.shareText}>
                    Partagez vos recettes avec vos amis ici !
                </ThemedText>
                <TouchableOpacity style={styles.shareButton}>
                    <ThemedText style={styles.shareButtonText}>Partager</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: '100%',
        paddingVertical: 20,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    topSection: {
        flex: 1,
        paddingHorizontal: 16,
    },
    navigationContainer: {
        alignItems: 'center', // Centre tous les items de navigation
        gap: 16,
    },
    bottomSection: {
        padding: 16,
        gap: 12,
    },
    shareText: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20,
        color: '#1C0D45', // Changed from white to match the design
        fontFamily: 'Jua',
    },
    shareButton: {
        backgroundColor: '#E8A85F',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    shareButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Jua',
        fontSize: 16,
    },
});

export default TabletNavigation;

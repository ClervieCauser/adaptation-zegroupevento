// app/(tabs)/_layout.tsx
import { StyleSheet, View, Image, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import { icons } from '../../constants/icons';
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import TabletNavigation from "../../components/ui/TabletNavigation";
import PendingOrders from './pending-orders';
import Home from './home';
import { OrderSelectionProvider } from '@/context/OrderContext';
import { OrderProcessingProvider } from '@/context/OrderProcessingContext';
import { DraxProvider } from 'react-native-drax';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TabIcon = ({ icon, color, name, focused }) => {
    const { isTablet, isDesktop } = useResponsiveLayout();

    return (
        <View style={[
            styles.iconContainer,
            isTablet && styles.tabletIconContainer,
            isDesktop && styles.desktopIconContainer
        ]}>
            <Image
                source={icon}
                resizeMode="contain"
                style={[
                    styles.icon,
                    isTablet && styles.tabletIcon,
                    isDesktop && styles.desktopIcon,
                    { tintColor: color }
                ]}
            />
            <Text style={[
                styles.iconText,
                isTablet && styles.tabletIconText,
                isDesktop && styles.desktopIconText
            ]} numberOfLines={1}>
                {name}
            </Text>
        </View>
    );
};

const TabLayout = () => {
    const { isTablet } = useResponsiveLayout();

    if (isTablet) {
        return (

            <OrderProcessingProvider>
                <OrderSelectionProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <DraxProvider>
                                <ThemedView style={styles.container}>
                                    <TabletNavigation />
                                    <View style={styles.content}>
                                        <Tabs screenOptions={{
                                            headerShown: false,
                                            tabBarStyle: { display: 'none' },
                                        }}>
                                            <Tabs.Screen
                                                name="index"
                                                options={{ href: Home }}
                                            />
                                            <Tabs.Screen
                                                name="pending-orders"
                                                options={{ href: PendingOrders }}
                                            />
                                            <Tabs.Screen
                                                name="settings"
                                                options={{ href: null }}
                                            />
                                            <Tabs.Screen
                                                name="stats"
                                                options={{ href: null }}
                                            />
                                        </Tabs>
                                    </View>
                                </ThemedView>
                            </DraxProvider>
                        </GestureHandlerRootView>
                </OrderSelectionProvider>
            </OrderProcessingProvider>
        );
    }

    return (
        <OrderProcessingProvider>
            <OrderSelectionProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <DraxProvider>

                        <Tabs
                            screenOptions={{
                                tabBarShowLabel: false,
                                tabBarActiveTintColor: '#ED9405',
                                tabBarInactiveTintColor: '#CDCDE0',
                                headerShown: false,
                            }}
                        >
                            <Tabs.Screen
                                name="pending-orders"
                                options={{
                                    title: 'En attente',
                                    headerShown: false,
                                    tabBarIcon: ({ color, focused }) => (
                                        <TabIcon icon={icons.sablier} color={color} name="En attente" focused={focused} />
                                    ),
                                }}
                            />
                            <Tabs.Screen
                                name="recipe-prep"
                                options={{
                                    tabBarButton: () => null,
                                }}
                            />
                            <Tabs.Screen
                                name="orders-progress"
                                options={{
                                    title: 'En cours',
                                    headerShown: false,
                                    tabBarIcon: ({ color, focused }) => (
                                        <TabIcon icon={icons.process} color={color} name="En cours" focused={focused} />
                                    ),
                                }}
                            />
                            <Tabs.Screen
                                name="favorites"
                                options={{
                                    tabBarButton: () => null,
                                }}
                            />
                            <Tabs.Screen
                                name="home"
                                options={{
                                    title: 'Home',
                                    headerShown: false,
                                    tabBarIcon: ({ color, focused }) => (
                                        <TabIcon icon={icons.recipe} color={color} name="Recettes" focused={focused} />
                                    ),
                                }}
                            />
                            <Tabs.Screen
                                name="recipe"
                                options={{
                                    tabBarButton: () => null,
                                }}
                            />
                            <Tabs.Screen
                                name="settings"
                                options={{
                                    title: 'Settings',
                                    headerShown: false,
                                    tabBarIcon: ({ color, focused }) => (
                                        <TabIcon icon={icons.profile} color={color} name="Paramètres" focused={focused} />
                                    ),
                                }}
                            />
                            <Tabs.Screen
                                name="stats"
                                options={{
                                    title: 'Statistiques',
                                    headerShown: false,
                                    tabBarIcon: ({ color, focused }) => (
                                        <TabIcon icon={icons.profile} color={color} name="Statistiques" focused={focused} />
                                    ),
                                }}
                            />
                        </Tabs>
                    </DraxProvider>
                </GestureHandlerRootView>
            </OrderSelectionProvider>
        </OrderProcessingProvider>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    iconText: {
        fontSize: 12,
        fontFamily: 'jua',
        textAlign: 'center',
        width: 100,
        marginTop: 4,
    },
    tabletContainer: {
        flexDirection: 'row',
        height: '100%',
    },
    tabletSidebar: {
        width: 65,
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#CDCDE0',
    },
    tabletContent: {
        flex: 1,
    },
    tabletIconContainer: {
        marginVertical: 20,
    },
    tabletIcon: {
        width: 24,
        height: 24,
    },
    tabletIconText: {
        fontSize: 14,
    },
    desktopContainer: {
        flexDirection: 'row',
        height: '100%',
    },
    desktopSidebar: {
        width: 240,
        backgroundColor: '#ffffff',
        paddingVertical: 30,
        alignItems: 'flex-start',
        paddingLeft: 30,
        borderRightWidth: 1,
        borderRightColor: '#CDCDE0',
    },
    desktopContent: {
        flex: 1,
    },
    desktopIconContainer: {
        flexDirection: 'row',
        marginVertical: 15,
        width: '100%',
    },
    desktopIcon: {
        width: 28,
        height: 28,
        marginRight: 15,
    },
    desktopIconText: {
        fontSize: 16,
        width: 'auto',
        marginTop: 0,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F9F7FA',
    },
    content: {
        flex: 1,
        backgroundColor: '#F9F7FA',
    },
});

export default TabLayout;

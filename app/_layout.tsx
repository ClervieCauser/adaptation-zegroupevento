import { StyleSheet } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Jua': require('../assets/fonts/Jua.ttf')
  });

  const { isTable } = useResponsiveLayout();

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if(!fontsLoaded && !error) return null;

  // Redirection vers l'interface table uniquement si on est sur navigateur web
  if(isTable) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="table" options={{ headerShown: false }} />
      </Stack>
    );
  }

  // Sinon, on garde l'interface mobile
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
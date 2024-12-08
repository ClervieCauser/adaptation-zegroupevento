import { StyleSheet, Text, View } from 'react-native'
import {SplashScreen, Stack} from 'expo-router'
import {useFonts} from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Jua': require('../assets/fonts/Jua.ttf')
  });

  useEffect(() => {
    if(error) {
      throw error;
    }
    if(fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if(!fontsLoaded && !error) {
    return null;
  }

  return(
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
    </Stack>
  )
}

export default RootLayout

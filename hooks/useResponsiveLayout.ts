import { useWindowDimensions, Platform } from 'react-native';

export const useResponsiveLayout = () => {
    const { width, height } = useWindowDimensions();

    const isWeb = Platform.OS === 'web';
    
    return {
        isPhone: width < 768,
        isTablet: width >= 768 && width < 1024,
        isTable: isWeb && width >= 1024,  // Uniquement true si on est sur web ET grand écran
        isPortrait: height > width,
        width,
        height
    };
};
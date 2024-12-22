import { useWindowDimensions } from 'react-native';

export const useResponsiveLayout = () => {
    const { width, height } = useWindowDimensions();

    return {
        isPhone: width < 768,
        isTablet: width >= 768,
        isPortrait: height > width,
        width,
        height
    };
};

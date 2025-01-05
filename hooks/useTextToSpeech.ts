import { useCallback } from 'react';
import * as Speech from 'expo-speech';

export const useTextToSpeech = (isEnabled: boolean) => {
    const stopSpeaking = useCallback(async () => {
        try {
            const isSpeaking = await Speech.isSpeakingAsync();
            if (isSpeaking) {
                await Speech.stop();
            }
        } catch (error) {
            console.error('Error stopping speech:', error);
        }
    }, []);

    const speak = useCallback(async (text: string) => {
        if (!isEnabled) return;

        try {
            await stopSpeaking();

            await Speech.speak(text, {
                language: 'fr-FR',
                rate: 0.9,
                pitch: 1.1,
                volume: 1
            });
        } catch (error) {
            console.error('Error with text-to-speech:', error);
        }
    }, [isEnabled, stopSpeaking]);

    return { speak, stopSpeaking };
};

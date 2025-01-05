// hooks/useTextToSpeech.ts
import { useEffect, useCallback } from 'react';
import * as Speech from 'expo-speech';
import { useOrderSelection } from '@/context/OrderContext';
import type { SubStep } from '@/types/recipe';


export const useTextToSpeech = (isEnabled: boolean) => {
    const speak = useCallback(async (text: string) => {
        if (!isEnabled) return;

        try {
            const isSpeaking = await Speech.isSpeakingAsync();
            if (isSpeaking) {
                await Speech.stop();
            }

            await Speech.speak(text, {
                language: 'fr-FR',
                rate: 0.9,
                pitch: 1.1,
                volume: 1
            });
        } catch (error) {
            console.error('Error with text-to-speech:', error);
        }
    }, [isEnabled]);

    const speakSubstep = useCallback((substep: SubStep) => {
        if (!isEnabled) return;

        let textToSpeak = substep.instruction;
        if (substep.important) {
            textToSpeak = `Attention ! ${textToSpeak}`;
        }
        if (substep.tip) {
            textToSpeak += `. Conseil : ${substep.tip}`;
        }
        speak(textToSpeak);
    }, [speak, isEnabled]);

    return { speak, speakSubstep };
};

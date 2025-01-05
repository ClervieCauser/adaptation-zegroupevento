import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

let globalRecording = null;

const NoiseAdaptiveText = ({ instruction, longInstruction, micEnabled, tip }) => {
    const [isNoisy, setIsNoisy] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const textRef = useRef(instruction);
    const { speak } = useTextToSpeech(micEnabled);
    const mountedRef = useRef(true);
    const isSpeakingRef = useRef(false);
    const timeoutRef = useRef(null);
    const [debugInfo, setDebugInfo] = useState('Initializing...');

    const cleanup = async () => {
        try {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            if (globalRecording) {
                await globalRecording.stopAndUnloadAsync();
                globalRecording = null;
            }
        } catch (error) {
            console.log('Cleanup error:', error);
        }
    };

    const speakInstructions = async () => {
        // Vérification stricte que le micro est activé
        if (!micEnabled) {
            console.log('Text-to-speech désactivé car micro désactivé');
            return;
        }

        if (isSpeakingRef.current) return;

        isSpeakingRef.current = true;
        try {
            // Tips first
            if (Array.isArray(tip) && tip.length > 0) {
                await speak('Petits conseils : ' + tip.join('. '));
            } else if (tip) {
                await speak('Petit conseil : ' + tip);
            }

            // Pause
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Long instruction
            await speak(Array.isArray(longInstruction) ? longInstruction.join('. ') : longInstruction);
        } finally {
            isSpeakingRef.current = false;
        }
    };

    const startNoiseDetection = async () => {
        if (!micEnabled) {
            setIsNoisy(true);
            return;
        }

        try {
            await cleanup();

            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) {
                setDebugInfo('Permissions refusées');
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const recording = new Audio.Recording();
            globalRecording = recording;

            await recording.prepareToRecordAsync({
                ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
                android: {
                    ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
                    isMetering: true,
                },
                ios: {
                    ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
                    meteringEnabled: true,
                }
            });

            // Détection du niveau sonore
            recording.setOnRecordingStatusUpdate((status) => {
                if (!status.isRecording) return;

                // Récupération du buffer audio pour analyser le volume
                if (status.durationMillis > 0) {
                    const lastUpdate = Date.now();
                    const volume = status.metering !== undefined ? status.metering : -160;
                    // -20 dB est très fort (cri/musique forte)
                    // -30 dB est une conversation normale
                    // -40 dB est un murmure
                    const newIsNoisy = volume > -10;  // Seuil conversation normale

                    setDebugInfo(`Volume: ${volume.toFixed(2)}dB Time: ${lastUpdate}`);
                    setIsNoisy(newIsNoisy);
                }
            });

            await recording.startAsync();
            setDebugInfo('Recording started');

        } catch (error) {
            setDebugInfo(`Error: ${error.message}`);
            console.error('Recording error:', error);
        }
    };

    useEffect(() => {
        mountedRef.current = true;
        startNoiseDetection();

        return () => {
            mountedRef.current = false;
            cleanup();
            Speech.stop(); // Ajout de l'arrêt du speech
        };
    }, [micEnabled]);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => {
            textRef.current = isNoisy ? longInstruction : instruction;
            // Ne parle que si le micro est activé et l'environnement est calme
            if (!isNoisy && micEnabled && !isSpeakingRef.current) {
                speakInstructions();
            }
        });
    }, [isNoisy, micEnabled]); // Réagit également aux changements de micEnabled

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[styles.mainText, { opacity: fadeAnim }]}
            >
                {textRef.current}
            </Animated.Text>

            {micEnabled && (
                <>
                    <TouchableOpacity
                        onPress={speakInstructions}
                        style={styles.replayButton}
                    >
                        <Icon name="volume-high" size={24} color="#ED9405" />
                    </TouchableOpacity>

                    <View style={styles.noiseIndicator}>
                        <Icon
                            name={isNoisy ? "volume-high" : "volume-medium"}
                            size={16}
                            color={isNoisy ? "#ED9405" : "#666"}
                        />
                        <Text style={styles.noiseText}>
                            {isNoisy ? "Environnement bruyant" : "Environnement calme"}
                        </Text>
                        <Text style={styles.debugText}>{debugInfo}</Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
    },
    mainText: {
        fontSize: 16,
        fontFamily: 'Jua',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    replayButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#FFF3E0',
    },
    noiseIndicator: {
        position: 'absolute',
        left: 8,
        bottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    noiseText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#666',
        fontFamily: 'Jua',
    },
    debugText: {
        marginLeft: 8,
        fontSize: 10,
        color: '#666',
        opacity: 0.7
    }
});

export default NoiseAdaptiveText;

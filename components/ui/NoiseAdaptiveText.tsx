import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';

// Seuil de bruit pour considérer l'environnement comme bruyant (conversation ~60dB)
const NOISE_THRESHOLD = 10;

// Référence globale pour s'assurer qu'un seul enregistrement est actif
let globalRecording = null;

const NoiseAdaptiveText = ({ instruction, longInstruction, micEnabled, tip, onNoiseChange }) => {
    const [noiseLevel, setNoiseLevel] = useState(0);
    const [isNoisy, setIsNoisy] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const textRef = useRef(instruction);
    const { speak } = useTextToSpeech(micEnabled);
    const recordingRef = useRef(null);
    const mountedRef = useRef(true);

    const stopRecording = async () => {
        if (recordingRef.current) {
            try {
                await recordingRef.current.stopAndUnloadAsync();
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
            recordingRef.current = null;
            globalRecording = null;
        }
    };

    const speakInstructions = () => {
        if (!micEnabled) return;

        // Construction du texte avec les conseils
        let fullText = Array.isArray(longInstruction)
            ? longInstruction.join('. ')
            : longInstruction;

        // Ajouter les tips s'ils existent
        if (Array.isArray(tip) && tip.length > 0) {
            fullText += '. Petits conseils : ' + tip.join('. ');
        } else if (tip) {
            fullText += '. Petit conseil : ' + tip;
        }

        speak(fullText);
    };

    useEffect(() => {
        mountedRef.current = true;

        const startNoiseDetection = async () => {
            try {
                if (!micEnabled) {
                    setIsNoisy(true);
                    return;
                }

                // Arrêter l'enregistrement précédent s'il existe
                await stopRecording();

                const { granted } = await Audio.requestPermissionsAsync();
                if (!granted) {
                    setIsNoisy(true);
                    return;
                }

                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                const recording = new Audio.Recording();
                recordingRef.current = recording;
                globalRecording = recording;

                await recording.prepareToRecordAsync({
                    android: {
                        extension: '.m4a',
                        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
                        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
                        sampleRate: 44100,
                        numberOfChannels: 2,
                        bitRate: 128000,
                    },
                    ios: {
                        extension: '.m4a',
                        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
                        sampleRate: 44100,
                        numberOfChannels: 2,
                        bitRate: 128000,
                        linearPCMBitDepth: 16,
                        linearPCMIsBigEndian: false,
                        linearPCMIsFloat: false,
                    },
                });

                recording.setOnRecordingStatusUpdate(status => {
                    if (mountedRef.current && status.metering) {
                        const normalizedLevel = (status.metering + 160) * (100/160);
                        setNoiseLevel(normalizedLevel);
                        // Ajustement du seuil pour mieux détecter les conversations
                        const newIsNoisy = normalizedLevel > NOISE_THRESHOLD;
                        setIsNoisy(newIsNoisy);
                        if (onNoiseChange) {
                            onNoiseChange(newIsNoisy);
                        }
                    }
                });

                await recording.startAsync();
                await recording.setProgressUpdateInterval(100);
            } catch (error) {
                console.error('Error starting noise detection:', error);
                setIsNoisy(true);
            }
        };

        startNoiseDetection();

        return () => {
            mountedRef.current = false;
            stopRecording();
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
            if (!isNoisy && micEnabled) {
                speakInstructions();
            }
        });
    }, [isNoisy, micEnabled]);

    const handleReplay = () => {
        speakInstructions();
    };

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
                        onPress={handleReplay}
                        style={styles.replayButton}
                    >
                        <Icon name="volume-high" size={24} color="#ED9405" />
                    </TouchableOpacity>

                    <View style={styles.noiseIndicator}>
                        <Icon
                            name={noiseLevel > NOISE_THRESHOLD ? "volume-high" : "volume-medium"}
                            size={16}
                            color={noiseLevel > NOISE_THRESHOLD ? "#ED9405" : "#666"}
                        />
                        <Text style={styles.noiseText}>
                            {noiseLevel > NOISE_THRESHOLD ? "Environnement bruyant" : "Environnement calme"}
                        </Text>
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
    }
});

export default NoiseAdaptiveText;

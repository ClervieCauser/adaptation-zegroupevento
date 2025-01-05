import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';

// Seuil de bruit pour considérer l'environnement comme bruyant
const NOISE_THRESHOLD = 10;

const NoiseAdaptiveText = ({ instruction, longInstruction, micEnabled, tip, onNoiseChange }) => {
    const [displayText, setDisplayText] = useState(instruction); // État pour le texte affiché
    const [noiseLevel, setNoiseLevel] = useState(0);
    const [isNoisy, setIsNoisy] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current; // Animation pour le texte
    const recordingRef = useRef(null); // Référence pour l'enregistrement en cours
    const mountedRef = useRef(true); // Référence pour vérifier si le composant est monté
    const { speak } = useTextToSpeech(micEnabled);

    const stopRecording = async () => {
        if (recordingRef.current) {
            try {
                await recordingRef.current.stopAndUnloadAsync();
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
            recordingRef.current = null;
        }
    };

    const speakInstructions = () => {
        if (!micEnabled) return;

        let fullText = Array.isArray(longInstruction)
            ? longInstruction.join('. ')
            : longInstruction;

        if (tip) {
            fullText += `. Conseil : ${Array.isArray(tip) ? tip.join('. ') : tip}`;
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
                        const normalizedLevel = (status.metering + 160) * (100 / 160);
                        setNoiseLevel(normalizedLevel);
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
        setDisplayText(isNoisy ? longInstruction : instruction);

        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (!isNoisy && micEnabled) {
                speakInstructions();
            }
        });
    }, [isNoisy, micEnabled, instruction, longInstruction, tip]);

    const handleReplay = () => {
        speakInstructions();
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.mainText, { opacity: fadeAnim }]}>
                {displayText}
            </Animated.Text>

            {micEnabled && (
                <>
                    <TouchableOpacity onPress={handleReplay} style={styles.replayButton}>
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
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    mainText: {
        fontSize: 16,
        fontFamily: 'Jua',
        width: '90%',
        marginBottom: 8,
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

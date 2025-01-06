import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

let globalRecording = null;

const NOISE_THRESHOLD_HIGH = -40;
const NOISE_THRESHOLD_LOW = -60;
const CHANGE_DELAY = 5000;

const NoiseAdaptiveText = ({ instruction, longInstruction, micEnabled, tip }) => {
    const [isNoisy, setIsNoisy] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const textRef = useRef(instruction);
    const { speak, stopSpeaking } = useTextToSpeech(micEnabled);
    const mountedRef = useRef(true);
    const isSpeakingRef = useRef(false);
    const timeoutRef = useRef(null);
    const lastVolumeStateRef = useRef(false);
    const [debugInfo, setDebugInfo] = useState('Initializing...');

    const cleanup = async () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (globalRecording) {
            try {
                await globalRecording.stopAndUnloadAsync();
            } catch (error) {
                console.log('Cleanup recording error:', error);
            }
            globalRecording = null;
        }
        await stopSpeaking();
        await Speech.stop();
    };

    const speakInstructions = async () => {
        if (!micEnabled || isNoisy) {
            console.log('Text-to-speech désactivé car micro désactivé ou environnement bruyant');
            return;
        }

        if (isSpeakingRef.current) {
            await stopSpeaking();
            await Speech.stop();
        }

        isSpeakingRef.current = true;
        try {
            if (Array.isArray(tip) && tip.length > 0) {
                await speak('Petits conseils : ' + tip.join('. '));
            } else if (tip) {
                await speak('Petit conseil : ' + tip);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            await speak(Array.isArray(longInstruction) ? longInstruction.join('. ') : longInstruction);
        } finally {
            isSpeakingRef.current = false;
        }
    };

    const updateNoiseState = (volumeIsNoisy) => {
        if (volumeIsNoisy === lastVolumeStateRef.current) {
            return;
        }

        if (volumeIsNoisy) {
            stopSpeaking();
            Speech.stop();
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
            if (mountedRef.current && volumeIsNoisy !== isNoisy) {
                setIsNoisy(volumeIsNoisy);
                if (!volumeIsNoisy && micEnabled) {
                    setTimeout(() => {
                        speakInstructions();
                    }, 500);
                }
            }
            timeoutRef.current = null;
        }, CHANGE_DELAY);

        lastVolumeStateRef.current = volumeIsNoisy;
    };

    const startNoiseDetection = async () => {
        if (!micEnabled) {
            setIsNoisy(true);
            stopSpeaking();
            Speech.stop();
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

            recording.setOnRecordingStatusUpdate((status) => {
                if (!status.isRecording) return;

                if (status.durationMillis > 0) {
                    const volume = status.metering !== undefined ? status.metering : -160;

                    const volumeIsNoisy = isNoisy
                        ? volume > NOISE_THRESHOLD_LOW
                        : volume > NOISE_THRESHOLD_HIGH;

                    setDebugInfo(`${volume.toFixed(0)} dB`);
                    updateNoiseState(volumeIsNoisy);
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
        lastVolumeStateRef.current = isNoisy;

        startNoiseDetection();

        return () => {
            mountedRef.current = false;
            cleanup();
        };
    }, [micEnabled]);

    useEffect(() => {
        if (isNoisy) {
            stopSpeaking();
            Speech.stop();
            isSpeakingRef.current = false;
        }
    }, [isNoisy, stopSpeaking]);

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
        ]).start();

        textRef.current = isNoisy ? longInstruction : instruction;

        if (!isNoisy && micEnabled && !isSpeakingRef.current) {
            setTimeout(() => {
                speakInstructions();
            }, 600);
        }
    }, [isNoisy, instruction, longInstruction]);

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[styles.mainText, { opacity: fadeAnim }]}
            >
                {isNoisy ? longInstruction : instruction}
            </Animated.Text>

            {micEnabled && (
                <>
                    <TouchableOpacity
                        onPress={speakInstructions}
                        style={[
                            styles.replayButton,
                            isNoisy && styles.replayButtonDisabled
                        ]}
                        disabled={isNoisy}
                    >
                        <Icon name="volume-high" size={24} color={isNoisy ? "#ccc" : "#ED9405"} />
                    </TouchableOpacity>

                    <View style={styles.noiseIndicator}>
                        <Icon
                            name={isNoisy ? "volume-high" : "volume-medium"}
                            size={16}
                            color={isNoisy ? "#ED9405" : "#666"}
                        />
                        <Text style={[
                            styles.noiseText,
                            isNoisy ? styles.noisyText : styles.calmText
                        ]}>
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
    replayButtonDisabled: {
        opacity: 0.5,
        backgroundColor: '#f5f5f5',
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
        fontFamily: 'Jua',
    },
    noisyText: {
        color: '#ED9405',
    },
    calmText: {
        color: '#666',
    },
    debugText: {
        marginLeft: 8,
        fontSize: 10,
        color: '#666',
        opacity: 0.7
    }
});

export default NoiseAdaptiveText;
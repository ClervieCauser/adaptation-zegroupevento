import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Switch } from '@/components/ui/Switch';


interface DisplaySettingsProps {
  onValidate: () => void;
  selectedMode: string;
  onModeChange: (mode: string) => void;
}

const DisplaySettings: React.FC<DisplaySettingsProps> = ({ onValidate, selectedMode, onModeChange }) => (
  <View style={settingsStyles.container}>
    <TouchableOpacity style={settingsStyles.validateButton} onPress={onValidate}>
      <Text style={settingsStyles.validateText}>VALIDER</Text>
    </TouchableOpacity>
    <View style={settingsStyles.optionsGrid}>
      {['4','3','2','1'].map((mode) => (
        <TouchableOpacity 
          key={mode}
          style={[
            settingsStyles.option,
            selectedMode === mode && settingsStyles.selectedOption
          ]}
          onPress={() => onModeChange(mode)}
        >
          <View style={[
            settingsStyles.checkbox,
            selectedMode === mode && settingsStyles.selectedCheckbox
          ]} />
          <View style={settingsStyles.optionContent}>
            {mode === '1' && <View style={settingsStyles.fullSquare} />}
            {mode === '2' && (
              <View style={settingsStyles.twoColumns}>
                <View style={settingsStyles.verticalRect} />
                <View style={settingsStyles.verticalRect} />
              </View>
            )}
            {mode === '3' && (
              <View style={settingsStyles.threeLayout}>
                <View style={settingsStyles.topRow}>
                  <View style={settingsStyles.square} />
                  <View style={settingsStyles.square} />
                </View>
                <View style={settingsStyles.bottomSquare} />
              </View>
            )}
            {mode === '4' && (
              <View style={settingsStyles.fourLayout}>
                    <View style={settingsStyles.gridRow}>
                        <View style={settingsStyles.square} />
                        <View style={settingsStyles.square} />
                    </View>
                    <View style={settingsStyles.gridRow}>
                        <View style={settingsStyles.square} />
                        <View style={settingsStyles.square} />
                    </View>
                </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
    <Text style={settingsStyles.title}>Choisissez votre affichage</Text>
  </View>
);

const PreperationSectionTable = ({ settings = false }) => {
  const [selectedMode, setSelectedMode] = useState('4');
  const [autoSuggestEnabled, setAutoSuggestEnabled] = useState(false);

  const onAutoSuggestChange = (checked: boolean) => {
    setAutoSuggestEnabled(checked);
  };

  if (settings) {
    return (
      <View style={styles.container}>
        <View style={styles.waitingZone}>
            <Text style={styles.title}>Zone d'attente</Text>
            <View style={styles.autoSuggestContainer}>
              <Text style={styles.autoSuggestLabel}>Suggestions auto</Text>
              <Switch
                checked={autoSuggestEnabled}
                onCheckedChange={onAutoSuggestChange}
              />
            </View>
        </View>
        <View style={styles.preparationZone}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.settingsButton}>
                <Text style={styles.settingsText}>Settings</Text>
            </TouchableOpacity>
            <Text style={styles.titlePreperation}>Zones de préparation</Text>
        </View>
          <DisplaySettings 
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
            onValidate={() => console.log('validated')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.waitingZone}>
        <Text style={styles.title}>Zone d'attente</Text>
        <View style={styles.autoSuggestContainer}>
              <Text style={styles.autoSuggestLabel}>Suggestions auto</Text>
              <Switch
                checked={autoSuggestEnabled}
                onCheckedChange={onAutoSuggestChange}
              />
            </View>
      </View>
      
      <View style={styles.preparationZone}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.settingsButton}>
                <Text style={styles.settingsText}>Settings</Text>
            </TouchableOpacity>
            <Text style={styles.titlePreperation}>Zones de préparation</Text>
        </View>
        
        <View style={styles.gridContainer}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.dropZone}>
              <Text style={styles.plusIcon}>+</Text>
              <Text style={styles.dropText}>GLISSER UNE COMMANDE</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const settingsStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 24,
      transform: [{ rotate: '180deg' }]
    },
    title: {
      fontSize: 24,
      fontFamily: 'Jua',
      color: '#1C0D45',
      marginTop: 32,
      transform: [{ rotate: '180deg' }]
    },
    optionsGrid: {
      flexDirection: 'row',
      gap: 20,
      marginTop: 32,
    },
    option: {
      width: 70,
      height: 70,
      borderWidth: 1,
      borderColor: '#E8A85F',
      borderRadius: 8,
      padding: 8,
      position: 'relative',
    },
    selectedOption: {
      backgroundColor: '#FDF4E7',
    },
    checkbox: {
      position: 'absolute',
      bottom: -10,
      left: -10,
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#E8A85F',
      backgroundColor: 'white',
      zIndex: 1,
    },
    selectedCheckbox: {
      backgroundColor: '#E8A85F',
    },
    optionContent: {
      flex: 1,
      borderRadius: 4,
    },
    fullSquare: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#E8A85F',
    },
    twoColumns: {
      flex: 1,
      flexDirection: 'row',
      gap: 4,
    },
    verticalRect: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#E8A85F',
      borderRadius: 4,
    },
    threeLayout: {
      flex: 1,
      gap: 4,
      transform: [{ rotate: '180deg' }]
    },
    topRow: {
      flexDirection: 'row',
      gap: 4,
      flex: 1,
    },
    fourLayout: {
        flex: 1,
        gap: 5,
    },
    gridRow: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
    },
    square: {
      flex: 1,
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: '#E8A85F',
      borderRadius: 4,
    },
    bottomSquare: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#E8A85F',
      borderRadius: 4,
    },
    fourGrid: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    validateButton: {
      backgroundColor: '#E8A85F',
      paddingHorizontal: 48,
      paddingVertical: 12,
      borderRadius: 24,
      transform: [{ rotate: '180deg' }]
    },
    validateText: {
      color: 'white',
      fontFamily: 'Jua',
      fontSize: 16,
    },
  });  

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection: 'row',
   gap: 16,
   height: '100%',
   width: '100%',
   transform: [{ rotate: '180deg' }],
 },
 waitingZone: {
   flex: 1,
   backgroundColor: 'white',
   borderRadius: 16,
   borderWidth: 1,
   borderColor: '#E0E0E0', 
   padding: 16,
   alignItems: 'center',
 },
 preparationZone: {
   flex: 3,
   backgroundColor: 'white',
   borderRadius: 16,
   borderWidth: 1,
   borderColor: '#E0E0E0',
   padding: 16,
 },
 header: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: 5,
   transform: [{ rotate: '180deg' }]
 },
 title: {
   fontFamily: 'Jua',
   color: '#1C0D45',
   fontSize: 18,
 },
 titlePreperation: {
   fontFamily: 'Jua',
   color: '#1C0D45', 
   fontSize: 18,
   transform: [{ rotate: '180deg' }]
 },
 settingsButton: {
   backgroundColor: '#E8A85F',
   paddingHorizontal: 12,
   paddingVertical: 12,
   borderRadius: 8,
   transform: [{ rotate: '180deg' }],
 },
 settingsText: {
   color: 'white',
   fontFamily: 'Jua',
 },
 gridContainer: {
   flex: 1,
   flexDirection: 'row',
   flexWrap: 'wrap',
   gap: 16,
 },
 dropZone: {
   width: '48%',
   height: '48%',
   aspectRatio: 1,
   borderWidth: 2,
   borderStyle: 'dashed',
   borderColor: '#E8A85F',
   borderRadius: 8,
   alignItems: 'center',
   justifyContent: 'center',
   padding: 24,
 },
 plusIcon: {
   color: '#E8A85F',
   fontSize: 32,
   marginBottom: 8,
 },
 dropText: {
   color: '#1C0D45',
   fontFamily: 'Jua',
   fontSize: 14,
   textAlign: 'center',
 },
 autoSuggestContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginTop: 16,
},
autoSuggestLabel: {
  fontFamily: 'Jua',
  color: '#1C0D45',
  fontSize: 14,
},
});



export default PreperationSectionTable;
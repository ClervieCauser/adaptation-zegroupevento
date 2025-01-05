import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {changeUserLevel, changeUserMic} from '../../types/user';
import CustomHeader from '../../components/ui/CustomHeader';
import { Feather } from '@expo/vector-icons';
import { MOCK_USER } from '../../types/user';
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import CustomButton from '../../components/ui/CustomButton';
import {router} from 'expo-router';


const Badge = ({ type }) => {
  const isNovice = type === 'novice';
  return (
    <View style={[styles.badge, isNovice ? styles.noviceBadge : styles.expertBadge]}>
      {isNovice ? (
        <View style={styles.noviceContent}>
          <View style={styles.noviceCircle}>
            <Text style={styles.badgeText}>N</Text>
          </View>
          <View style={styles.stripesContainer}>
            <View style={styles.stripe} />
            <View style={styles.stripe} />
          </View>
        </View>
      ) : (
        <View style={styles.expertContent}>
          <View style={styles.starContainer}>
            <View style={styles.star} />
            <View style={styles.ribbons}>
              <View style={styles.ribbon1} />
              <View style={styles.ribbon2} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const Settings = () => {
  const [searchText, setSearchText] = React.useState('');
  const [textToSpeech, setTextToSpeech] = React.useState(true);
  const [cookLevel, setCookLevel] = React.useState('novice');
  const [notifications, setNotifications] = React.useState(true);
  const { isTablet } = useResponsiveLayout();
  

  const renderBadge = (level) => (
    <View style={styles.badgeContainer}>
      <Badge type={level} />
      <Text style={[styles.levelText, cookLevel === level && styles.levelTextActive]}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </Text>
    </View>
  );

  const submit = async () => {
      try {
        router.replace('/');
      } catch (error) {
        console.error(error);
      }
    }


  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader /> 
      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences d'assistance</Text>

        {/* Text to Speech Setting */}
        <View style={styles.settingCard}>
          <View style={styles.settingHeader}>
            <TouchableOpacity>
              <Feather
                name={MOCK_USER.micEnabled ? 'mic' : 'mic-off'}
                size={24}
                color="#666"
              />                        
            </TouchableOpacity>
            <Text style={styles.settingTitle}>Synthèse vocale</Text>
          </View>
          <Switch
            value={textToSpeech}
            onValueChange={(newValue) => {
              changeUserMic(newValue);
              setTextToSpeech(newValue); 
            }}
            trackColor={{ false: '#f4f3f4', true: '#f90' }}
            thumbColor={textToSpeech ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#f4f3f4"
          />
        </View>

        {/* Cook Level Setting */}
        <View style={[styles.settingCard, !isTablet && styles.settingCardPhone]}>
          <View style={styles.settingHeader}>
            <View style={styles.trophyContainer}>
              <Ionicons name="trophy" size={24} color="#f90" />
            </View>
            <Text style={styles.settingTitle}>Niveau de cuisinier ?</Text>
          </View>
          <View style={styles.levelContainer}>
            <TouchableOpacity
              style={[styles.levelButton, cookLevel === 'novice' && styles.levelButtonActive]}
              onPress={() => {setCookLevel('novice'), changeUserLevel('NOVICE')}}
            >
              {renderBadge('novice')}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.levelButton, cookLevel === 'expert' && styles.levelButtonActive]}
              onPress={() => {setCookLevel('expert'), changeUserLevel('EXPERT')}}
            >
              {renderBadge('expert')}
            </TouchableOpacity>
          </View>
        </View>
          <View style={styles.settingDisconnect}>
              <CustomButton
                title="Déconnexion"
                onPress={submit}
                containerStyles={styles.disconnectButton}
              />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FA',
    paddingTop: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 28,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingLeft: 44,
    paddingRight: 36,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Jua'
  },
  clearButton: {
    position: 'absolute',
    right: 28,
  },
  section: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Jua'
  },
  settingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Jua'
  },
  levelContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  settingCardPhone: {
    flexDirection: 'column',
    gap: 8,
  },
  levelButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  levelButtonActive: {
    borderColor: '#f90',
  },
  // Sound wave styles
  speechIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  // Menu button styles
  menuButton: {
    backgroundColor: '#f90',
    borderRadius: 4,
    padding: 8,
    gap: 3,
  },
  menuIcon: {
    width: 18,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  // Badge styles
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  noviceBadge: {
    backgroundColor: '#FFB74D',
  },
  expertBadge: {
    backgroundColor: '#FF9800',
  },
  noviceContent: {
    alignItems: 'center',
  },
  noviceCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stripesContainer: {
    position: 'absolute',
    bottom: 2,
    flexDirection: 'row',
    gap: 2,
  },
  stripe: {
    width: 6,
    height: 2,
    backgroundColor: '#FFF',
    borderRadius: 1,
  },
  expertContent: {
    alignItems: 'center',
  },
  starContainer: {
    alignItems: 'center',
  },
  star: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF',
    transform: [{ rotate: '180deg' }],
  },
  ribbons: {
    position: 'absolute',
    bottom: -4,
    flexDirection: 'row',
  },
  ribbon1: {
    width: 8,
    height: 12,
    backgroundColor: '#E65100',
    transform: [{ rotate: '15deg' }],
  },
  ribbon2: {
    width: 8,
    height: 12,
    backgroundColor: '#E65100',
    transform: [{ rotate: '-15deg' }],
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 4,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    fontFamily: 'Jua'
  },
  levelTextActive: {
    color: '#f90',
  },
  trophyContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff5e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWithWaves: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bellContainer: {
    padding: 4,
  },
  settingDisconnect:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  disconnectButton: {
    width: '40%', 
    justifyContent: 'center', 
    alignSelf: 'center',
    marginBottom: 10,
  }
});

export default Settings;
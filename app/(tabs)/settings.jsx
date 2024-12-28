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
import {changeUserLevel} from '../../types/user';

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

  const renderBadge = (level) => (
    <View style={styles.badgeContainer}>
      <Badge type={level} />
      <Text style={[styles.levelText, cookLevel === level && styles.levelTextActive]}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.headerIcons}>
          <View style={styles.speechIcon}>
            <Ionicons name="mic-outline" size={24} color="#666" />
            <View style={styles.soundWave}>
              <View style={[styles.wave, textToSpeech && styles.waveAnimated]} />
              <View style={[styles.wave, textToSpeech && styles.waveAnimated]} />
              <View style={[styles.wave, textToSpeech && styles.waveAnimated]} />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.bellContainer}
            onPress={() => setNotifications(!notifications)}
          >
            <Ionicons 
              name={notifications ? "notifications" : "notifications-off"} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuIcon} />
            <View style={styles.menuIcon} />
            <View style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by settings name"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== '' && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchText('')}
          >
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assistance preferences</Text>

        {/* Text to Speech Setting */}
        <View style={styles.settingCard}>
          <View style={styles.settingHeader}>
            <View style={styles.iconWithWaves}>
              <Ionicons name="mic-outline" size={24} color="#666" />
              <View style={styles.miniSoundWave}>
                <View style={[styles.miniWave, textToSpeech && styles.waveAnimated]} />
                <View style={[styles.miniWave, textToSpeech && styles.waveAnimated]} />
                <View style={[styles.miniWave, textToSpeech && styles.waveAnimated]} />
              </View>
            </View>
            <Text style={styles.settingTitle}>Text to speech</Text>
          </View>
          <Switch
            value={textToSpeech}
            onValueChange={setTextToSpeech}
            trackColor={{ false: '#f4f3f4', true: '#f90' }}
            thumbColor={textToSpeech ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#f4f3f4"
          />
        </View>

        {/* Cook Level Setting */}
        <View style={styles.settingCard}>
          <View style={styles.settingHeader}>
            <View style={styles.trophyContainer}>
              <Ionicons name="trophy" size={24} color="#f90" />
            </View>
            <Text style={styles.settingTitle}>Cook level ?</Text>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
  },
  clearButton: {
    position: 'absolute',
    right: 28,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
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
  },
  levelContainer: {
    flexDirection: 'row',
    gap: 12,
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
  soundWave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 16,
  },
  wave: {
    width: 2,
    height: '60%',
    backgroundColor: '#666',
    borderRadius: 1,
  },
  waveAnimated: {
    height: '100%',
  },
  miniSoundWave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    height: 12,
  },
  miniWave: {
    width: 1,
    height: '60%',
    backgroundColor: '#666',
    borderRadius: 0.5,
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
});

export default Settings;
import { StyleSheet, View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants/icons';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />
      <Text style={styles.iconText} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#ED9405',
            tabBarInactiveTintColor: '#CDCDE0',
        }}
        >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.bookmark} color={color} name="Favorites" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} name="Settings" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
    iconContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: 20,
      height: 20,
    },
    iconText: {
      fontSize: 12,
      fontFamily: 'jua',
      textAlign: 'center',
      width: 100,
      marginTop: 4,
    },
  });
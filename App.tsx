import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapScreen from './screens/MapScreen';
import PersonalEventsScreen from './screens/PersonalEventsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {

            switch (route.name) {
              case 'Map':
                return <Ionicons name="map-outline" size={size} color={color} />;
              case 'Personal':
                return <Ionicons name="person-outline" size={size} color={color} />;
              case 'Settings':
                return <Ionicons name="settings-outline" size={size} color={color} />;
              default:
                let iconName = route.name === 'Map' ? 'map-outline' : 'person-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Personal" component={PersonalEventsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

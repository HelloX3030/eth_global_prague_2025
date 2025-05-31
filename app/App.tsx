import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapScreen from './screens/MapScreen'
import UserScreen from './screens/UserScreen'
import SettingsScreen from './screens/SettingsScreen'

const Tab = createBottomTabNavigator()

export default function App() {

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color, size }) => {
						let iconName = 'help'
						if (route.name === 'Map') iconName = 'map-outline'
						else if (route.name === 'Personal') iconName = 'person-outline'
						else if (route.name === 'Settings') iconName = 'settings-outline'
						return <Ionicons name={iconName} size={size} color={color} />
					},
					tabBarActiveTintColor: 'tomato',
					tabBarInactiveTintColor: 'gray',
				})}
			>
				<Tab.Screen name="Map" component={MapScreen} />
				<Tab.Screen name="Personal" component={UserScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}

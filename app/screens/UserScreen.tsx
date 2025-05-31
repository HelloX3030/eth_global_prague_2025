import { StyleSheet, Text, SafeAreaView, ActivityIndicator, StatusBar, View, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

interface Score {
	id: number;
	value: number;
	valueDescription?: string;
	createdAt: string;
	longitude: number;
	latitude: number;
	title: string;
	description: string;
}

interface User {
	id: string;
	name: string;
	profilePicture: string;
	scores: Score[];
}

type RootTabParamList = {
  Map: { latitude: number; longitude: number; scoreId: number };
  Personal: undefined;
  Settings: undefined;
};

const UserScreen = () => {

	const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

	const [user, setUser] = useState<User | null>({
		id: '1',
		name: 'John Doe',
		profilePicture: require('../assets/tudn.jpeg'),
		scores: [
			{
	id: 2,
	value: 15,
	valueDescription: 'statues found in Old Town',
	createdAt: new Date().toISOString(),
	longitude: 14.4194,
	latitude: 50.0875,
	title: 'Statue Hunt',
	description: 'Find and photograph 15 different statues around Old Town Square.',
},
{
	id: 3,
	value: 1,
	valueDescription: 'hour watched',
	createdAt: new Date().toISOString(),
	longitude: 14.4201,
	latitude: 50.0865,
	title: 'Astronomical Watcher',
	description: 'Wait until the Astronomical Clock strikes the hour and watch the figures move.',
},
{
	id: 4,
	value: 300,
	valueDescription: 'steps climbed',
	createdAt: new Date().toISOString(),
	longitude: 14.4010,
	latitude: 50.0879,
	title: 'Climb the Tower',
	description: 'Climb all the steps to the top of the Old Town Hall Tower.',

},
{
	id: 5,
	value: 3,
	valueDescription: 'local dishes eaten',
	createdAt: new Date().toISOString(),
	longitude: 14.4300,
	latitude: 50.0722,
	title: 'Czech Feast',
	description: 'Eat svíčková, goulash, and trdelník in one sitting.',

},
{
	id: 6,
	value: 5,
	valueDescription: 'bridges crossed',
	createdAt: new Date().toISOString(),
	longitude: 14.4115,
	latitude: 50.0870,
	title: 'Bridge Explorer',
	description: 'Cross 5 different bridges on foot, including Charles Bridge and Mánesův Most.',
},
{
	id: 7,
	value: 1,
	valueDescription: 'maze solved',
	createdAt: new Date().toISOString(),
	longitude: 14.3972,
	latitude: 50.0838,
	title: 'Mirror Maze Master',
	description: 'Find your way through the mirror maze at Petřín Hill without getting lost!',
},
{
	id: 8,
	value: 100,
	valueDescription: 'stairs descended',
	createdAt: new Date().toISOString(),
	longitude: 14.3960,
	latitude: 50.0883,
	title: 'Castle Descent',
	description: 'Walk down all the stairs from Prague Castle to Malá Strana.',
},
{
	id: 9,
	value: 1,
	valueDescription: 'tram line completed',
	createdAt: new Date().toISOString(),
	longitude: 14.4632,
	latitude: 50.0992,
	title: 'Full Tram Ride',
	description: 'Ride the entire route of tram line 22 from end to end.',
}

		],
	});

	return (
			<ScrollView style={styles.safeArea}>
			<View style={styles.userInfo}>
				<Image
					source={user != null ? { uri: user.profilePicture } : require('../assets/tudn.jpeg')}
					style={{ width: 150, height: 150, borderRadius: 75 }}
				/>
				<Text style={styles.userName}>{user != null ? user.name : 'Loading...'}</Text>
				<Text style={styles.userScores}>{user != null ? user.scores.length : 0} scores</Text>
			</View>
			{!user ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<View style={styles.userScores}>
					<Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Scores:</Text>
					{user.scores.map((score) => (
						<TouchableOpacity key={score.id} style={styles.scoreItem} onPress={() => navigation.navigate('Map', {
							latitude: score.latitude,
							longitude: score.longitude,
							scoreId: score.id,
						})}>
							<Text style={styles.scoreTitle}>{score.title}</Text>
							<Text style={styles.scoreDescription}>{score.description}</Text>
							<Text style={styles.scoreValue}>Score: {score.value} {score.valueDescription}</Text>
							<Text style={styles.scoreLocation}>Location: {score.latitude}, {score.longitude}</Text>
							<Text style={styles.scoreDate}>Created At: {new Date(score.createdAt).toLocaleDateString()}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
			</ScrollView>
	);
}

const styles = StyleSheet.create({
  userInfo: { alignItems: 'center', marginBottom: 20 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  userScores: { padding: 20, backgroundColor: '#f9f9f9', borderRadius: 10, marginHorizontal: 10 },
  scoreItem: { marginBottom: 15, padding: 10, backgroundColor: '#fff', borderRadius: 5 },
  scoreTitle: { fontSize: 16, fontWeight: 'bold' },
  scoreDescription: { fontSize: 14, color: '#666' },
  scoreValue: { fontSize: 14, color: '#333' },
  scoreLocation: { fontSize: 12, color: '#999' },
  scoreDate: { fontSize: 12, color: '#999' },
  activityIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  safeArea: { flex: 1, backgroundColor: '#fff' },
  statusBar: { backgroundColor: '#fff' },
});

export default UserScreen;
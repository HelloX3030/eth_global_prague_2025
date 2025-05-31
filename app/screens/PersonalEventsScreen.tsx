import { StyleSheet, Text, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';

const PersonalEventsScreen = () => {
  return (
	<SafeAreaView style={styles.container}>
	  <Text>Personal Events Screen</Text>
	  <StatusBar />
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default PersonalEventsScreen;
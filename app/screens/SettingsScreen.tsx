import { StyleSheet, Text, SafeAreaView, ActivityIndicator } from 'react-native';

const SettingsScreen = () => {
  return (
	<SafeAreaView style={styles.container}>
	  <Text style={styles.title}>Settings</Text>
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
});

export default SettingsScreen;
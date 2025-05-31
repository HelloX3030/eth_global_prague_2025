import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, Modal, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';

type LocationCoords = {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
};

interface Challenge {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  creator: string;
}


const MapScreen = () => {

  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
   const [focusedLocation, setFocusedLocation] = useState<LocationCoords | null>(null);

  interface MapScreenRouteParams {
    latitude: number;
    longitude: number;
  }

  const route = useRoute();
  useEffect(() => {
    const params = (route as { params?: MapScreenRouteParams }).params;
    if (params && params.latitude && params.longitude) {
      setFocusedLocation({
        latitude: params.latitude,
        longitude: params.longitude,
      });
    }
  }, [route]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
  id: 1,
  title: 'Attend Prague Spring Finale',
  description: 'Experience the grand closing of the Prague Spring Music Festival at the stunning Rudolfinum.',
  latitude: 50.0915,
  longitude: 14.4142,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'User123',
},
{
  id: 2,
  title: 'Try 10 Ice Creams at the Festival',
  description: 'Head to Výstaviště and try 10 different flavors at Prague’s Ice Cream Festival.',
  latitude: 50.1071,
  longitude: 14.4305,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'UserIceLover',
},
{
  id: 3,
  title: 'Sip Wine at Grébovka Cellar',
  description: 'Enjoy local Czech wines with a view in Havlíčkovy Sady.',
  latitude: 50.0689,
  longitude: 14.4378,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'UserSommelier',
},
{
  id: 4,
  title: 'Ride the Historic Cyclone Coaster',
  description: 'Feel the adrenaline rush on the legendary Cyclone roller coaster at Výstaviště.',
  latitude: 50.1080,
  longitude: 14.4309,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'UserThrill',
},
{
  id: 5,
  title: 'Explore Prague Castle Grounds',
  description: 'Discover royal secrets and medieval charm at one of the largest castles in the world.',
  latitude: 50.0900,
  longitude: 14.4000,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'UserHistorian',
},
{
  id: 6,
  title: 'Enjoy an Outdoor Concert at Prague Proms',
  description: 'Catch a symphonic open-air concert during the Prague Proms music series.',
  latitude: 50.0760,
  longitude: 14.4370,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'UserMaestro',
},
{
  id: 7,
  title: 'Taste Craft Beer in the Royal Gardens',
  description: 'Sample the best microbrews in the royal gardens of Prague Castle.',
  latitude: 50.0905,
  longitude: 14.3980,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'UserBrewer',
},
{
  id: 8,
  title: 'Catch a Live Street Performance',
  description: 'Find and enjoy a live street performance around Old Town Square.',
  latitude: 50.0870,
  longitude: 14.4208,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'UserVibes',
},
{
  id: 9,
  title: 'Ride the Petřín Funicular',
  description: 'Take the funicular up to Petřín Hill and enjoy sweeping views of Prague.',
  latitude: 50.0833,
  longitude: 14.3950,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'UserViewfinder',
},
{
  id: 10,
  title: 'Climb to the Prague Metronome',
  description: 'Reach the giant metronome at Letná Park and relax with panoramic city views.',
  latitude: 50.0930,
  longitude: 14.4170,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  creator: 'UserExplorer',
}

  ]);



  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const createChallenge = async (challenge: Challenge) => {

    if (!challenge.title || !challenge.description) {
      setErrorMsg('Title and description are required');
      return;
    }

    setChallenges(prevChallenges => [...prevChallenges, challenge]);
  }

  const handleCreateChallenge = () => {
    if (!location) return;
    createChallenge({
      id: Date.now(),
      title: newTitle || 'New Challenge',
      description: newDescription || 'Description of the new challenge',
      latitude: location.latitude,
      longitude: location.longitude,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completed: false,
      creator: 'User123',
    });
    setModalVisible(false);
    setNewTitle('');
    setNewDescription('');
  };


  useEffect(() => {
    (async () => {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        // Get current location
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } catch (error: any) {
        setErrorMsg('Failed to get location: ' + error.message);
      }
    })();
  }, []);

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: {errorMsg}</Text>
      </SafeAreaView>
    );
  }

  if (!location) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Fetching location...</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: focusedLocation?.latitude ?? location.latitude,
          longitude: focusedLocation?.longitude ?? location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {
          challenges.map((challenge) => (
            <Marker
              key={challenge.id}
              coordinate={{ latitude: challenge.latitude, longitude: challenge.longitude }}
              title={challenge.title}
              description={challenge.description}
            />
          ))
        }
      </MapView>
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 20, left: 20, padding: 10, backgroundColor: 'red', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: 'white' }}>Create Challenge</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>New Challenge</Text>
            <Text>Name of your Challendge</Text>
            <TextInput
              placeholder="Title"
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
            />
            <Text>Describe your Challenge</Text>
            <TextInput
              placeholder="Description"
              value={newDescription}
              onChangeText={setNewDescription}
              style={[styles.input, { height: 60 }]}
              multiline
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, { backgroundColor: '#ccc' }]}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateChallenge} style={[styles.modalButton, { backgroundColor: 'red' }]}>
                <Text style={{ color: 'white' }} disabled={!newTitle || !newDescription}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
});


export default MapScreen;
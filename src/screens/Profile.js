import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, query, where, getDoc } from 'firebase/firestore';

const Profile = () => {
  //Store restaurants
  const [savedRestaurants, setSavedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRestaurants = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser; // Get the currently logged-in user

        // Check if a user is logged in
        if (!currentUser) {
          console.error('No user logged in');
          return;
        }

        const db = getFirestore();
        const userDocRef = doc(db, 'users', currentUser.uid); // Reference to user's document
        const userDocSnap = await getDoc(userDocRef); // Fetch the document

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const restaurants = userData.savedRestaurants || []; // Get the savedRestaurants field
          setSavedRestaurants(restaurants); // Update the state with the array of saved restaurants
        } else {
          console.error('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching saved restaurants:', error);
      } finally {
        setLoading(false);// Stop the loading spinner
      }
    };

    fetchSavedRestaurants();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (savedRestaurants.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No saved restaurants found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedRestaurants}
        keyExtractor={(item, index) => index.toString()} // Use index as a unique id
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>City: {item.city}</Text>
            <Text>Rating: {item.rating}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  
});

export default Profile;
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const Profile = () => {
  //Store restaurants
  const [savedRestaurants, setSavedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRestaurants = async () => {
      try {
        const auth = getAuth(); 
        const currentUser = auth.currentUser; //Get current user

        //Check if logged in
        if (!currentUser) {
          console.error('No user logged in');
          return;
        }

        const email = currentUser.email; //currentUser email
        //reference savedRestaurants database
        const db = getFirestore();
        const savedRestaurantsRef = collection(db, 'savedRestaurants');

        //Query to filter by user's email
        const querySnapshot = await getDocs(query(savedRestaurantsRef, where('email', '==', email)));
        
        //map the records in database to restaurants array
        const restaurants = querySnapshot.docs.map((doc) => ({id: doc.id,...doc.data(),}));
        setSavedRestaurants(restaurants);
      } catch (error) {
        console.error('Error fetching saved restaurants:', error);
      } finally {
        setLoading(false);
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.restaurantName}</Text>
            <Text>City: {item.restaurantCity}</Text>
            <Text>Rating: {item.restaurantRating}</Text>
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
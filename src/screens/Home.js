import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ImageBackground, Button} from 'react-native'
import React, {useState, useEffect} from 'react'
import RestaurantCard from '../components/RestaurantCard'
import axios from 'axios'
import MultiSelect from 'react-native-multiple-select'; // Import the MultiSelect
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { auth } from '../service/firebase'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import {YELP_API_KEY} from '@env';


export default function Home() {
  const [data, setData] = useState([]); 
  const [city, setCity] = useState('New York')
  const [category, setCategory] = useState('')
  const [radius, setRadius] = useState(200)
  const [price, setPrice] = useState('')
  const [currentIndex, setCurrentIndex] = useState([0])

  const firestore = getFirestore();

  const radiusOptions = [
    { id: 5, name: '5 miles' },
    { id: 10, name: '10 miles' },
    { id: 20, name: '20 miles' },
    { id: 25, name: '25 miles' }
  ];

  //updateLocation
  const updateLocation = (newCity) => {
    setCity(newCity);
  }

  //updateCategory
  const updateCategory = (newCategory) => {
    setCategory(newCategory);
  }

  //updateRadius
  const updateRadius = (newRadius) => {
      setRadius(newRadius[0] * 1600); // Convert miles to meters
  }

  //updatePrice
  const updatePrice = (newPrice) => {
    setPrice(newPrice);
  }

  //Save preferences
  const setPreferences = () => {
    fetchData();
  }

  //Swipe
  const nextRestaurant = () => {
    
    if (currentIndex + 1 < data.length) {
      setCurrentIndex(currentIndex + 1);
    }
    else {
      setCurrentIndex(0);
    }
    console.log("HELP" + radius);
  }

  //fetch restaurant data from yelp
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.request({
        method: 'get',
        url: 'https://api.yelp.com/v3/businesses/search',
        params: {
          location: `${city}, USA`,
          term: 'restaurants',
          sort_by: 'best_match',
          limit: '10',
          radius: radius,
          categories: category
          
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      });
      setData(response.data.businesses);
    } catch (error) {
      console.error(error);
    }
  };

  // Save the current restaurant to Firestore for the logged-in user
  const saveRestaurant = async () => {

    const currentRestaurant = data[currentIndex]; //current restaurant
    const user = auth.currentUser;

    if (user) { // check if user is logged in
      try {
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, {
          savedRestaurants: arrayUnion({
            name: currentRestaurant.name,
            city: city,
            rating: currentRestaurant.rating,
          }),
        });
        console.log('Restaurant saved to favorites!');
      } catch (error) {
        console.error('Error saving restaurant:', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <View style={styles.container}>
    
      <View style={styles.optionsContainer}>
        <Text>Enter Location</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={updateLocation}
          value={city}
          placeholder="Enter city..."
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={updateCategory}
          value={category}
          placeholder="Enter category..."
        />
        <MultiSelect
          items={radiusOptions}
          uniqueKey="id"
          onSelectedItemsChange={updateRadius}
          selectedItems={[radius]}
          single={true} // Only allow single selection
          searchInputPlaceholderText="Select Max Distance"
          selectText="Select Max Distance"
          styleMainWrapper={{ marginVertical: 10 }}
        />
        <Button title='Save' onPress={setPreferences}/>
      </View>
        {/* <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={upadatePrice}
          value={price}
          placeholder="Enter price..."
        />  */}
        
            
        
      
      <RestaurantCard restaurant={data[currentIndex]}/>
{/* 
      {data[currentIndex] && (
        <View style={styles.restaurantCard}>
        <ImageBackground
            style={styles.imageBackground}
            source={{ uri: data[currentIndex].image_url}}
          >
            <Text style={styles.name}>{data[currentIndex].name}</Text>
            <StarRatingDisplay
              rating={data[currentIndex].rating}
              starSize={25}
            />
            <Text>{data[currentIndex].location['display_address']}</Text>
          </ImageBackground>
        </View>
      )} */}
        {/* {data[currentIndex] && (
        <>
          <Text>{data[currentIndex].name} - {data[currentIndex].location.display_address}</Text>
          <Text>Rating - {data[currentIndex].rating}</Text>
          <Image
            style={{ width: 100, height: 100 }} // Adjust size as needed
            source={{ uri: data[currentIndex].image_url }}
          />
        </>
      )} */}
      <View style = {styles.addNextContainer}>
        <TouchableOpacity onPress={nextRestaurant}>
          <Entypo name="circle-with-cross" size={65} color="#B86767" />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveRestaurant}>
          <Ionicons name="heart-circle" size={65} color="#E98DF8" />
        </TouchableOpacity>    
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6CCBC'
  },
  optionsContainer: {    
    backgroundColor: '#E6CCBC',
    padding: 10,
  },
  addNextContainer:{
    flexDirection: 'row', // Horizontally next to each other
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10, 
    marginVertical: -45
  },
  addNext:{
    backgroundColor: 'white'
  }
});

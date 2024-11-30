import React from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import StarRatingDisplay from 'react-native-star-rating-widget';

export default function RestaurantCard({name, image, rating}) {
  const cappedRating = Math.min(parseFloat(rating) || 0, 5); // Ensure rating is valid and capped
  return (
    <ImageBackground style={styles.imageBackground} source={{ uri: image }}>
            <Text style={styles.name}>{name}</Text>
            <StarRatingDisplay
              rating={cappedRating}
              starSize={25}
            />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    imageBackground: {
    width: '100%',
    height: 300,
    flexDirection: 'column',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
})
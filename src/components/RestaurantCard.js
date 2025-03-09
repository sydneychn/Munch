import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';


const RestaurantCard = ({ restaurant }) => {
  if (!restaurant) return null;

  return (
     <View style={styles.RestaurantCard}>
            <ImageBackground
                style={styles.imageBackground}
                source={{ uri: restaurant.image_url}}
              > 
              <Text style={styles.name}>{restaurant.name}</Text>
              <View style ={styles.ratingsContainer}>
                <StarRatingDisplay
                  rating={restaurant.rating}
                  starSize={25}
                />
                <Text style = {{color: "white"}}>{restaurant.review_count} ratings </Text>
              </View>  
              </ImageBackground>
        <View style = {styles.bottomHalf}>
              <Text>{restaurant.location['display_address']}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    flexDirection: 'column',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#EEDFD5',
  },
  bottomHalf: {
    padding: 40,
    backgroundColor: "#EEDFD5",
    borderRadius: 10,
  },  
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
  rating: {
    fontSize: 16,
    color: 'grey',
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: 'center'
  }
});

export default RestaurantCard;

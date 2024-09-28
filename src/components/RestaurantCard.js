import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function RestaurantCard() {
  return (
    <View style = {styles.container}>
      <Text>RestaurantCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEDFD5'
    }
})
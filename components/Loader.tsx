import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const {width} = Dimensions.get("window")
const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
       size="large"
       color="#1e90ff"
      />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d3d3d3",
        alignItems: "center",
        justifyContent: "center",
        width: width,
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex:10, // Ensure loader is above content
    }
})
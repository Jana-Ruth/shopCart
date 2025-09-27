import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from './Logo'
import {  AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-screens'
import { router, useRouter } from 'expo-router'

const HomeHeader = () => {
    const router = useRouter()
  return (
   <SafeAreaView style={styles.container}>
     <View style={styles.header}>
      <Logo/>
      <View style={styles.iconContainer}>
        <TouchableOpacity 
        style={styles.SearchButton} 
        onPress={()=>router.push("/(tabs)/Search")}
        >
        <Ionicons
        name='search-outline'
        size={20}
        color={"#a9a9a9"}
        />
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.SearchButton} 
        onPress={()=>router.push("/(tabs)/Favourite")}
        >
            <MaterialCommunityIcons
            name='heart-outline' 
            size={20} 
            color="#a9a9a9" 
            />
            <View style={styles.itemsView}>
                <Text style={styles.itemsText}>0</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.SearchButton} 
        onPress={()=>router.push("/(tabs)/Cart")}
        >
            <MaterialCommunityIcons
            name='cart-outline' 
            size={20} 
            color="#a9a9a9" 
            />
            <View style={styles.itemsView}>
                <Text style={styles.itemsText}>0</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
   </SafeAreaView>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
   container: {
    backgroundColor: "#ffffff",
    paddingBottom: -40
   },
   header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    paddingBottom: 5,
    paddingHorizontal: 20,
   },
   iconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
   },
   SearchButton: {
backgroundColor: "#e0ffff",
borderRadius: 5,
width: 35,
height: 35,
alignItems: "center",
justifyContent: "center",
marginLeft: 8,
borderWidth: 1,
borderColor: "#4169e1",
position: "relative"
   },
itemsView:{
position: "absolute",
top: -5,
right: -5,
borderRadius: 50,
width: 16,
height: 16,
alignItems: "center",
justifyContent: "center",
borderWidth: 1,
borderColor: "#4169e1",
backgroundColor: "#ffffff"
},

itemsText: {
    fontSize: 10,
    color: "#ffa500",
    fontWeight: 800
}

})
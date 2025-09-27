import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, Feather, Foundation, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'


interface Props {
    isFav?: boolean;
    showCart?: boolean;
    handleToggleFavorite?: () => void;
}
const CommonHeader = ({isFav,showCart,handleToggleFavorite}:Props) => {
    const router = useRouter()
    const handleGoBack=()=>{
        if(router.canGoBack()){
            router.back()
        } else{
           router.push("/") 
        }
    };
  return (
    <View style={styles.header}>
     <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Feather  
        name = "arrow-left"
        size={20}
        color="rgb(60, 59, 59)"
        />
     </TouchableOpacity>
     <View style={styles.buttonView} >
        <TouchableOpacity style={[styles.favouriteButton, isFav && styles.activeFavouriteButton]}>
            <AntDesign 
            name="hearto" 
            size={20}
            color={
                isFav ? "black" : "rgb(60, 59, 59)"
            }
            fill={isFav ? "white" : "transparent" }
            />
        </TouchableOpacity>

         <TouchableOpacity 
         onPress={()=> router.push("/(tabs)/Cart")}
         style={[styles.favouriteButton, isFav && styles.activeFavouriteButton]}>
            <MaterialCommunityIcons
            name="cart-outline" 
            size={24}
            color={
                isFav ? "black" : "rgb(60, 59, 59)"
            }
            fill={isFav ? "white" : "transparent" }
            />
        </TouchableOpacity>
     </View>
    </View>
  )
}

export default CommonHeader

const styles = StyleSheet.create({
    header: { 
flexDirection: "row",
justifyContent: "space-between",
paddingHorizontal: 16,
paddingTop: 16,
zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "whitesmoke",
        alignItems: "center",
        justifyContent: "center"
    },
    favouriteButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "0rangered",
        alignItems: "center",
        justifyContent: "center",
    },
    activeFavouriteButton: {
        backgroundColor: "red"
    },
    buttonView: {
flexDirection: "row",
gap: 5,
    }

})
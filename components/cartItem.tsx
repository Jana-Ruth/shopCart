import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Product } from '@/type';
import { useRouter } from 'expo-router';
import { useCartStore } from '@/store/cartStore';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

interface CartItemProps {
  product: Product;
  quantity: number
}
const CartItem:React.FC<CartItemProps> = ({product, quantity}) => {
    const router = useRouter();
    const {updateQuantity, removeItem}= useCartStore()

const handlePress=()=> {
    router.push(`/product/${product.id}`)
};

const handleDecrease = () => {
 if(quantity>1){
        updateQuantity(product.id, quantity - 1)
       Toast.show({
         type: "success",
         text1: "Quantity decreased successfully",
         visibilityTime: 2000,
        })
 } else {
        Toast.show({
         type: "error",
         text1: "You cannot decrease less than 1",
         visibilityTime: 2000,
        })
 }
};

const handleIncrease = () => {
   updateQuantity(product.id, quantity + 1)
   Toast.show({
         type: "success",
         text1: "Quantity increased successfully",
         visibilityTime: 2000,
        })
};

const handleRemove = () => {
    removeItem(product.id)
     Toast.show({
         type: "success",
         text1: "Removed Successfully",
         text2: `${product.title} has been removed from your cart`,
         visibilityTime: 2000,
        })
}

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.imageContainer} 
      onPress={handlePress}
      >
        <Image 
        source={{uri:product.image}} 
        style={styles.image} 
        resizeMode='contain'
        />
      </TouchableOpacity>
      <View style={styles.details}>
        <TouchableOpacity  onPress={handlePress}>
            <Text style={styles.title}>{product.title}</Text>
        </TouchableOpacity>
        <Text style={styles.price}>${(product.price * quantity).toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecrease}style={styles.quantityButton}>
                <AntDesign
                 name='minus'
                 size={16}
                 color={"rgb(60, 59, 59)"}
                />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity onPress={handleIncrease}style={styles.quantityButton}>
                <AntDesign
                 name='plus'
                 size={16}
                 color={"rgb(60, 59, 59)"}
                />
            </TouchableOpacity> 

            <TouchableOpacity 
            onPress={handleRemove}
            style={styles.removeButton}>
                <MaterialCommunityIcons
                 name='delete-outline'
                 size={18}
                 color={"#ff0000"}
                />
            </TouchableOpacity>                     

        </View>
      </View>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 16,
      backgroundColor: "#ffff",
      borderRadius: 8,
      marginBottom: 12,
      shadowColor: "#0000",
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 1,
      borderWidth: 1,
      borderColor: "#d3d3d3",
    },

    imageContainer: {
      width: 80,
      height: 80,
      backgroundColor: "whitesmoke",
      borderRadius: 8,
      overflow: "hidden",
      marginRight: 16,
    },

    image:{
      width: "100%",
      height: "100%",
    },
    details:{
      flex: 1,
      justifyContent:"space-between"
    },
    title: {
      fontSize:16,
      fontWeight: "500",
      color: "rgb(60, 59, 59)",
      marginBottom: 4,
    },
    price: {
      fontSize: 16,
      fontWeight:"600",
      color: "#1e90ff",
      marginBottom: 8,
    },
    quantityContainer:{
        flexDirection: "row",
        alignItems: "center"
    },
    quantityButton: {
      width: 28,
      height: 28,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "whitesmoke"  
    },
    quantity: {
      fontSize: 14,
      fontWeight: "500",
      color: "rgb(60, 59, 59)",
      paddingHorizontal: 12,

    },
    removeButton: {
        marginLeft: "auto",
        width: 28,
        height: 28,
        borderRadius: 4,
        backgroundColor: "whitesmoke",
        alignItems: "center",
        justifyContent: "center",
    },
})
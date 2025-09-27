import { Alert, Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Product } from '@/type';
import Button from './Button';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

interface ProductCardProps {
    product: Product;
    compact?: boolean;
    customStyle?: StyleProp<ViewStyle>
}
const ProductCard:React.FC<ProductCardProps> = ({
    product, 
    compact = false,
    customStyle,
}) => {
    const {id,title,price,image,category}=product;
    const router = useRouter()
const handleProductRoute= (e: any) => {
router.push("/product/[id]")
}
    const handleAddToCart = () => {
     Toast.show({
      type: "success",
      text1: "Product Added To Cart",
      text2: `${title} has deen added to your added to cart`,
      visibilityTime: 2000,
     })
    }

  return (
    <TouchableOpacity 
    onPress={handleProductRoute}
    style={[styles.card, compact && styles.compactCard,
        customStyle]}
        activeOpacity={0.8}
        >
              <View style={styles.imageContainer}>
                <Image 
                source={{uri: image}} 
                style={styles.image}
                resizeMode='contain'
                />
              </View>
              <View style={styles.content}>
                <Text style={styles.category}>{category}</Text>
                <Text 
                style={styles.title} 
                numberOfLines={compact ? 1 : 2}
                ellipsizeMode='tail'
                >
                    {title}

                </Text>
                <View style={styles.footer}>
                    <Text style={[styles.price, !compact && {marginBottom: 7}]}>${price.toFixed(2)}</Text>
                    {!compact && 
                    <Button 
                    onPress={handleAddToCart}
                    title="Add To Cart" 
                    size="small" variant="outline"/>
                    }
                </View>
              </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
card: {
backgroundColor: "#ffff",
borderRadius: 12,
shadowColor: "#000",
shadowOffset: {width: 0, height: 2},
shadowOpacity: 0.1,
shadowRadius: 8,
elevation: 2,
overflow: "hidden",
width: "48%",
marginBottom: 16,
borderWidth: 1,
borderColor: "#dcd9d9ff",
},

compactCard: {
width: 150,
marginRight: 12,
}
,
imageContainer: {
    position: "relative",
    height: 150,
    backgroundColor: "#fff"
},

image: {
width: "100%",
height: "100%",
},

   favoriteButton: {
position: "absolute",
top: 8,
right: 8,
backgroundColor: "#1e90ff",
borderRadius: 20,
width: 32,
   },

content: {
padding: 12,
backgroundColor: "whitesmoke"
},

category:{
fontSize: 12,
color: "#696969",
textTransform: "capitalize",
marginBottom: 4,
},

title: {
fontSize: 14,
fontWeight: "500",
color:"rgb(81, 79, 79",
marginBottom: 8,
},


 footer: {
justifyContent: "space-between"
  } ,
   
    price: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1e90ff",
        marginBottom: 5,
    }
})
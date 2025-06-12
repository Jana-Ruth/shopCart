import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Product } from '@/type';
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
    const {id,title,price,image,category}=product
  return (
    <TouchableOpacity style={[styles.card, compact && styles.compactCard,
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
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
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
borderColor: "#a9a9a9",
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
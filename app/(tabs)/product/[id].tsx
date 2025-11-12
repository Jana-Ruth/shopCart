import Button from '@/components/Button'
import CommonHeader from '@/components/CommonHeader'
import LoadingSpinner from '@/components/LoadingSpinner'
import Rating from '@/components/Rating'
import { getProduct } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import { useFavoritesStore } from '@/store/favouriteStore'
import { Product } from '@/type'
import { AntDesign } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
const {width}=Dimensions.get("window")

const SingleProductScreen = () => {
    const {id}=useLocalSearchParams<{id:string}>();
    const [product, setProduct]=useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const[quantity, setQuantity] =useState(1);
    const idNum = Number(id);

    const {addItem} = useCartStore();
    const {isFavorite, toggleFavorite} = useFavoritesStore();
    
    

    const router  = useRouter();

useEffect(() => {
  const fetchProductData = async () => {
    setLoading(true);
    try{
      const data = await getProduct(idNum);
      setProduct(data);
    } catch (error){
      setError("Failed to fecth product data");
      console.log("Error: ", error)
    } finally {
      setLoading(false);
    }
  };
  fetchProductData();
      if (id) {
        fetchProductData();
      }
   
}, [id]);

if (loading) {
  return (
     <View style={{flex:1, alignItems:"center", justifyContent:"center", }}>
      <LoadingSpinner fullScreen/>
     </View>
  );
}

if (error || !product) {
  return (
    
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Product not found"}</Text>
        <Button title="Go Back" onPress={() => router.back()}/>
      </View>
   
  )
}

const isFav = isFavorite(product?.id)

const handleAddToCart = () => {
  addItem(product, quantity)
   Toast.show({
        type: "success",
        text1: "Product Added To Cart",
        text2: `${product?.title} has deen added to your added to cart`,
        visibilityTime: 2000,
       })
};

const handleToggleFavorite = () => {
      toggleFavorite(product);
    }
    
  return (
    <View style={{paddingTop:30, backgroundColor:"white", position: "relative"}}>
      <CommonHeader isFav={isFav} handleToggleFavorite={handleToggleFavorite}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
          source={{uri: product?.image}} 
          style={styles.productImage} 
          resizeMode='contain'
          />
        </View>

        <View style={styles.productInfo}>
            <Text style={styles.category}>
              {product?.category?.charAt(0).toUpperCase() +
              product?.category?.slice(1)}
            </Text>
            <Text style={styles.title}>{product?.title}</Text>
            <View style={styles.ratingContainer}>
              <Rating
               rating={product?.rating?.rate}
               count={product?.rating?.count}
              />
            </View>
            <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
            <View style={styles.divider}/>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{product?.description}</Text>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityTitle}>Quantity</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity((prev) => prev - 1)
                  }
                }}
                disabled={quantity <= 1}
                
                 style={styles.quantityButton}>
                  <AntDesign
                    name='minus'
                    size={20}
                    color={"rgba(64, 63, 63, 1)"}
                    
                  />
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)} 
                style={styles.quantityButton}>
                  <AntDesign
                    name='plus'
                    size={20}
                    color={"rgba(64, 63, 63, 1)"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${(product?.price * quantity).toFixed(2)}</Text>
        <Button 
        title='Add to Cart' 
        onPress={handleAddToCart}
        style={styles.addToCartButton}
        />
      </View>
    </View>
  )
}

export default SingleProductScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    width: width,
    height: width,
    alignItems: "center",
    justifyContent: "center"
  },
  productImage: {
    width: "80%",
    height: "80%",
  },
  productInfo: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    paddingTop: 10,
    backgroundColor: "#f2f2f2",
  },
  category: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#696969",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  title:{
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "rgb(60, 59, 59)",
    marginBottom: 8,
  },
  ratingContainer: {
    marginBottom: 16,

  },
 price: {
  fontFamily: "Inter-Bold",
  fontSize: 24,
  color: "#1e90ff",
  marginBottom: 16,
 },
 divider: {
    height: 1,
    backgroundColor: "#d3d3d3",
    marginBottom: 16,
 },
 descriptionTitle: {
  fontFamily: "Inter-SemiBold",
  fontSize: 18,
  color: "rgb(60, 59, 59)",
  marginBottom: 8,
 },
  description: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#696969",
    lineHeight: 24,
    marginBottom: 24
  },
  quantityContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  quantityTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "rgb(60, 59, 59)",
  },
  quantityControls: {
     flexDirection: "row",
     alignItems: "center",
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
  
  quantityValue: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "black",
    paddingHorizontal: 16
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#d3d3d3",
    paddingVertical: 16,
    paddingHorizontal: 24,
    paddingBottom:32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalPrice: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "rgb(60, 59, 59)",
  },

  addToCartButton: {
    width: "40%"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  errorButton:{
    marginTop:8,
  }
})
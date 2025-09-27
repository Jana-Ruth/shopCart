import HomeHeader from '@/components/HomeHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductCard from '@/components/ProductCard';
import Wrapper from '@/components/Wrapper';
import { useProductsStore } from '@/store/productStore';
import { Product } from '@/type';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View,  StyleSheet, ScrollView, TouchableOpacity, FlatList, } from 'react-native';



import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
const router =useRouter()
  const [featuredProducts, setFeaturedProducts] = 
useState<Product[]>([]);
const {
  products,
  categories,
  loading,
  error,
  fetchProducts,
  fetchCategories
} = useProductsStore();

useEffect(()=>{
fetchProducts();
fetchCategories();
}, []);

useEffect(()=>{
  if(products.length>0){
    const reverseProducts=[...products].reverse();
    setFeaturedProducts(reverseProducts as Product[])
  }
}, [products]);

const navigateToCategory=(category:string)=>{
  router.push({
  pathname:"/(tabs)/shop",
  params: {
     category,
  },
  });
};

if(loading){
  return (
    
     <SafeAreaView style={styles.container}>
<View style={styles.errorContainer}>
<LoadingSpinner fullScreen/>
</View>
    </SafeAreaView>
  );
}

if (error) {
  return (
    <SafeAreaView style={styles.container}>
<View style={styles.errorContainer}>
<Text style={styles.errorText}>Error: {error}</Text>
</View>
    </SafeAreaView>
  )
}
  return (
   <View style={styles.wrapper}>
    <HomeHeader/>
    <View style={styles.contentContainer}>
      <ScrollView showsVerticalScrollIndicator={false} 
       contentContainerStyle={styles.scrollContainerView}>
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator=
          {false}>
{categories?.map((category)=>(
  <TouchableOpacity
  key={category}
   style={styles.categoryButton} 
  onPress={()=>navigateToCategory(category)}>
    <MaterialCommunityIcons 
    name="tag" 
    size={16} 
    color="#1e90ff"
    />
    <Text style={styles.categoryText}>{category.charAt(0).toUpperCase() +
    category.slice(1)  }</Text>
  </TouchableOpacity>
))}
          </ScrollView>
        </View>
        <View style={styles.featuredSection}>
           <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList 
          data={featuredProducts}
          keyExtractor={(item) =>item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredProductContainer}
            renderItem={({item}) =>(
              <View style={styles.featuredProductContainer}>
                <ProductCard product={item} compact
                />
              </View>
            )} 
         />
        </View>
        {/* Newest Products */}
        <View style={styles.newestSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Newest Arrivals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productGrid}>
            {products?.map((product)=>(
              <View key={product?.id} style={styles.productContainer}>
                <ProductCard product={product} customStyle={{width:"100%"}}/>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
   </View>
    
  );
}

const styles = StyleSheet.create({

  categoryText:{
fontFamily: "Inter-Medium",
fontSize: 14,
color: "#000",
marginLeft: 8,
  },

  featuredSection:{
marginVertical: 16,
  },

  featuredProductContainer:{

  },

  newestSection: {
marginVertical: 16,
marginBottom: 32,
  },

  productGrid: {
flexDirection: "row",
flexWrap: "wrap",
justifyContent: "space-between",
paddingRight: 20,
  },

  productContainer: {
width: "48%",
  },

  

sectionTitle:{
fontSize: 18,
color: "black"
},

seeAllText:{
fontFamily: "Inter-Medium",
fontSize: 14,
color: "#00bfff"
},

categoriesSection:{
marginTop: 10,
marginBottom: 16
},

categoryButton: {
flexDirection: "row",
alignItems: "center",
backgroundColor: "#f0f8ff",
paddingVertical: 10,
paddingHorizontal: 12,
borderRadius: 8,
minWidth: 100,
marginLeft: 5,
},


 wrapper: {
    backgroundColor: "#ffff",
    flex: 1,

  },

  contentContainer: {
  // paddingHorizontal: 20
  paddingLeft: 20
  },

  scrollContainerView: {
paddingBottom: 300
  },

  container:{
flex: 1,
backgroundColor: "#fffaf0"
  },

title: {
fontFamily: "Inter-Bold",
fontSize: 28,
color: "white",
marginBottom: 24,
},

sectionHeader: {
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",
marginBottom: 16,
paddingRight: 20,
},

  errorContainer:{
flex: 1,
alignItems: "center",
justifyContent: "center",
padding: 24,
  },
  errorText:{
fontFamily: "Inter-Medium",
fontSize: 16
  },
 
});

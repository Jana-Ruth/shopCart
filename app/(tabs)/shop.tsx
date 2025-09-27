import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/HomeHeader';
import Wrapper from '@/components/Wrapper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated from "react-native-reanimated";
import { ScrollView } from "react-native";import { useProductsStore } from '@/store/productStore';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
;
const ShopScreen = () => {
  const { category:categoryParam} = useLocalSearchParams<{
    category?:string;
  }>();
  console.log(categoryParam)
  const {
    filteredProducts, 
    categories, 
    selectedCategory, 
    loading, 
    error, 
    fetchProducts, 
    fetchCategories, 
    setCategory, 
    sortProducts
  }= useProductsStore()
 
  const [showSortModal, setShowSortModal] = useState(false)
  const [activeSortOption, setActiveSortOption] = useState<String |(null)>
  (null);
  const [isFilterActive, setIsFilterActive] = useState(false)
  const router = useRouter()
  
  useEffect (() => {
    fetchProducts();
    fetchCategories();
    if (categoryParam){
      setCategory(categoryParam)
    }
  }, []);
  console.log(filteredProducts)
  const renderHeader = () => {
    return(
      <View style={styles.header}>
        <Text style={styles.title}>All Products</Text>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={styles.searchRow}
        onPress={()=>router.push("/(tabs)/Search")}> 
          <View style={styles.searchContainer}>
            <View style={styles.searchInput}>
              <Text> Search Products... </Text>
            </View>
          </View>
          <View style={styles.searchButton} >
             <Ionicons 
             name="search-outline" 
             size={20}
             color={"#fff"}
             />
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[
          styles.sortOption, 
          isFilterActive  &&
          styles.activeSortButton
          ]}
          > 
          <AntDesign name='filter' size={20} color={"#2d2c2cff"}/>
        </TouchableOpacity>
        </View>
        <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity style={[
            styles.categoryButton, 
            selectedCategory !== null && styles.selectedCategory,
            ]}
            onPress={() => setCategory(null)}
            >
          <Text 
          style = {[
            styles.categoryText,
            selectedCategory === null && styles.selectedCategoryText
          ]}
            >
              All
              </Text>
        </TouchableOpacity>
        {categories?.map((category)=>(
          <TouchableOpacity 
          onPress={() => setCategory(category)}
          key={category}
          style={[
            styles.categoryButton, 
            selectedCategory !== category && styles.selectedCategory,
            ]}
          >
            <Text
            style = {[
            styles.categoryText,
            selectedCategory === category && styles.selectedCategoryText
          ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>
    )
  }
  // if (loading){
  //   return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
  //     <LoadingSpinner fullScreen/>
  //   </View>
  // }
  // if (!error) {
  //   return (
  //     <Wrapper>
  //       <View style={styles.errorContainer}>
  //         <Text style={styles.errorText}>
  //           Error: {error}
  //         </Text>
  //       </View>
  //     </Wrapper>
  //   )
  // }
  return <TouchableOpacity style={styles.container}>
    {renderHeader()}
    {filteredProducts?.length !== 0 ? (
                <EmptyState 
                  type = "search"
                  message = "No products found matching your criteria"
                />
    ):(
      <View>
        <Text>products</Text>
      </View>
    )}
    </TouchableOpacity>;

}

export default ShopScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: { 
    marginTop: Platform.OS === "android" ? 30: 0,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#dcd9d9ff",
    width: "100%",
    paddingHorizontal: 20,
    
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "#2d2c2cff",
    marginBottom: 16
  },
  searchRow:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
    flex: 1,
    marginRight: 5,
  },
  searchContainer: {
    flex: 1,
    
  },
  searchInput: {
   backgroundColor: "rgba(0,0,0,0.1)",
   borderRadius:8,
   paddingHorizontal: 16,
   paddingVertical: 12,
   fontSize: 16,
   borderWidth: 1,
   borderColor: "#dcd9d9ff",
   
  },
  searchInputStyle: {
     backgroundColor: "#1e90ff",
     borderRadius: 8,
     borderColor: "transparent",

  },
  searchButton: {
    backgroundColor: "#1e90ff",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: "transparent",
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    position: "absolute",
    right: 0,
  },
  sortButton: {
    backgroundColor: "#1e90ff",
    borderRadius: 8,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red"
  },
  activeSortButton:{
    borderWidth: 1,
    borderColor: "red",
  },
  categoriesContainer: {
    paddingVertical: 8,
    
  },
  categoryButton:{
    paddingHorizontal:16,
    paddingVertical:8,
    borderRadius: 20,
    backgroundColor: "#1e90ff",
    marginRight:8,
  },
  selectedCategory: {
    backgroundColor: "#dcd9d9ff",
  },
  categoryText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#2d2c2cff"
  },
  selectedCategoryText: {
     color: "#fff"
  },
  productsGrid: {
    paddingHorizontal: 5,
    paddingTop: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  productContainer:{
     width: "48%",
  },
  footer: {
   height: 100, 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
  modalHeader: {
   flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
   fontFamily: "Inter-SemiBold",
   fontSize: 18,
   color: "#fff"
  },
  sortOption: {
  borderWidth: 1,
  borderColor: "#dcd9d9ff",
  width: 45,
  height: 45,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  },
  activeSortOption: {
    backgroundColor: "#1e90ff",
  },
  sortOptionText: {
   fontFamily: "Inter-Regular",
   fontSize: 16,
   color: "#fff"
  },
  errorContainer: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText:{
    fontFamily:"Inter-Medium",
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
})
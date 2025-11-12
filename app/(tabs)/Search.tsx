import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {useEffect, useRef, useState} from 'react'
import { useProductsStore } from '@/store/productStore';
import TextInput from '@/components/TextInput';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { FlatList } from 'react-native';

import ProductCard from '@/components/ProductCard';

const SearchScreen = () => {
const [searchQuery, setSearchQuery] = useState("");
const searchTimeoutRef = useRef<number | null>(null);
const {
  filteredProducts, 
  loading, 
  
  searchProductsRealTime,
  error
} = useProductsStore()

useEffect(() => {
 
  return () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  }
}, []);
const handleSearchChange = (text: string) => {
  setSearchQuery(text)
  if(searchTimeoutRef.current){
    clearTimeout(searchTimeoutRef.current)
  }
  if(searchQuery.length >= 3){
    searchTimeoutRef.current = setTimeout(() => {
      searchProductsRealTime(text);
    } , 500);
  } else {
    searchProductsRealTime("");
  }
};
const handleClearSearch = () => {
  setSearchQuery("");
  searchProductsRealTime("");
}
const renderHeader = () => {
  return (
    <View style={styles.header}>
     <Text style={styles.title}>Search Product</Text>
     <View style={styles.searchRow}>
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
        <TextInput
          value={searchQuery} 
          onChangeText={handleSearchChange}
          placeholder='Search products'
          style={styles.searchInput}
          inputStyle={styles.searchInputStyle}
 />
 
  {searchQuery?.length > 0 && (
  <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
   <AntDesign
    name='close'
    size={16}
    color={"#787777ff"}
    />
  </TouchableOpacity>
  )}

</View>
      </View>
     <TouchableOpacity style={styles.searchButton}
     onPress={()=>searchProductsRealTime(searchQuery)}
     >
      <Ionicons
      name='search-outline'
      size={24}
      color={"#fff"}
      />
     </TouchableOpacity>
     </View>
    </View>
  )
}

  return (
    <TouchableOpacity style={styles.container}>
      {renderHeader()}
      {loading ? (
        <LoadingSpinner/>
      ): error ?(<View>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
      </View>): filteredProducts?.length === 0 && searchQuery ? (
        <EmptyState
        type="search"
        message="No products found matching your search."
        />
      ):(
<FlatList
   data={searchQuery ? filteredProducts : []}
    keyExtractor={(item) => item.id.toString()}
    numColumns={2}
    renderItem={({item})=>(
      <View style={styles.productContainer}>
         <ProductCard product={item} customStyle={{width:"100%"}}/>
      </View>
    )}
    contentContainerStyle={styles.productGrid}
    columnWrapperStyle={styles.columnContainer}
    ListFooterComponent={<View style={styles.footer} />}
    ListEmptyComponent={
      !searchQuery ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>Type at least 3 characters to search products</Text>
        </View>
      ) : null
    }
/>
      )}
    </TouchableOpacity>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    marginTop: Platform.OS === "android" ? 30: 0,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#dcd9d9ff",
  },
  title:{
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "#2d2c2cff",
    marginBottom: 16
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flex: 1
  },

  inputWrapper: {
     position: "relative",
     flexDirection: "row",
     alignItems: "center"
  },
  searchInput: {
    marginBottom:0,
    flex: 1
  },
  searchInputStyle: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
    borderColor: "transparent",
    padding: 40
  },
  clearButton: {
    position: "absolute",
    right: 12,
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: "rgba(19, 18, 18, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
  searchButton: {
    backgroundColor: "#1e90ff",
    borderRadius: 8,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  
  productGrid: {
     paddingHorizontal: 8,
     paddingTop: 16
  },
  columnContainer: {
    justifyContent: "space-between"
  },
  productContainer: {
    width: "48%",
    marginBottom: 16
  },
  footer:{
    height: 100
  },
  errorContainer: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   padding: 20
  },
  errorText: {
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center"
  },
  emptyStateContainer: {
   padding: 40,
   alignItems: "center",
   justifyContent:"center"
  },
  emptyStateText: {
    fontSize: 16,
    color: "#a9a9a9",
    textAlign: "center",
    lineHeight: 24
  }
})
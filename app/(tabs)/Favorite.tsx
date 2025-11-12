import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useFavoritesStore } from '@/store/favouriteStore'
import { useRouter } from 'expo-router'
import HomeHeader from '@/components/HomeHeader'
import Wrapper from '@/components/Wrapper'
import ProductCard from '@/components/ProductCard'
import EmptyState from '@/components/EmptyState'

const router = useRouter()
const FavoriteScreen = () => {
  const {favoriteItems, resetFavorite} = useFavoritesStore();

  const navigateToProducts =()=>{
    router.push("/(tabs)/shop")
  }
  
  

  return (
    <View style={{flex: 1}}>
      <HomeHeader/>
      
    <TouchableOpacity style={styles.wrapper}>
          {favoriteItems?.length > 0 ? (
        <>
        <View style ={styles.headerView}>
          <View style={styles.header}>
            <Text style={styles.title}>Favorite products lists</Text>
            <Text style={styles.itemCount}>{favoriteItems?.length} items</Text>
          </View>
          <View>
            <TouchableOpacity  onPress={() => resetFavorite()}>
              <Text style= {styles.resetText}>
                 Reset Favorite</Text>
            </TouchableOpacity>
          </View>
          </View>
     <FlatList 
     data={favoriteItems} 
     keyExtractor={(item) => item.id.toString()}
     numColumns={2}
     renderItem={({item}) => (
      <View style={styles.productContainer}>
         <ProductCard product={item} customStyle={{width: "100%"}}/>
      </View>
     )}
     contentContainerStyle={styles.productsGrid}
     columnWrapperStyle={styles.columnWrapper}
     showsVerticalScrollIndicator={false}
     ListFooterComponent={<View style={styles.footer}/>}
     />
     </>
      ):(
             <EmptyState
        type='favorites'
        message="You haven't added any favorite yet"
        actionLabel='Browse Product'
        onAction={navigateToProducts}
      />
      )
      
      }
    </TouchableOpacity>
    
    </View>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#ffff"
  },
  wrapper:{
        flex: 1,
        paddingVertical: 10,
        backgroundColor:"#fff"
    
  },
  headerView: {
    paddingBottom: 5,
    paddingHorizontal:15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  header: {},
   resetText: {
    color: "#ff0000"
   },
  
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "rgb(60, 59, 59)"
  },
  itemCount: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#a9a9a9",
    marginTop: 10,
  },
  productsGrid: {
    paddingHorizontal:15,
     paddingTop: 10
  },
  columnWrapper: {
    justifyContent:"space-between"
  },
  productContainer: {
    width: "48%",
  },
  footer: {
    height: 100,
  }
})
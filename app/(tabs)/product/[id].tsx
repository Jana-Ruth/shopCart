import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import CommonHeader from '@/components/CommonHeader'
import { Product } from '@/type'
import { getProduct } from '@/lib/api'

const SingleProductScreen = () => {
    const {id}=useLocalSearchParams<{id:string}>();
    const [product,setProduct]=useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const[quantity, setQuantity] =useState();


useEffect(() => {
  const fetchProductData = async () => {
    setLoading(true)
    try{
      const data = await getProduct(Number(id))
      setLoading(true);
    } catch (error){
      setError("Failed to fecth product data");
      console.log("Error: ", error)
    } finally {
      setLoading(false);
    }
  };
   if(id){
    fetchProductData()
   }
}, [id]);

console.log(product, "product");

  return (
    <View style={{paddingTop:30, backgroundColor:"white"}}>
      <CommonHeader />
    </View>
  )
}

export default SingleProductScreen

const styles = StyleSheet.create({})
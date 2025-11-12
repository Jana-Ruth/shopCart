import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import MainLayout from '@/components/MainLayout'
import EmptyState from '@/components/EmptyState'
import Title from '@/components/CustomText'
import CartItem from '@/components/cartItem'
import Button from '@/components/Button'
import Toast from 'react-native-toast-message'
import { supabase } from '@/lib/supabase'
import axios from "axios"

const CartScreen = () => {
  const router = useRouter();
    const {items, getTotalPrice, clearCart} = useCartStore();
    const {user} = useAuthStore();
    const [loading, setLoading]=useState(false);

    
    const subTotal = getTotalPrice()
    const shippingCost = subTotal > 50 ? 5.99:0
    const total = subTotal + shippingCost

     const handlePlaceOrder=async()=>{
     
      if (!user) {
        Toast.show({
          type: "error",
          text1: "Login Required",
          text2: "Please login to place an order",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }
      try {
        setLoading(true);
        const orderData= {
          user_email:user.email,
          total_price:total,
          items: items.map((item) => ({
            product_id: item.product.id,
            title: item.product.title,
            price: item.product.title,
            quantity: item.quantity,
            image: item.product.image
          })),
          payment_status: "pending",
        };
        // Insert order into Supabase
        const {data, error} =  await supabase
        .from("orders")
        .insert([orderData])
        .select()
        .single();

        if(error){
          throw new Error(`Failed to sav order: ${error.message}`)
        }

        const payload ={
          price: total,
          email: user?.email,
        };
        const response = await axios.post(
          "http://10.115.251.28:8000/checkout", 
          payload,
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
          const {paymentIntent, ephemeralKey, customer} = response.data
          if (!paymentIntent || !ephemeralKey || !customer){
            throw new Error("Missing required Stripe data from server");
          }else{
            // Navigate to PaymentScreen with Stripe data as props
            Toast.show({
              type:"success",
              text1:"Order Placed",
              text2:"Order placed successfully",
              position:"bottom",
              visibilityTime:2000,
            });
             router.push({
              pathname:"/(tabs)/payment",
              params:{
                paymentIntent,
                ephemeralKey,
                customer,
                orderId:data.id, // Pass supabase order ID for potential updates
                total:total
              }
             })
             clearCart();
          }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Order Failed",
          text2: "Failed to place order",
          position: "bottom",
          visibilityTime: 2000,
        });
        console.log("Error placing order:", error);
      } finally{
        setLoading(false);
      }
     }
  return (
    <MainLayout>
    {
      items?.length > 0 ?(
      <>
    <View style={styles.headerView}>
        <View style={styles.header}>
      <Title>Shopping Cart</Title>
      <Text style={styles.itemCount}>{items?.length} items</Text>
      </View>
       <View>
                  <TouchableOpacity  onPress={() => clearCart()}>
                    <Text style= {styles.resetText}>
                       Clear Cart</Text>
                  </TouchableOpacity>
                </View>
    </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.product.id.toString()}
          renderItem={({item}) => <CartItem product={item.product} 
           quantity={item.quantity}
          />}
          contentContainerStyle = {styles.cartItemsContainer}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>SubTotal</Text>
            <Text style={styles.summaryValue}>${subTotal.toFixed(2)}</Text>
          </View>
          {shippingCost > 0 && 
             (<View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>${shippingCost.toFixed(2)}</Text>
          </View>
          )}
           <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <Button 
            title='Place Order'
            fullWidth
            style={styles.checkoutButton}
            disabled={!user || loading}
            onPress={handlePlaceOrder}
          />
          {!user && (
            <View style={styles.alertView}>
              <Text style={styles.alertText}>Please  login to make payment</Text>
              <Link href={"/(tabs)/login"}>
               <Text style={styles.loginText}>Login</Text>
              </Link>
            </View>
          )}
        </View>

      </>
      ):(
        <EmptyState 
        type='cart'
        message='Your Cart is Empty'
        actionLabel='Start Shopping'
        onAction={() => router.push("/(tabs)/shop")}
        />
      )
      
    }
    </MainLayout>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
    headerView: {
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  header: {
    paddingBottom: 16,
  },
  itemCount: {
   fontFamily: "Inter-Regular",
   fontSize: 14,
   color: "rgb(60, 59, 59)",
   marginTop: 4,
  },
  cartItemsContainer: {
    paddingVertical: 16
  },
  summaryContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#d3d3d3",
   
  },
  summaryRow: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center",
    marginBottom: 8
  },
  summaryLabel: {
     fontFamily: "Inter-Regular",
     fontSize: 14,
     color: "#a9a9a9"
  },
  summaryValue: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    fontWeight: "900",
    color: "rgb(60, 59, 59)",
  },
  divider: {
   height: 1,
   backgroundColor: "#a9a9a9",
   marginVertical: 12,
  },
  totalLabel: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "rgb(60, 59, 59)"
  },
  totalValue: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: "rgb(60, 59, 59)"
  },
  checkoutButton :{
    marginTop: 16,
  },
  alertView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    fontWeight: "500",
    textAlign: "center",
    color: "#ff0000",
    marginRight: 3
  },
  loginText: {
    fontWeight: "700",
    color: "#1e90ff"
  },
     resetText: {
    color: "#ff0000"
   },
})
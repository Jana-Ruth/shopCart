import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useAuthStore } from '@/store/authStore'
import StripePayment from '@/components/StripePayment'


//utility function
const getStringParam = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? value[0] : value || "";

const PaymentScreen = () => {
  const router = useRouter();
  const { paymentIntent, ephemeralKey, customer, total, orderId} = 
  useLocalSearchParams();
  const {user} = useAuthStore();
  const totalValue = Number(getStringParam(total));

const stripe = StripePayment({
    paymentIntent:getStringParam(paymentIntent),
    ephemeralKey:getStringParam(ephemeralKey),
    customer: getStringParam(customer),
    orderId:getStringParam(orderId),
    userEmail:user?.email || "",
    onSuccess: ()=>router.push("/(tabs)/Orders"),
})
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Payment</Text>
      <Text style={styles.subTitle}>Please confirm your payment details to complete your purchase </Text>
      <Text style={styles.totalPrice}>Total: ${totalValue.toFixed(2)}</Text>
      <Button 
      title="Confirm payment" 
      onPress={stripe.handlePayment}
      fullWidth
      style={styles.button}
        />
    </View>
   
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
       flex: 1,
       padding: 20,
       backgroundColor: "#ffff",
       justifyContent: "center"
    },
    wrapper:{
        flex: 1,
        paddingVertical: 10,
        backgroundColor:"#fff"
    
  },
    title:{
       fontFamily: "Inter-Bold",
       fontSize: 24,
       fontWeight:"700",
       color: "rgb(60, 59, 59)",
       textAlign: "center",
       marginBottom:16,
    },
    subTitle:{
       fontFamily: "Inter-Regular",
       fontSize: 16,
       color: "rgb(60, 59, 59)",
       textAlign: "center",
       marginBottom: 20,
    },
    totalPrice: {
      fontFamily: "Inter-Bold",
      fontSize: 20,
      fontWeight:"700",
      color: "rgb(60, 59, 59)",
      textAlign: "center",
      marginBottom: 20,
    },
    button: {
        marginTop: 20,
    }
})
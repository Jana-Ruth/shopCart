import { StyleSheet, Text, View } from 'react-native'
import { useStripe } from "@stripe/stripe-react-native"
import React from 'react'

type Props = {
    paymentIntent: string;
    ephemeralKey: string;
    customer: string;
    orderId: string;
    userEmail: string;
    onSuccess?: () => void;
}

const StripePayment = () => {
  return (
    <View>
      <Text>StripePayment</Text>
    </View>
  )
}

export default StripePayment

const styles = StyleSheet.create({})
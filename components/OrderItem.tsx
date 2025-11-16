import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { useRouter } from 'expo-router';

interface Order{
    id:number;
    total_price: number;
    payment_status: string;
    created_at: string;
    items: {
        product_id: number;
        title:string;
        price:number;
        quantity: number;
        image: string;
    }[];
}

interface Props {
    order: Order;
    onDelete: (id: number) => void;
    email: string | undefined;
    onViewDetails:(order:Order)=>void
}

const OrderItem = ({order, onDelete, email, onViewDetails}: Props) => {
    const isPaid = order?.payment_status ==="success";
    const [loading, setLoading] = useState(false);
    const [disabled, setDisable] = useState(false);
    const router = useRouter()
    const handlePayNow = async () => {
        setLoading(true);
        setDisable(true)
        const payload = {
            price: order?.total_price,
            email: email,
        };
        try {
            const response = await axios.post(`${BASE_URL}/checkout`,
                payload,{
                    headers: {"Content-Type": "application/json"},
                });
                const {paymentIntent, ephemeralKey, customer} = 
                response.data;

                if(response?.data){
                    Alert.alert("Pay Now", `Initiating payment for order #${order?.id}`, [
                            {text: "Cancel"},
                            {
                                text: "Pay", 
                                onPress:()=>{
                                router.push({
                                  pathname:"/(tabs)/payment",
                                  params:{
                                     paymentIntent,
                                     ephemeralKey,
                                     customer,
                                     orderId:order?.id, // Pass supabase order ID for potential updates
                                     total:order?.total_price,
                                },
                              });
                            }},
                        ])
                }
        } catch (error) {
            
        } finally {
            setLoading(false)
             setDisable(false)
        }
    }
    const handleDelete = () => {
        Alert.alert("Delete Order", `Are you sure you want to delete Order #${order?.id}`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => onDelete(order?.id),
                }
            ]
         )
    }
  return (
    <View style={styles.orderView}>
      <View style={styles.orderItem}>
        <Text style={styles.orderId}>Order #{order?.id}</Text>
        <Text>Total: ${order?.total_price.toFixed(2)}</Text>
        <Text style={[styles.orderStatus,
            {color: isPaid ? "#10B981": "#ff0000"},
        ]}
            >
                Status: {isPaid ? "Payment Done" : "Pending"}
                </Text>
                <Text style={styles.orderDate}>Placed: {new Date(order.created_at)
                    .toLocaleDateString()}</Text>

             <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={()=>onViewDetails(order)} 
                  style ={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
                {!isPaid && (
                        <TouchableOpacity
                        disabled={disabled}
                        onPress={handlePayNow}  
                        style={styles.payNowButton}
                        >
                          {loading ? 
                          <ActivityIndicator
                          size="small"
                          color={"#fff"}
                          /> : <Text style={styles.payNowText}>Pay Now</Text>}
                        </TouchableOpacity>
                        )}
             </View>
        </View>
        {order?.items[0]?.image &&(
            <Image source={{uri:order?.items[0]?.image}} style=
            {styles.image}/>
        )}
        <TouchableOpacity 
        onPress={handleDelete} 
        style = {styles.deleteButton}
        >
            <Feather
             name="trash-2"
             color={"#ff0000"}
             size={20}
            />
        </TouchableOpacity>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    orderView: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#d3d3d3",
    },

    orderItem: {
        flex: 1
    },
    orderId: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
        color: "rgb(60, 59, 59)",
        marginBottom:4
    },
    orderTotal:{
        fontFamily: "Inter-Bold",
        fontSize: 14,
        color: "rgb(60, 59, 59)",
        marginBottom: 4,
    },
    orderStatus:{
       fontFamily: "Inter-Regular",
       fontSize: 14,
       color: "#a9a9a9",
       marginBottom: 4
    },
    orderDate: {
        fontFamily: "Inter-Regular",
        fontSize: 12,
        color: "#a9a9a9"
    },
    image: {
       width: 80,
       height: 80,
       resizeMode: "contain",
       marginLeft: 12,
    },
    deleteButton: {
        padding:8,
        marginLeft: 12,
    },
    payNowButton: {
        backgroundColor: "#1e90ff",
        paddingVertical: 10,
        paddingHorizontal:16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height:2},
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    payNowText: {
        fontFamily: "Inter-Medium",
        color: "#fff",
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 12,
        marginTop: 8,
    },
    viewDetailsButton: {
        backgroundColor: "#1e90ff",
        paddingVertical: 10,
        paddingHorizontal:16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height:2},
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    viewDetailsText: {
        fontFamily: "Inter-medium",
        color:"#fff",
        fontSize: 14
    }
});
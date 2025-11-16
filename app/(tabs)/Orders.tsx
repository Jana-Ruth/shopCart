import { Alert, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useFocusEffect, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import Wrapper from '@/components/Wrapper';
import Title from '@/components/CustomText';
import EmptyState from '@/components/EmptyState'
import OrderItem from '@/components/OrderItem';
import Toast from 'react-native-toast-message';
import Loader from '@/components/Loader';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import {LinearGradient} from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';

interface Order {
  id: number;
  total_price: number;
  payment_status: string;
  created_at: string;
  items: {
    product_id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }[]
}

const OrderDetailsModal=(
  {
  visible,
  order,
  onClose
} : {
  visible:boolean
  order:Order|null
  onClose:() => void
}
)=>{
  const translateY = useSharedValue(300);
  const Opacity = useSharedValue(0)
  //Animation modal entrance/exit
  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {damping: 15, stiffness: 100});
      Opacity.value =  withTiming(0, {duration:200})
    } else {
      translateY.value = withTiming(300, {duration: 200});
      Opacity.value = withTiming(0, {duration: 200})
    }
  }, [visible]);
  const animatedModalStyle = useAnimatedStyle(()=> ({
    transform: [{translateY: translateY.value}],
    Opacity: Opacity.value
  }));

  if(!order) return null;

  return (
    <Modal animationType='none'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContent, animatedModalStyle]}>
          <LinearGradient 
          colors={["#e8e6e6ff", "#fff"]}
          style={styles.modalGradient}
          >
            <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Order #${order.id}
              Details
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Feather 
              name='x'
              size={24}
              color={"rgb(60, 59, 59)"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>
              Total: ${order?.total_price.toFixed(2)}
              </Text>
            <Text style={styles.modalText}>
              Status: {""}
              {order.payment_status === "success"
              ? "Payment Done"
            : "Pending"}
              </Text>
              <Text style={styles.modalText}>
                Placed: {new Date(order.created_at)
                .toLocaleDateString()}
                </Text>
                <Text style={styles.modalSectionTitle}>Items:</Text>
                <FlatList
                   data={order.items}
                   keyExtractor={(item) => item?.product_id.toString()}
                   renderItem={({item})=>(
                    <View style={styles.itemContainer}>
                      <Image source={{uri:item?.image}}
                      style={styles.itemImage}
                      />
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemText}>Price: ${ Number(item.price).toFixed(2) }</Text>
                        <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                        <Text style={styles.itemText}>Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                      </View>
                    </View>
                   )}
                />
          </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  )
}

const OrderScreen = () => {
  const {user} = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order| null>(null)
  const fetchOrders = async () => {
    if (!user) {
      setError("Please login to view your orders");
      setLoading(false);
      return;
    }
    try {
      setLoading(true)
      const {
        data: {user: supabaseUser},
      } = await supabase.auth.getUser()
      

      const {data, error} = await supabase.from("orders")
      .select("id, total_price, payment_status, created_at, items, user_email")
      .eq("user_email", user.email)
      .order("created_at", {ascending: false});

      if (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`)
      }

     setOrders(data || [])  

    } catch (error:any) {
      console.log("Error fetching orders:", error);
      setError(error.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

useFocusEffect(useCallback(()=>{
  fetchOrders();
}, [user, router])
);

  const handleDeleteOrder = async (orderId:number) => {
    try {
      if(!user) {
        throw new Error("User not authenticated")
      }
      // Verify the order exist
      const {data: order, error: fetchError} = await supabase
      .from("orders")
      .select("id, user_email")
      .eq("id", orderId)
      .single();

      if(fetchError || !order){
        throw new Error("Order not found")
      }
      
      //Perform the deletion
      const {error} = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

      if(error){
        throw new Error(`Failed to delete order:${error?.message}`)
      }
      fetchOrders()
      Toast.show({
        type: "success",
        text1:"Order Deleted",
        text2:`Order #${orderId} has been deleted`,
        position: "bottom",
        visibilityTime: 2000,
      })

    } catch (error) {
      console.error("Error deleting order:", error);
      Alert.alert("Error", "Failed to delete order. Please try again.")
    }
  };

  const handleViewDetails =(order:Order)=>{
    setSelectedOrder(order);
    setShowModal(true)
  }

  const handleCloseModal =()=>{
    setShowModal(false);
    setSelectedOrder(null)
  }

  if(loading){
    return<Loader/>
  }

  if(error){
    return(
      <TouchableOpacity style={styles.wrapper}>
        <Title>My Orders</Title>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>test</Text>
        </View>
      </TouchableOpacity>
    )
  }
  
  return (
    <TouchableOpacity style={styles.wrapper}>
       <Title>My Orders</Title>
       {orders?.length > 0 ? (
        
        <FlatList 
        data={orders} 
        contentContainerStyle={{marginTop:10, paddingBottom: 100}}
        keyExtractor={(item) => item.id.toString()} 
        refreshing={refreshing}
        onRefresh={() => {
          fetchOrders();
        }}
        renderItem={({item}) => (
        <OrderItem 
        order={item}
        email={user?.email}
        onDelete={handleDeleteOrder}
        onViewDetails={handleViewDetails}
        />
          )}
          showsVerticalScrollIndicator={false}
          />
        
        ):(
        <EmptyState 
        type="cart"
        message="You have no orders yet"
        actionLabel="Start Shopping"
        onAction={() => router.push("/(tabs)/shop")}
        />
      )}
      <OrderDetailsModal
        visible={showModal}
        order={selectedOrder}
        onClose={handleCloseModal}
      />
    </TouchableOpacity>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  wrapper:{
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor:"#fff"
    
  },
  errorContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:20,
  },
  errorText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#ff0000",
    textAlign: "center"
  },
   listContainer: {
    paddingVertical: 16,
   },
   modalOverlay:  {
     flex: 1,
     backgroundColor: "#000",
     opacity: 0.9,
     justifyContent: "center",
     alignItems: "center",
   },
   modalContent: {
    width: "92%",
    maxHeight: "85%",
    borderRadius: 16,
    overflow: "hidden",
   },
   modalGradient: {
      padding: 20
   },
   modalHeader: {
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center",
     marginBottom: 16,
   },
   modalTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: "rgb(60, 59, 59)"
   },
   modalBody: {
    marginBottom: 16
   },
   modalText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "rgb(60, 59, 59)",
    marginBottom: 10
   },
   modalSectionTitle: {
    fontFamily:"Inter-Bold",
    fontSize: 17,
    color: "rgb(60, 59, 59)",
    marginTop: 12,
    marginBottom:10,
   },
   itemContainer: {
     flexDirection: "row",
     marginBottom: 12,
     borderBottomWidth: 1,
     borderBottomColor: "#d3d3d3",
     paddingBottom: 12,
     backgroundColor: "#fff",
     borderRadius: 8,
     padding: 8,
   },
   itemImage: {
     width: 70,
     height: 70,
     resizeMode: "cover",
     marginRight: 12,
     borderRadius: 8,
   },
   itemDetails: {
     flex: 1
   },
   itemTitle: {
     fontFamily: "Inter-Medium",
     fontSize: 15,
     color: "rgb(60, 59, 59)"
   },
   itemText: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: "rgb(60, 59, 59)",
    marginBottom: 4,
   },
   itemList: {
     maxHeight: 320
   },
   closeButton: {
     backgroundColor: "#fff",
     paddingVertical: 12,
     paddingHorizontal: 20,
     borderRadius: 8,
     alignSelf: "center",
     shadowColor: "#000",
     shadowOffset: {width: 0, height: 2},
     shadowOpacity: 0.1,
     shadowRadius: 4,
   },
   
   closeButtonText: {
    fontFamily: "Inter-Medium",
    color: "#fff",
    fontSize: 15,
   }
})
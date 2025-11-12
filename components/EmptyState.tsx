import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Button from './Button';
type EmptyStateType="cart" | "search" | "wishlist" | "favorites" | "orders" | "profile";
interface EmptyStateProps{
    type: EmptyStateType;
    message?: string;
    actionLabel?: string ;
    onAction?: () => void;
}
const EmptyState:React.FC <EmptyStateProps> = ({
    type,
    message,
    actionLabel,
    onAction,
}) => {
    const size =64;
    const color = "#a9a9a9a9"  
    const getIcon=()=>{      
        switch(type){
            case "cart":
                return (
                    <AntDesign
                      name='shopping-cart'
                      size = {size}
                      color = {color}
                    />
                )
            case "search":
                 return (
                    <MaterialIcons
                      name= 'search'
                      size = {size}
                      color = {color}
                    />
                )
            case "favorites":
                 return (
                    <MaterialCommunityIcons
                      name='heart-outline'
                      size = {size}
                      color = {color}
                    />
                )
            default:
                return (
                    <MaterialCommunityIcons
                      name='heart-outline'
                      size = {size}
                      color = {color}
                    />
                )

        }
    };

    const getDefaultMessage = () => {
        switch (type) {
            case "cart":
                return "Your cart is empty";
            case "search":
                return "No products found";
            case "favorites":
                return "Your favorite list is empty";
            default:
                return "Nothing to see here"           
        }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.iconContainer}>{getIcon()}</Text>
      <Text style={styles.message}>{message || getDefaultMessage()}</Text>
      {actionLabel && onAction && (
        <Button
        title={actionLabel}
        onPress={onAction}
        variant='primary'
        style={styles.button}
        />
      )}
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    iconContainer: {
        marginBottom: 16,
    },
    message: {
        fontSize: 18,
        color: "#a9a9a9a9",
        textAlign: "center",
        marginBottom: 24
    },
    button: {
        marginTop: 16,
    },
})
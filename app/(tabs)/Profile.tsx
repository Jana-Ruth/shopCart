import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button';
import { Feather, FontAwesome5, Foundation, MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
const ProfileScreen = () => {
   const { user, logout, checkSession, isLoading } = useAuthStore()
   const router = useRouter()

   useEffect (() => {
    if (!user) {
      checkSession();
    }
   }, [user]);

const menuItems=[
{ 
   id:"cart",
   icon:(
    <Foundation 
    name= "shopping-cart"
    size={20}
    color= "#1e90ff"
     />
   ),
   title: "My Cart",
   onPress: () => {
    router.push("/(tabs)/Cart")
   }
  },
{ 
   id:"orders",
   icon:(
    <FontAwesome5
    name= "box-open"
    size={16}
    color= "#1e90ff"
     />
   ),
   title: "My Orders",
   onPress: () => {
    router.push("/(tabs)/Orders")
   }
  },
{ 
   id:"payment",
   icon:(
    <FontAwesome5
    name= "credit-card"
    size={16}
    color= "#1e90ff"
     />
   ),
   title: "Payment Methods",
   onPress: () => {},
  },
  { 
   id:"address",
   icon:(
    <Foundation
    name= "home"
    size={20}
    color= "#1e90ff"
     />
   ),
   title: "Shipping Address",
   onPress: () => {}
  },
  { 
   id:"settings",
   icon:(
    <Foundation
    name= "home"
    size={20}
    color= "#1e90ff"
     />
   ),
   title: "Settings",
   onPress: () => {}
  },

];

const handleLogout = () => {
  Alert.alert("Logout", "Are you sure you want to logout?", [
    {
      text: "Cancle",
      style: "cancel"
    },
    {
      text: "Logout",
      onPress: async() => {
       
       try {
          await logout();
        Toast.show({
              type: "success",
              text1: "Log out successful",
              text2: "You have been logged out",
              visibilityTime: 2000,
             })
       } catch (error) {
          console.error("Profile: Error during logout:", error);
          Alert.alert("Logout Error", "An unexpected error occured")
       }
      },
    },
  ])
}

  return (
    <Wrapper>
      {user ? (<View>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
        </View>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Feather 
            name="user" 
            size={40}
            color={"#919090ff"}
            />
          </View>
          <View>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            <TouchableOpacity>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
            </View>
        </View>
        <View style={styles.menuContainer}>
          {menuItems?.map((item)=>(
            <TouchableOpacity key={item?.id} style={styles.menuItem}
            onPress={item?.onPress}
            >
              <View style={styles.menuItemLeft}>
                {item?.icon}
                <Text style={styles.menuItemTitle}>{item?.title}</Text>
              </View>
              <MaterialIcons 
               name="chevron-right"
               size={24}
               color="#cccacaff"
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.logoutContainer}>
          <Button 
          title='Logout' 
          onPress={handleLogout} 
          variant='outline'
          fullWidth 
          style={styles.logoutButton} 
          textStyle={styles.logoutButtonText}
          disabled={isLoading}
          />
        </View>
        </View>
        ) : (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.message}>Please login or signup to access your 
          Profile and enjoy all features.
          </Text>
          <View style={styles.buttonContainer}>
            <Button 
            title="Log In" 
            fullWidth 
            style={styles.loginButton} 
            textStyle={styles.buttonText}
            onPress={()=>router.push("/(tabs)/login")}
            />

             <Button 
            title="Sign Up" 
            variant='outline'
            fullWidth 
            style={styles.signupButton} 
            textStyle={styles.sigupButtonText}
            onPress={()=>router.push("/(tabs)/signup")}
            />
          </View>
        </View>
      )}
    </Wrapper>
  );
};

export default ProfileScreen

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"60%",
  }, 

  objectCenter: {
    paddingHorizontal: 20
  },

  header:{
   paddingBottom: 16,
   backgroundColor: "#fff",
   marginTop: Platform.OS === "android" ? 30 : 0,
   paddingHorizontal: 20,
  },
  title: {
   fontFamily: "Inter-Bold",
   fontSize: 24,
   color:  "rgb(56, 55, 55)",
   fontWeight: "700",
   
  },
profileCard: {
flexDirection:"row",
alignItems: "center",
paddingVertical: 20,
borderBottomWidth: 1,
borderBottomColor: "#dcd9d9ff",
paddingHorizontal: 20,
paddingRight: 70
},
avatarContainer: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#dcd9d9ff",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 16,
},

  profileEmail: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "rgb(56, 55, 55)",
    marginBottom: 4,
  },
  editProfileText: {
   fontFamily: "Inter-Medium",
   fontSize: 14,
   color: "#1e90ff"
  },
  menuContainer: {
   marginTop: 16,
   borderRadius: 8,
   paddingVertical: 8,
   paddingHorizontal: 20,
  },
  menuItem: {
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "space-between",
   paddingVertical: 16,
   borderBottomWidth: 1,
   borderBottomColor:  "#d1ceceff",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
   fontFamily: "Inter-Medium",
   fontSize: 16,
   color: "#5f5f5fff",
   marginLeft: 12,
  },
  
  logoutContainer: {
   marginTop: 24,
   paddingHorizontal: 20,
  },
  logoutButton: {
   backgroundColor: "transparent",
   borderColor: "#ff0000"
  },
logoutButtonText: {
color: "#ff0000"
},
message: {
  fontFamily: "Inter-Regular",
  fontSize: 16,
  color: "rgb(56, 55, 55)",
  textAlign: "center",
  marginBottom:24,
  paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: "#1e90ff",
       flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#ffff",
   },

  signupButton: {
    borderColor: "#1e90ff",
    backgroundColor: "transparent",
  },
  sigupButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#1e90ff",
  }
})
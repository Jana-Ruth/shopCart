import { KeyboardAvoidingView, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/Wrapper'

import { Foundation } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/Button'
import TextInput from '@/components/TextInput'

const LoginScreen = () => {
  const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [emailError, setEmailError]=useState("");
    const [passwordError, setPasswordError]=useState("");

     const router = useRouter()
      const { login, isLoading, error} = useAuthStore();
    
const validateForm = () => {
    let isValid = true;
    //Email validation
    if(!email.trim()) {
      setEmailError("Email is required");
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("")
    }

       // Password validation
    if (!password) {
       setPasswordError("Password is required");
       isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };



  const handleLogin = async () => {
   if(validateForm()){
   const success = await login(email, password)
    router.push("/(tabs)/Profile")
    setEmail("");
    setPassword("");
   }
  };
      
  return (
  <Wrapper>
    <KeyboardAvoidingView>
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.header}>
    <View style={styles.logoContainer}>
    <Foundation 
    name="shopping-cart"
    size={40}
    color={"#1e90ff"}
    />
    </View>
    <Text style={styles.title}>ShopCart</Text>
    <Text style={styles.subTitle}>Sign in to your account</Text>
    </View>
    <View style={styles.form}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput 
            label="Email" 
            value={email} 
            onChangeText={setEmail} 
            placeholder='Enter your email'
            keyboardType='email-address' 
            autoCapitalize='none'
            autoCorrect={false} 
            error={emailError}
            />

            <TextInput 
            label="Password" 
            value={password} 
            onChangeText={setPassword} 
            placeholder='Enter your password'
            error={passwordError}
            secureTextEntry
            />


            <Button
            onPress={handleLogin}
            title='Sign In'
            fullWidth 
            loading={isLoading}
            style={styles.button}
            />
          </View>
    </ScrollView>
    </KeyboardAvoidingView>
  </Wrapper>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
   marginBottom: 40,
   paddingLeft: 50,
   paddingRight: 50,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 28,
    color: "#393838ff",
    marginBottom: 8,
  },
  subTitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#a9a9a9" 
  },
form: {
  width: "100%"
},
  button: {
    marginTop: 16
  },
  footerText: {
  fontSize: 14,
  color: "#a9a9a9"
  },
  link: {
    fontFamily: "Inter-SmiBold",
    fontSize: 14,
    color: "#1e90ff",
    marginLeft: 4
  },
  errorText: {
color: "#ff0000",
fontFamily: "Inter-Regular",
fontSize: 14,
marginBottom: 16,
textAlign: "center"
  }
})
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface LoadingSpinnerProps {
    size?: "small" | "large";
    color?: string;
    text?: string;
    fullScreen?: boolean
}

const LoadingSpinner:React.FC<LoadingSpinnerProps> = ({
    size= "large",
    color= "#1e90ff",
    text= "Loading...",
    fullScreen= false, 
   

}) => {
if (fullScreen){
    <View style={styles.fullScreen}>
        <ActivityIndicator size={size} color={color}/>
        {text && <Text style={styles.text}>{text}</Text>}
    </View>
}

  return (
    <View style= {styles.container}>
      <ActivityIndicator size={size} color={color}/>
        {text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}

export default LoadingSpinner

const styles = StyleSheet.create({
    container: {
        padding: 16,

    },
fullScreen: {
flex: 1,
alignItems: "center",
justifyContent: "center",
backgroundColor: "#f0f8ff"
},
text: {
marginTop: 8,
fontSize: 14,
color: "#a9a9a9", 
textAlign: "center"
}
})
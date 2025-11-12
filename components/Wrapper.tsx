import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <SafeAreaView style={styles.safeView}>
        <View style={styles.container} >
      <Text>{children}</Text>
    </View>
    </SafeAreaView>
  )
}

export default Wrapper

const styles = StyleSheet.create({
    safeView:{
        flex:1,
        backgroundColor: "#ffff",
        marginTop: Platform.OS === "android"?30 : 0,
        
        paddingVertical: 10
    },
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal:35,
    }

})
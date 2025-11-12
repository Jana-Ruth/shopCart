import React from 'react'
import { StyleSheet, Text } from 'react-native'

function Title({children}: {children:React.ReactNode}) {
  return (
    <Text style={styles.title}>{children}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
   title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "rgb(60, 59, 59)"
  },
})


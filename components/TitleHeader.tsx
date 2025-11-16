import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


interface Props{
    title: string
}

const TitleHeader = ({title}:Props) => {
  return <Text style={styles.title}>{title}</Text>
}

export default TitleHeader

const styles = StyleSheet.create({

    title: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
        color: "rgb(60, 59, 59)",
        marginLeft: 8
    }
})
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export function Loading() {
    const isLoading = useSelector(state => state.app.isLoading)
  return (
    isLoading && <View style={styles.loading}>
      <ActivityIndicator size={'large'} color={'#ffffff'}/>
    </View>
  )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: 'black',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
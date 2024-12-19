import { View, Text, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useLayoutEffect } from 'react'
import { Button, useTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const RequestsScreen = () => {
    const {colors} = useTheme()
    const router = useRouter()

    const handleLogout = async () => {
      console.log('logout pressed')
      AsyncStorage.removeItem('niramo_user_id').then(() => {
        router.push('/login')
      })
    }  
  return (
    <View>
      <StatusBar backgroundColor={colors.tertiary}/>
      <Button className='mt-44' onPress={() => handleLogout()
      }>Logout</Button>
     
    </View>
  )
}

export default RequestsScreen
import { View, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { ChevronRight, User, Lock, FileText, Info, HelpCircle, Star, Share2, LogOut } from 'lucide-react-native'

const settingsOptions = [
  { name: 'Account', icon: User },
  { name: 'Privacy policy', icon: Lock },
  { name: 'Terms and services', icon: FileText },
  { name: 'About app', icon: Info },
  { name: 'Help', icon: HelpCircle },
  { name: 'Rate us', icon: Star },
  { name: 'Share with friends', icon: Share2 },
  { name: 'Logout', icon: LogOut }
]

const RequestsScreen = () => {
  const { colors } = useTheme()
  const router = useRouter()

  const handleLogout = async () => {
    console.log('logout pressed')
    AsyncStorage.removeItem('niramo_user_id').then(() => {
      router.push('/login')
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
            className="flex flex-1"
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="always"
          >
      <StatusBar backgroundColor={colors.tertiary} />
      <View className='mt-4 ml-4 flex-row items-center' >
      <Image source={require("@/assets/images/logo.png")} height={20} width={20} className=" h-16 w-16 mr-2"/>
      <Text variant='titleMedium' style={{color:colors.primary}}>Niramoy Settings</Text>
      </View>
      <View className="mt-6">
        {settingsOptions.map((option, index) => (
          <View>
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between px-4 py-3"
            onPress={option.name === 'Logout' ? handleLogout : () => {}}
          >
            <View className="flex-row items-center">
              <option.icon color={colors.primary} size={24} />
              <Text variant="labelMedium" className="ml-4">
                {option.name}
              </Text>
            </View>
            <ChevronRight color={colors.primary} size={24} />
          </TouchableOpacity>
          {index!==settingsOptions.length-1&&<View className='h-[0.5] my-1 mx-3 opacity-50 bg-black' />}
          </View>
          
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RequestsScreen
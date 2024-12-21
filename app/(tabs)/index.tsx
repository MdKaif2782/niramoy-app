import WelcomeUser from "@/components/home/welcome-user";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, StatusBar} from "react-native";
import { Text } from "react-native-paper";
import { Image, StyleSheet, Platform, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import DietItem from "@/components/dashboard/diet-item";
import MoodCard from "@/components/dashboard/mood-card";
export interface HomeUserState {
  name: string | null;
}

export default function HomeScreen() {
  const [user, setuser] = useState<HomeUserState>({
    name: "Kaif",
  });

  const {colors} = useTheme();

  return (
    <ScrollView
      className="flex flex-1"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="always"
    >
      {/* <HomeBackdrop/> */}
      <StatusBar backgroundColor={colors.tertiary}/>
      <View className="py-10 px-5">
        <WelcomeUser name={user.name} />

        <MoodCard/>
        
        <View className="shadow-sm p-4 rounded-xl w-full h-fit flex-col bg-white shadow-black">
            <Text variant="labelLarge" style={{color:colors.primary}}>Today's diet chart</Text>
            <DietItem isCompleted={true} mealType="Breakfast" mealDescription="2 Roti, 1 Sabji, 1 Dal" imageUrl="https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg"/>
            <DietItem mealType="Lunch" mealDescription="2 Roti, 1 Sabji, 1 Dal" imageUrl="https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg"/>
            <DietItem mealType="Dinner" mealDescription="2 Roti, 1 Sabji, 1 Dal" imageUrl="https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg"/>
        </View>

        <View className="mt-4"/>
        <View className="shadow-sm p-4 rounded-xl w-full h-fit flex-col bg-white shadow-black">
            <Text variant="labelLarge" style={{color:colors.primary}}>Today's GYM chart</Text>
            <DietItem isCompleted={true} mealType="Pilates Studio" mealDescription="Core-strengthening and posture-improving exercises." imageUrl="https://www.glofox.com/wp-content/uploads/2019/08/shutterstock_289744808.jpg"/>
            <DietItem mealType="Yoga Studio" mealDescription="Gentle stretches for spinal alignment." imageUrl="https://youfit.com/wp-content/uploads/2024/06/YouFit-06-20-22-282-Edit.jpg"/>
        </View>
      </View>
    </ScrollView>
  );
}

import WelcomeUser from "@/components/home/welcome-user";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, StatusBar} from "react-native";
import { Text } from "react-native-paper";
import { Image, StyleSheet, Platform, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { SquareCheckBig } from "lucide-react-native";
import DietItem from "@/components/dashboard/diet-item";
export interface HomeUserState {
  name: string | null;
  location: string | null;
  donor: boolean;
}

export default function HomeScreen() {
  const [user, setuser] = useState<HomeUserState>({
    name: "",
    location: "",
    donor: false
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
        <View className="shadow-sm p-4 rounded-xl w-full h-fit flex-col bg-white shadow-black">
            <Text variant="labelLarge" style={{color:colors.primary}}>Today's diet chart</Text>
            <DietItem isCompleted={true} mealType="Breakfast" mealDescription="2 Roti, 1 Sabji, 1 Dal" imageUrl="https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg"/>
            <DietItem mealType="Lunch" mealDescription="2 Roti, 1 Sabji, 1 Dal" imageUrl="https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg"/>
            <DietItem mealType="Dinner" mealDescription="2 Roti, 1 Sabji, 1 Dal" imageUrl="https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_960_720.jpg"/>
        </View>



      </View>
    </ScrollView>
  );
}

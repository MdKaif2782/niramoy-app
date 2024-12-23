import WelcomeUser from "@/components/home/welcome-user";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, StatusBar } from "react-native";
import { Text } from "react-native-paper";
import { Image, StyleSheet, Platform, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import DietItem from "@/components/dashboard/diet-item";
import MoodCard from "@/components/dashboard/mood-card";
import { ytLinkToThumbnail } from "@/utils/browser/browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AIQuery } from "@/modules/ai/models/ai.model";
import { env } from "@/config/app.config";
import { useGetLatestQuery } from "@/modules/ai/api/ai.api";
export interface HomeUserState {
  name: string | null;
}

let reFetch: () => void;
export const reFetchData = () => {
  reFetch();
}

export default function HomeScreen() {
  const getUserId = async () => {
    const niramoyUserId = await AsyncStorage.getItem("niramoy_user_id");
    return niramoyUserId;
  };

  //use axios to fetch data from the backend
  const [aiResponse, setAiResponse] = useState<AIQuery>();
  const [refresh, setRefresh] = useState(0);

  reFetch = async () => {
    setRefresh((prev) => prev + 1);
  };

  
  useEffect(() => {
    console.log("fetching data");
    
    const fetchData = async () => {
      const userId = await getUserId();
    //  console.log(userId);
    //   console.log(`${env.apiUrl}latest/${userId}`);
  
      const response = await fetch(`${env.apiUrl}latest/${userId}`);
      // console.log(response);
  
      const data = await response.json();
      // console.log(data);
      setAiResponse(data);
    };

    fetchData();
  
  }, [refresh]);

  useEffect(() => {
    reFetch();
  }, []);


  const [user, setuser] = useState<HomeUserState>({
    name: "Kaif",
  });

  const { colors } = useTheme();

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
      <StatusBar backgroundColor={colors.tertiary} />
      <View className="py-10 px-5">
        <WelcomeUser name={user.name} />

        <MoodCard mood={aiResponse?.mood}/>

        <View className="shadow-sm p-4 rounded-xl w-full h-fit flex-col bg-white shadow-black">
          <Text variant="labelLarge" style={{ color: colors.primary }}>
            Today's diet chart
          </Text>
          {aiResponse?.diet_plan.meals.map((meal, index) => {
            return (
              <DietItem
                id={meal.id}
                key={index}
                type={meal.type}
                isCompleted={meal.completed}
                content={meal.items}
                contentType="meal"
                description={meal.recipe_description}
                imageUrl={ytLinkToThumbnail(meal.youtube_link)}
              />
            );
          })}
        </View>

        <View className="mt-4" />
        <View className="shadow-sm p-4 rounded-xl w-full h-fit flex-col bg-white shadow-black">
          <Text variant="labelLarge" style={{ color: colors.primary }}>
            Today's GYM chart
          </Text>
          {aiResponse?.exercises.map((exercise, index) => {
            return (
              <DietItem
                id={exercise.id}
                key={index}
                contentType="workout"
                isCompleted={exercise.completed}
                type={exercise.name}
                content={exercise.category}
                description={exercise.description}
                imageUrl={ytLinkToThumbnail(exercise.youtube_link)}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

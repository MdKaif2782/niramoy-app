import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { env } from "@/config/app.config";
import { Mood } from "@/modules/ai/models/ai.model";
import { reFetchData } from "@/app/(tabs)";

interface MoodCardProps{
  mood?: Mood
}
const MoodCard = (props: MoodCardProps) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const moods = [
    { emoji: "😞", label: "Not Good" },
    { emoji: "😐", label: "Okay" },
    { emoji: "😊", label: "Good" },
    { emoji: "😁", label: "Very Good" },
    { emoji: "🤩", label: "Excellent" },
  ];

  const handleMoodSelected = async (mood: string) => {
    setLoading(true);
    const userId = await AsyncStorage.getItem("niramoy_user_id");
    if (userId) {
      const response = await fetch(`${env.apiUrl}api/feedback/mood`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          mood: mood,
        }),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false)
      reFetchData();
    }
  };

  return (
    <View className="shadow-sm p-4 rounded-xl w-full h-fit flex-col bg-white shadow-black my-4">
      <Text variant="labelLarge" style={{ color: colors.primary }}>
        How are you feeling today?
      </Text>
      <View className="flex-row justify-around mt-4">
        {!loading && moods.map((mood, index) => (
            <TouchableOpacity
            key={index}
            className="items-center"
            onPress={() => handleMoodSelected(mood.label)}
            style={{
              backgroundColor: props.mood?.mood === mood.label ? 'rgba(255, 0, 0, 0.3)' : 'transparent',
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 2
            }}
            >
            <Text>{mood.emoji}</Text>
            <Text variant="labelSmall">{mood.label}</Text>
            </TouchableOpacity>
        ))}
        {loading && <ActivityIndicator size={20} className="h-12" color={colors.primary}/>}
      </View>
    </View>
  );
};

export default MoodCard;
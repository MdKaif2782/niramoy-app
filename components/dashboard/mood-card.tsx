import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const MoodCard = () => {
    const {colors}  = useTheme();
    return(
        <View className="shadow-sm p-4 rounded-xl w-full h-fit flex-col bg-white shadow-black my-4">
        <Text variant="labelLarge" style={{color:colors.primary}}>How are you feeling today?</Text>
        <View className="flex-row justify-around mt-4">
          <View className="items-center">
            <Text>😞</Text>
            <Text variant="labelSmall">Not Good</Text>
          </View>
          <View className="items-center">
            <Text>😐</Text>
            <Text variant="labelSmall">Okay</Text>
          </View>
          <View className="items-center">
            <Text>😊</Text>
            <Text variant="labelSmall">Good</Text>
          </View>
          <View className="items-center">
            <Text>😁</Text>
            <Text variant="labelSmall">Very Good</Text>
          </View>
          <View className="items-center">
            <Text>🤩</Text>
            <Text variant="labelSmall">Excellent</Text>
          </View>
        </View>
      </View>
    )
}

export default MoodCard;
import { SquareCheckBig } from "lucide-react-native";
import { View, Image } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface DietItemProps {
    mealType: string;
    mealDescription: string;
    imageUrl: string;
    isCompleted?: boolean;
}

const DietItem = (props:DietItemProps) => {
    const { colors } = useTheme();

    if(props.isCompleted===undefined) props.isCompleted = false;

    return (
        <View className="mt-4 shadow-sm px-4 py-2 rounded-lg w-full h-fit flex-row bg-[#E8104610]">
            <Image source={{ uri: props.imageUrl, height: 20, width: 20 }} className="w-12 h-12 self-center rounded-lg" />
            <View className="ml-4 justify-center">
                <Text variant="labelMedium">{props.mealType}</Text>
                <Text variant="labelSmall">{props.mealDescription}</Text>
            </View>
            <View className="flex-1" />
            <SquareCheckBig color={
                props.isCompleted ? colors.primary : 'gray'
            } size={20} className="self-center" />
        </View>
    );
}

export default DietItem;
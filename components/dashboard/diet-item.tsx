import React, { useState } from "react";
import { Text, useTheme, Button } from "react-native-paper";
import { View, Image, TouchableOpacity } from "react-native";
import { Check, SquareCheckBig, Youtube } from "lucide-react-native";

interface DietItemProps {
    type: string;
    content: string;
    description?: string;
    imageUrl: string;
    isCompleted?: boolean;
}

const DietItem = (props: DietItemProps) => {
    const { colors } = useTheme();
    const [expanded, setExpanded] = useState(false);

    if (props.isCompleted === undefined) props.isCompleted = false;

    return (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <View className={`mt-4 shadow-sm px-4 rounded-lg w-full h-fit ${expanded?'flex-col py-4':'flex-row py-2'} bg-[#E8104610]`}>
                <Image source={{ uri: props.imageUrl }} className={`self-center rounded-lg ${expanded ? 'w-full h-48' : 'w-12 h-12 mr-3'}`} />
                {expanded&&<View className="mt-4"/>}
                <View className="justify-center flex-col flex-1">
                    <Text variant="labelMedium">{props.type}</Text>
                    <Text variant="labelSmall" className={`${expanded?'':'w-[50vw]'}`}>
                        {props.content}
                    </Text>
                </View>
                {expanded && (
                    <View className="mt-4">
                        <Text variant="bodySmall">{props.description}</Text>
                        <View className="mt-4 flex-row justify-between">
                            <Button mode="contained" className="justify-center" onPress={() => { /* Mark as done logic */ }}>
                                <Text variant="bodyMedium" className="text-white">Mark as done</Text>
                            </Button>
                            <Button mode="outlined" onPress={() => { /* Watch the recipe on YouTube logic */ }}>Watch Video</Button>
                        </View>
                    </View>
                )}
                <View className="flex-1" />
                {!expanded&&<SquareCheckBig color={props.isCompleted ? colors.primary : 'gray'} size={20} className="self-center" />}
            </View>
        </TouchableOpacity>
    );
}

export default DietItem;
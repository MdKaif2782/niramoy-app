import React, { useState } from "react";
import { Text, useTheme, Button, ProgressBar, ActivityIndicator } from "react-native-paper";
import { View, Image, TouchableOpacity } from "react-native";
import { Check, SquareCheckBig, Youtube } from "lucide-react-native";
import { env } from "@/config/app.config";
import { reFetchData } from "@/app/(tabs)";

interface DietItemProps {
    type: string;
    content: string;
    description?: string;
    imageUrl: string;
    isCompleted?: boolean;
    id: number;
    contentType: 'workout' | 'meal';
}

const DietItem = (props: DietItemProps) => {
    const { colors } = useTheme();
    const [expanded, setExpanded] = useState(false);
    const [loading,setLoading] = useState(false)

    if (props.isCompleted === undefined) props.isCompleted = false;

    const updateCompletion = () => {
        setLoading(true)
        // API call to update the completion
        fetch(`${env.apiUrl}api/feedback/${props.contentType}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: props.id,
                completed: true,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            reFetchData();
            setExpanded(false);
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error:', error);
            reFetchData();
        })

    };

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
                            {!loading&&<Button  mode="contained" className="justify-center " onPress={() => { updateCompletion() }}>
                                <Text variant="bodyMedium" className="text-white">Mark as done</Text>
                            </Button>}
                            {loading&&<ActivityIndicator size={20} className={"w-[38vw]"} color={colors.primary} />}
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
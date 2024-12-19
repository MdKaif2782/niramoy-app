import { View } from "react-native";
import React from "react";
import {
  ActivityIndicator,
  Button,
  ButtonProps,
  Text
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/theme/theme";
import { TouchableOpacity } from "react-native";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  textColor?: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}

const CustomButton = (props: CustomButtonProps) => {
  if (props.disabled === undefined) props.disabled = false;
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.disabled === true) {
          console.log("Button Pressed but disabled");
          console.log(props.disabled);
          return;
        }
        props.onPress && props.onPress();
      }}
      className={`mt-4 w-full flex-row items-center justify-center rounded-md ${props.className}`}
      style={{
        backgroundColor: props.disabled ? "#c5c5c5" : theme.colors.primary
      }}
    >
      {props.loading && (
        <ActivityIndicator size={20} className={"mr-3"} color={"#FFFFFF"} />
      )}
      {props.iconName && (
        <View className="pr-1">
          <MaterialCommunityIcons
            name={props.iconName}
            size={18}
            color={props.textColor ? props.textColor : "#FFFFFF"}
          />
        </View>
      )}
      <Text
        variant="bodySmall"
        style={{ color: props.textColor ? props.textColor : "#FFFFFF" }}
        className="font-semibold py-3"
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

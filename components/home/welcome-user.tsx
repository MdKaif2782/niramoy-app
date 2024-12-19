import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface WelcomeUserProps {
  name: string | null;
}

const WelcomeUser = (props: WelcomeUserProps) => {
  const theme = useTheme();
  return (
    <View className="flex flex-row my-5">
      <Text variant="titleLarge">Welcome Back</Text>
      <Text
        variant="titleLarge"
        style={{ color: theme.colors.primary }}
        className="ml-1"
      >
        {props.name}
      </Text>
    </View>
  );
};

export default WelcomeUser;

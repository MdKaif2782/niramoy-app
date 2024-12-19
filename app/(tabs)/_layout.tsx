import { Tabs, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import TabBarIcon from "@expo/vector-icons/AntDesign";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/theme/theme";
import { Alert, BackHandler } from "react-native";
import { LayoutDashboard, Settings } from "lucide-react-native";

export default function TabLayout() {
  const router = useRouter();
  const nav = useNavigation();
  useEffect(() => {
    const backAction = () => {
      const currentRoute = nav.getState().routes[nav.getState().index].name;
      if (currentRoute === "(tabs)") {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      } else {
        router.back();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 55
        },
        tabBarActiveTintColor: theme.colors.primary
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <LayoutDashboard size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Settings size={28} color={color} />
          )
        }}
      />
    </Tabs>
  );
}

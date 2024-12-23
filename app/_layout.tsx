import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { theme } from "@/theme/theme";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { handleRemoteMessage } from "@/utils/notification/notification-manager";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync().then((r) => console.log(r));
let pendingRoute = '';

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("You need to enable notifications in the app settings.");
    return;
  }
  if (Platform.OS === "android")
    await Notifications.setNotificationChannelAsync("default", {
      name: "default notifications",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: "default"
    });
}

export default function RootLayout() {
  const router = useRouter();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const [loaded] = useFonts({
    poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
    poppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
    poppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    poppinsSemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    poppinsLight: require("@/assets/fonts/Poppins-Light.ttf"),
    poppinsExtraLight: require("@/assets/fonts/Poppins-ExtraLight.ttf"),
    poppinsThin: require("@/assets/fonts/Poppins-Thin.ttf"),
    poppinsItalic: require("@/assets/fonts/Poppins-Italic.ttf"),
    poppinsBoldItalic: require("@/assets/fonts/Poppins-BoldItalic.ttf"),
    poppinsMediumItalic: require("@/assets/fonts/Poppins-MediumItalic.ttf"),
    poppinsSemiBoldItalic: require("@/assets/fonts/Poppins-SemiBoldItalic.ttf"),
    poppinsLightItalic: require("@/assets/fonts/Poppins-LightItalic.ttf"),
    poppinsExtraLightItalic: require("@/assets/fonts/Poppins-ExtraLightItalic.ttf"),
    poppinsThinItalic: require("@/assets/fonts/Poppins-ThinItalic.ttf"),
    poppinsBlack: require("@/assets/fonts/Poppins-Black.ttf"),
    poppinsBlackItalic: require("@/assets/fonts/Poppins-BlackItalic.ttf"),
    poppinsExtraBold: require("@/assets/fonts/Poppins-ExtraBold.ttf"),
    poppinsExtraBoldItalic: require("@/assets/fonts/Poppins-ExtraBoldItalic.ttf")
  });
 
    useEffect(() => {
      if (lastNotificationResponse) {
          console.log(lastNotificationResponse);
        
          //console.log(lastNotificationResponse);
          if(lastNotificationResponse.notification.request.identifier!=='default'){
              console.log(lastNotificationResponse.notification.request.identifier);
              pendingRoute = lastNotificationResponse.notification.request.identifier;
          }
      }
  }, [lastNotificationResponse]);
  useEffect(() => {
    registerForPushNotificationsAsync().then((r) => console.log(r));
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
      });
    messaging().onTokenRefresh((token) => {
      console.log(token);
    });
    registerForPushNotificationsAsync().then((r) => console.log(r));
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
      });
    messaging().onTokenRefresh((token) => {
      console.log(token);
    });
    messaging()
      .subscribeToTopic("test")
      .then(() => console.log("Subscribed to topic!"));

    return messaging().onMessage(async (remoteMessage) => {
      await handleRemoteMessage(remoteMessage);
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
  }, []);


  useEffect(() => {
    const loadData = async () => {
      if (loaded) {
        const saved_id = await AsyncStorage.getItem("niramoy_user_id");
        if (saved_id) {
          router.push("/(tabs)");
        } else {
          router.push("/login");
        }

        SplashScreen.hideAsync().then((r) => console.log(r));
      }
    };
    loadData();
  }, [loaded]);


  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme} settings={{ rippleEffectEnabled: false }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}

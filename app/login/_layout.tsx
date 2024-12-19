import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import React, { useEffect, useState } from "react";
import LoginForm from "@/components/login/login-form";

const LoginScreen = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View className="flex flex-1 ">
      <View className="flex-[0.5]"/>
      <Image source={require("@/assets/images/logo.png")} height={20} width={20} className=" h-36 w-36 self-center "/>
      <LoginForm setKeyboardOpen={setKeyboardVisible} />
      <View className="flex-1"/>
    </View>
  );
};

export default LoginScreen;

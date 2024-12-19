import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";
import CustomButton from "../ui/button";
import { useRouter } from "expo-router";
import { useLoginMutation } from "@/modules/auth/api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { el } from "react-native-paper-dates";
import { date } from "zod";

interface LoginFormProps {
  setKeyboardOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = (props: LoginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const theme = useTheme();
  const router = useRouter();
  const [
    login,
    { data: loginData, isLoading: loginLoading, error: loginError }
  ] = useLoginMutation();

  const loginUser = async () => {
    if (email === "" || password === "") {
      setErrorMessage("Please fill all fields");
    } else if (!email.includes("@")) {
      setErrorMessage("Invalid email");
    } else {
      setErrorMessage("");
      try {
        await login({ email, password }).then((res) => {
          if (res.data) {
            if(res.data.id)
            AsyncStorage.setItem("niramoy_user_id", res.data.id).then(
              () => {
                console.log("Token saved");
                router.push("/(tabs)");
              }
            );
            else{
              console.log("No token found");
            }
          }else{
            const error = res.error as {data: string};
            if(error.data){
              setErrorMessage(error.data);
            }
          }
        });
      } catch (err) {
        setErrorMessage("Login failed");
        console.log(err);
      }
    }
  };

  return (
    <View className="px-5 mt-10">
      <Text variant="titleMedium" className="text-center">
        Login
      </Text>
      <View className="mt-5">
        <TextInput
          value={email}
          placeholder="E-mail"
          mode="outlined"
          outlineColor={theme.colors.primary}
          onPress={() => props.setKeyboardOpen && props.setKeyboardOpen(true)}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          value={password}
          mode="outlined"
          className="mt-3"
          placeholder="password"
          outlineColor={theme.colors.primary}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={!showPass}
          onPress={() => props.setKeyboardOpen && props.setKeyboardOpen(true)}
          right={
            showPass ? (
              <TextInput.Icon
                icon="eye-off"
                onPress={() => setShowPass(!showPass)}
              />
            ) : (
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowPass(!showPass)}
              />
            )
          }
        />
      </View>
      <CustomButton className="mt-5" onPress={loginUser} loading={loginLoading}>
        Sign In
      </CustomButton>
      {errorMessage && (
        <View className="rounded-md p-3 bg-red-200 mt-3">
          <Text className="text-red-500 font-medium">{errorMessage}</Text>
        </View>
      )}
      <View className="flex items-center">
        <Divider bold className="my-5 w-[200px]" />
        <View className="flex flex-row items-center gap-2">
          <Text variant="bodySmall">Don't have an Account?</Text>
          <Text
            onPress={() => router.push("/(tabs)")}
            variant="bodySmall"
            style={{ color: theme.colors.primary }}
          >
            Register
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;

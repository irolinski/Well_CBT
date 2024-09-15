import React from "react";
import { Stack } from "expo-router";

const PhoneLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, statusBarColor: "dark" }}
      />
      <Stack.Screen name="add" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PhoneLayout;

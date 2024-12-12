import React from "react";
import { Stack } from "expo-router";

const PhoneLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="add" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PhoneLayout;

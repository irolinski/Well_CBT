import React from "react";
import { Stack } from "expo-router";

const BreathingLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, statusBarColor: "dark" }}
      />
      <Stack.Screen name="Breathe" options={{ headerShown: false }} />
    </Stack>
  );
};

export default BreathingLayout;

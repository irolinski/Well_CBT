import { Stack } from "expo-router";
import React from "react";

const GroundYourselfLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="GroundYourself" options={{ headerShown: false }} />
    </Stack>
  );
};

export default GroundYourselfLayout;

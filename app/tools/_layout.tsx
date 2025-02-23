import { Stack } from "expo-router";
import React from "react";

const ToolLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="classic_cbt/cda" options={{ headerShown: false }} />
      <Stack.Screen
        name="classic_cbt/journal"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="relax/breathing" options={{ headerShown: false }} />
      <Stack.Screen
        name="relax/ground_yourself"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="distract/phone" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ToolLayout;

import { Stack } from "expo-router";
import React from "react";

const CDALayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="log_1" options={{ headerShown: false }} />
      <Stack.Screen name="log_2" options={{ headerShown: false }} />
      <Stack.Screen name="log_3" options={{ headerShown: false }} />
      <Stack.Screen name="log_4" options={{ headerShown: false }} />
      <Stack.Screen name="log_5" options={{ headerShown: false }} />
      <Stack.Screen name="log_finish" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CDALayout;

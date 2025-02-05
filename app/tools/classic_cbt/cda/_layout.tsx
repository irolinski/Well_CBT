import { Stack } from "expo-router";
import React from "react";

const CDALayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="page_1" options={{ headerShown: false }} />
      <Stack.Screen name="page_2" options={{ headerShown: false }} />
      <Stack.Screen name="page_3" options={{ headerShown: false }} />
      <Stack.Screen name="page_4" options={{ headerShown: false }} />
      <Stack.Screen name="page_finish" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CDALayout;

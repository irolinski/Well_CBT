import { Stack } from "expo-router";
import React from "react";

const PreferencesLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="storage" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PreferencesLayout;

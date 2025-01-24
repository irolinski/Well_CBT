import { Stack } from "expo-router";
import React from "react";

const AboutLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="settings/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AboutLayout;

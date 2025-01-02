import React from "react";
import { Stack } from "expo-router";

const LearnLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="categories" options={{ headerShown: false }} />
    </Stack>
  );
};

export default LearnLayout;

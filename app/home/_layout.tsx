import React from "react";
import { Stack } from "expo-router";

const ActivityLogLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="activity_log/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="activity_log/show" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ActivityLogLayout;

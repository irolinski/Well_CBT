import React from "react";
import { Stack } from "expo-router";

const ActivityLogShowLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="cda/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="journal/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ActivityLogShowLayout;

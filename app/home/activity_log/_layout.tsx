import React from "react";
import { Stack } from "expo-router";

const ActivityLogLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, statusBarColor: "dark" }}
      />
    </Stack>
  );
};

export default ActivityLogLayout;

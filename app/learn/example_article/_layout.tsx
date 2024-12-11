import React from "react";
import { Stack } from "expo-router";

const LearnLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, statusBarColor: "dark" }}
      />
    </Stack>
  );
};

export default LearnLayout;

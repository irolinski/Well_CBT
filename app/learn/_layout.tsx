import React from "react";
import { Stack } from "expo-router";

const LearnLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="example_article/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default LearnLayout;

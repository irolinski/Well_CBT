import React from "react";
import { Stack } from "expo-router";

const LearnCategoriesLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[category]/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[category]/[articleId]/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default LearnCategoriesLayout;

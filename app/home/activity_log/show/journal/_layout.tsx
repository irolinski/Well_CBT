import React from "react";
import { Stack } from "expo-router";

const ShowJournalActivity = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{ headerShown: false, statusBarColor: "dark" }}
      />
    </Stack>
  );
};

export default ShowJournalActivity;

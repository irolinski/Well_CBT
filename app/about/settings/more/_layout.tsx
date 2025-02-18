import { Stack } from 'expo-router';
import React from 'react';

const MoreLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="report_a_bug" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MoreLayout;

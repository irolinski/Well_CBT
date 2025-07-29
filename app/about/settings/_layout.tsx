import { Stack } from 'expo-router';
import React from 'react';

const AboutLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="preferences" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AboutLayout;

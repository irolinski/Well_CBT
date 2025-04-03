import "@/hooks/i18n";
import { useFonts } from "expo-font";
import { setNotificationHandler } from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import ErrorBoundary from "react-native-error-boundary";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as StateProvider } from "react-redux";
import { RenderingErrorFallback } from "@/components/ErrorScreen";
import {
  setUpAchievementsTable,
  updateAchievementProgress,
} from "@/db/achievements/global";
import { seedDB } from "@/db/seed";
import { createActivityViewTable, setUpDB } from "@/db/service";
import { handleSetVisitStreakCount } from "@/db/user";
import { store } from "@/state/store";

// Prevent splash screen from hiding before everything is ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Standard.ttf"),
    InterItalic: require("../assets/fonts/Inter-Italic.ttf"),
    KodchasanRegular: require("../assets/fonts/Kodchasan-Regular.ttf"),
    KodchasanMedium: require("../assets/fonts/Kodchasan-Medium.ttf"),
  });

  // Ensure fonts and database setup are completed
  const initializeApp = useCallback(async () => {
    try {
      await setUpDB();
      await createActivityViewTable();
      await handleSetVisitStreakCount();
      await setUpAchievementsTable();
      await updateAchievementProgress();
      // await seedDB(); // Uncomment if needed

      if (!fontsLoaded) {
        throw new Error("could not load fonts");
      }

      setIsReady(true);
    } catch (err) {
      console.error(err);
    } finally {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      initializeApp();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);

  if (!isReady) {
    return null; // Prevent rendering until everything is ready
  }

  return (
    <ErrorBoundary FallbackComponent={RenderingErrorFallback}>
      <StateProvider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="tools" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="learn" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </GestureHandlerRootView>
      </StateProvider>
    </ErrorBoundary>
  );
}

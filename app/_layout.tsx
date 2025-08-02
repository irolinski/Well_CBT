import '@/hooks/i18n';
import { useFonts } from 'expo-font';
import { setNotificationHandler } from 'expo-notifications';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as StateProvider } from 'react-redux';
import { RenderingErrorFallback } from '@/components/global/ErrorScreen';
import { GlobalState } from '@/constants/models/global/models';
import { setUpAchievementsTable, updateAchievementProgress } from '@/db/achievements/global';
import { createActivityViewTable, setUpDB } from '@/db/service';
import { handleGetLastVisit, handleSetVisitStreakCount } from '@/db/user';
import { GlobalStateContext } from '@/state/context/global';
import { store } from '@/state/store';
import { getTranslation } from '@/utils/locales';

// Prevent splash screen from hiding before everything is ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [globalState, setGlobalState] = useState<GlobalState>({
    lastVisit: new Date(),
  });

  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Standard.ttf"),
    InterItalic: require("../assets/fonts/Inter-Italic.ttf"),
    KodchasanRegular: require("../assets/fonts/Kodchasan-Regular.ttf"),
    KodchasanMedium: require("../assets/fonts/Kodchasan-Medium.ttf"),
    KodchasanBold: require("../assets/fonts/Kodchasan-Bold.ttf"),
  });

  // Ensure fonts and database setup are completed
  const initializeApp = useCallback(async () => {
    const handleGlobalState = async () => {
      const lastVisit = await handleGetLastVisit();
      setGlobalState((prev) => ({
        ...prev,
        lastVisit: lastVisit ?? new Date(),
      }));
    };

    try {
      await setUpDB();
      await createActivityViewTable();
      await handleGlobalState();
      await handleSetVisitStreakCount();
      await setUpAchievementsTable();
      await updateAchievementProgress();
      if (!fontsLoaded) {
        Alert.alert(
          getTranslation("alerts.error"),
          getTranslation("alerts.error_fonts"),
        );
        throw new Error("could not load fonts");
      }

      setIsReady(true);
    } catch (err) {
      console.error(err);
      Alert.alert(
        getTranslation("alerts.error"),
        getTranslation("alerts.error_initialization"),
      );
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
        shouldShowBanner: true,
        shouldShowList: false,
      }),
    });
  }, []);

  if (!isReady) {
    return null; // Prevent rendering until everything is ready
  }

  return (
    <ErrorBoundary FallbackComponent={RenderingErrorFallback}>
      <StateProvider store={store}>
        <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
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
        </GlobalStateContext.Provider>
      </StateProvider>
    </ErrorBoundary>
  );
}

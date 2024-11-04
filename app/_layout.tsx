import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
// import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider as StateProvider } from "react-redux";
import { store } from "@/state/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Asset } from "expo-asset";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function cacheImages(images: any[]) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Standard.ttf"),
    InterItalic: require("../assets/fonts/Inter-Italic.ttf"),
    KodchasanRegular: require("../assets/fonts/Kodchasan-Regular.ttf"),
    KodchasanMedium: require("../assets/fonts/Kodchasan-Medium.ttf"),
  });

  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Load any resources or data that you need before rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages([
          require("../assets/images/affirmation-images/California-backyard-1.webp"),
          require("../assets/images/affirmation-images/California-backyard-2.webp"),
          require("../assets/images/affirmation-images/California-backyard-3.webp"),
          require("../assets/images/affirmation-images/California-backyard-4.webp"),
          require("../assets/images/affirmation-images/english-countryside-1.webp"),
          require("../assets/images/affirmation-images/english-countryside-2.webp"),
          require("../assets/images/affirmation-images/english-countryside-3.webp"),
          require("../assets/images/affirmation-images/english-countryside-4.webp"),
        ]);

        await Promise.all([...imageAssets]);
        console.log("images cached");
      } catch (err) {
        console.warn(err);
      } finally {
        setImagesLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!imagesLoaded || !fontsLoaded) {
    return null;
  }

  return (
    <StateProvider store={store}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="tools/classic_cbt/cda"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tools/classic_cbt/journal"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tools/relax/breathing"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tools/distract/phone"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </StateProvider>
  );
}

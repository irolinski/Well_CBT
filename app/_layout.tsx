import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as StateProvider } from "react-redux";
import { store } from "@/state/store";

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
          require("@/assets/images/tools/distortions.webp"),
          require("@/assets/images/tools/journal.webp"),
          require("@/assets/images/tools/ground.webp"),
          require("@/assets/images/tools/breathe.webp"),
          require("@/assets/images/tools/phone.webp"),
          require("@/assets/images/tools/headphones.webp"),
          require("@/assets/images/tools/breathe/canes.webp"),
        ]);

        await Promise.all([...imageAssets]);
        // console.log("images cached");
      } catch (err) {
        console.warn(err);
      } finally {
        setImagesLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  // asset prefetching on ios in React Native, as of 11/2024, is faulty
  // and does not behave as expected
  // info: https://github.com/facebook/react-native/issues/28557
  // possible workaround: https://www.npmjs.com/package/react-native-expo-image-cache

  if (!fontsLoaded || !imagesLoaded) {
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
          <Stack.Screen
            name="home/activity_log"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </StateProvider>
  );
}

import { Image } from "expo-image";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import JournalCard from "@/components/home/JournalCard";
import NewActivityModal from "@/components/home/NewActivityModal";
import QuoteWidget from "@/components/home/QuoteWidget";
import WelcomeTypewriterText from "@/components/home/WelcomeTypewriterText";
import { EntryViewTableRow } from "@/constants/models/home/activity_log";
import { Colors } from "@/constants/styles/colorTheme";
import { fetchRecentEntries } from "@/db/activity_log";
import { setShowNewActivityModal } from "@/state/features/menus/newActivityModalSlice";
import { AppDispatch } from "@/state/store";
import { Entypo } from "@expo/vector-icons";
import AppOnboardingModal from "../home/AppOnboardingModal";

const MIN_RECENT_ACTIVITY_LENGTH = 2;

const Home = () => {
  const { t } = useTranslation(["home", "common"]);
  const dispatch = useDispatch<AppDispatch>();
  const [recentEntriesArr, setRecentEntriesArr] = useState<EntryViewTableRow[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetchRecentEntries()
      .then((res) => {
        setRecentEntriesArr(res as EntryViewTableRow[]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <FrameMenu title={t("index.title")} className="items-center justify-center">
      <View>
        {/* Welcome */}
        <WelcomeTypewriterText />
        {/* Quote Widget */}
        <View className="my-4 items-center justify-center">
          <QuoteWidget />
        </View>
        {/* Recent */}
        {!isLoading && (
          <View>
            <View className="mx-4 flex-row justify-between">
              <Text className="my-6 text-left text-2xl">
                {t("index.recent_activity")}
              </Text>
              <Pressable
                className="justify-center"
                onPress={() => dispatch(setShowNewActivityModal(true))}
              >
                <Entypo name="plus" size={32} color="black" />
              </Pressable>
            </View>
            <View className="px-1">
              {recentEntriesArr.length >= MIN_RECENT_ACTIVITY_LENGTH ? (
                recentEntriesArr.map(
                  (item: EntryViewTableRow, index: number) => (
                    <JournalCard
                      toolName={item.activityName}
                      datetime={item.datetime}
                      value={item.value && item.value}
                      key={index}
                      link={`./../home/activity_log/show/${item.activityName}/${item.id}`}
                    />
                  ),
                )
              ) : (
                <View
                  className="justify-around overflow-hidden rounded-xl border"
                  style={{ borderColor: Colors.lightGray }}
                >
                  <Image
                    className="top-0"
                    style={{ height: 140, width: "100%" }}
                    source={require("@/assets/images/home/recent_activity_placeholder_image.webp")}
                  />
                  <Text
                    className="mx-8 mb-8 mt-4 text-center text-base"
                    style={{ color: Colors.darkGray }}
                  >
                    {t("index.recent_activity_placeholder")}
                  </Text>
                </View>
              )}
              <View className="mt-5 flex-row justify-end">
                <AdvanceButton
                  title={t("buttons.see_all", { ns: "common" })}
                  onPress={() => {
                    router.push("/home/activity_log/" as Href);
                  }}
                  btnStyle={{
                    width: 150,
                    height: 45,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: Colors.lightGray,
                    borderRadius: 12,
                  }}
                  textStyle={{ color: Colors.offBlack }}
                />
              </View>
            </View>
          </View>
        )}
      </View>
      <NewActivityModal />
      <AppOnboardingModal />
    </FrameMenu>
  );
};

export default Home;

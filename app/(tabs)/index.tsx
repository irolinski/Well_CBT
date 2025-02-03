import { Image } from "expo-image";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { fetchRecentEntries } from "@/db/activity_log";
import { setShowNewActivityModal } from "@/state/features/menus/newActivityModalSlice";
import { AppDispatch } from "@/state/store";
import { Entypo } from "@expo/vector-icons";

const MIN_RECENT_ACTIVITY_LENGTH = 2;

const Home = () => {
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
    <FrameMenu title="Home" className="items-center justify-center">
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
                Your recent activity:
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
                <Image
                  style={{ height: 215, width: "100%" }}
                  contentFit="contain"
                  source={require("@/assets/images/home/recent_activity_placeholder.webp")}
                />
              )}
              <View className="mt-5 flex-row justify-end">
                <AdvanceButton
                  title="See all"
                  onPress={() => {
                    router.push("/home/activity_log/" as Href);
                  }}
                  btnStyle={{
                    width: 150,
                    height: 45,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#D9D9D9",
                    borderRadius: 12,
                  }}
                  textStyle={{ color: "#27261F" }}
                />
              </View>
            </View>
          </View>
        )}
      </View>
      <NewActivityModal />
    </FrameMenu>
  );
};

export default Home;

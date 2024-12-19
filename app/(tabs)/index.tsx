import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import JournalCard from "@/components/home/JournalCard";
import QuoteWidget from "@/components/home/QuoteWidget";
import TypewriterText from "@/components/TypewriterText";
import { EntryViewTableRow } from "@/constants/models/activity_log";
import { fetchRecentEntries } from "@/db/activity_log";
import { Entypo } from "@expo/vector-icons";
import NewActivityModal from "@/components/home/NewActivityModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { setShowNewActivityModal } from "@/state/features/menus/newActivityModalSlice";

const windowWidth = Dimensions.get("window").width;

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [recentEntriesArr, setRecentEntriesArr] = useState<EntryViewTableRow[]>(
    [],
  );

  useEffect(() => {
    fetchRecentEntries().then((res) => {
      setRecentEntriesArr(res as EntryViewTableRow[]);
    });

    console.log(recentEntriesArr);
  }, []);

  return (
    <FrameMenu title="Home" className="items-center justify-center">
      <View>
        {/* Welcome */}
        <View className="my-4">
          <View
            className="mx-4 mb-8 mt-2 justify-center"
            style={{ borderColor: "#DDDDDD" }}
          >
            <TypewriterText
              text={"Hi, Olga! How are you, today? "}
              speed="fast"
              fontFamily="KodchasanMedium"
              color="#757575"
              letterSpacing={2}
              lineHeight={1.5}
              hideCursorOnFinish={true}
            />
          </View>
          <DividerLine width={windowWidth / 1.5} weight={0.5} />
        </View>
        {/* Quote Widget */}
        <View className="my-4 items-center justify-center">
          <QuoteWidget
            image={require("@/assets/images/home/quote_widget/bg_1.webp")}
          />
        </View>
        {/* Recent */}
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
          <View className="px-1" style={{ height: 370 }}>
            {recentEntriesArr[0] &&
              recentEntriesArr.map((item: EntryViewTableRow, index: number) => (
                <JournalCard
                  toolName={item.activityName}
                  datetime={item.datetime}
                  value={item.value && item.value}
                  key={index}
                  link={`./../home/activity_log/show/${item.activityName}/${item.id}`}
                />
              ))}
          </View>
          <View className="mt-3 flex-row justify-end">
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
      <NewActivityModal />
    </FrameMenu>
  );
};

export default Home;

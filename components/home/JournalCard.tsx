import { Href, router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { monthNamesShort } from "@/constants/models/dates";
import {
  JournalCardProps,
  ToolCategories,
  ToolList,
} from "@/constants/models/home/activity_log";
import { Colors } from "@/constants/styles/colorTheme";
import { getOrdinalSuffix } from "@/utils/dates";
import { Entypo } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import Text from "../global/Text";

const JournalCard = ({ toolName, link, datetime, value }: JournalCardProps) => {
  let cardTime = datetime.split(" ")[1];
  cardTime = cardTime.slice(0, cardTime.lastIndexOf(":"));

  const cardDateTime = {
    day: new Date(datetime).getDate(),
    month: monthNamesShort[new Date(datetime).getMonth()],
    time: cardTime,
  };

  return (
    <View
      className="mb-4 rounded-xl"
      style={{
        height: 110,
        backgroundColor: "#F5F5F5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          ToolList[toolName].requiresInput &&
          router.navigate(`${link}` as Href, { relativeToDirectory: true })
        }
        activeOpacity={ToolList[toolName].requiresInput ? 0.5 : 1}
      >
        <View className="h-full w-full flex-row justify-center py-4">
          {/* Icon */}
          <View className="w-1/4">
            <View
              className="mb-8 h-3/4 w-full items-center justify-center border-r"
              style={{ borderColor: Colors.mainGray }}
            >
              <View>{ToolCategories[ToolList[toolName].category].icon}</View>
            </View>
          </View>
          {/* Body */}
          <View
            className="items-center justify-center pl-2 pr-5"
            style={{ width: "75%" }}
          >
            {/* Upper Row */}
            <View className="h-2/5 w-full flex-row items-center justify-between pl-4">
              <Text className="text-left text-base">
                {ToolList[toolName].category}
              </Text>
              <Text
                className="text-right text-sm"
                style={{ color: Colors.mainGray }}
              >
                {/* {cardDate + " " + cardTime} */}

                {cardDateTime.month +
                  " " +
                  cardDateTime.day +
                  getOrdinalSuffix(cardDateTime.day) +
                  "  |  " +
                  cardDateTime.time}
              </Text>
            </View>
            {/* Lower Row */}
            <View className="flex-row">
              <View style={{ width: "85%" }}>
                {toolName === "journal" ? (
                  <View className="flex-row">
                    <View className="w-full pl-4" style={{ width: "95%" }}>
                      <View className="pt-2">
                        {value && (
                          <Slider
                            minimumValue={0} // 0.1 causes a visual glitch
                            maximumValue={0.6}
                            value={(value - 1) / 10}
                            disabled
                            renderThumbComponent={() => <View></View>}
                            minimumTrackTintColor={
                              value < 4
                                ? "#D46A6A"
                                : value < 6
                                  ? "#F38E4E"
                                  : "#AED581"
                            }
                            maximumTrackTintColor={Colors.whiteSmoke}
                            trackStyle={{
                              paddingTop: 15,
                              borderRadius: 50,
                              borderColor: Colors.lightGray,
                              borderStyle: "solid",
                              borderWidth: 1,
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                ) : (
                  <View className="h-4/5 w-full flex-row items-center">
                    <View
                      className="h-full flex-row items-center justify-start pr-2 text-left"
                      style={{ width: "85%" }}
                    >
                      <View className="mx-4">{ToolList[toolName].icon}</View>
                      <Text
                        style={{
                          fontFamily: "KodchasanMedium",
                          fontSize: 16.5,
                        }}
                        numberOfLines={2}
                      >
                        {ToolList[toolName].name}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View
                className="items-end"
                style={{
                  width: "15%",
                  transform: [{ translateY: 17.5 }],
                }}
              >
                {ToolList[toolName].requiresInput && (
                  <Entypo name="chevron-right" size={20} color="#73848D" />
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default JournalCard;

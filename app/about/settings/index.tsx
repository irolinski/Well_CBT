import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackButton from "@/components/BackButton";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const index = () => {
  const windowHeight = Dimensions.get("window").height;

  const fakeData_1 = {
    title: "Preferences",
    items: [
      {
        title: "General Settings",
        icon: <FontAwesome5 name="smile" size={40} color="black" />,
      },
      {
        title: "Notifications",
        icon: <Ionicons name="notifications" size={40} color="#212529" />,
      },
      {
        title: "Subscription",
        icon: <FontAwesome6 name="arrows-spin" size={40} color="#212529" />,
      },
    ],
  };

  const fakeData_2 = {
    title: "More",
    items: [
      {
        title: "FAQ",
        icon: <AntDesign name="questioncircleo" size={40} color="#212529" />,
      },
      {
        title: "Report a Bug",
        icon: <FontAwesome6 name="arrows-spin" size={40} color="#212529" />,
      },
      {
        title: "Leave Feedback",
        icon: (
          <MaterialCommunityIcons
            name="message-processing-outline"
            size={40}
            color="#212529"
          />
        ),
      },
    ],
  };

  const settingsData = [fakeData_1, fakeData_2];

  return (
    <ScrollView>
      {/* Nav */}
      <View
        className={`z-10 w-full border-b`}
        style={{
          borderColor: "#D9D9D9",
          backgroundColor: "#8DBED8",
          paddingTop: windowHeight * 0.065,
          paddingBottom: 16,
        }}
      >
        <View className="z-10 w-full flex-row items-center justify-between px-6">
          <View>
            <BackButton color="#FBFBFB" />
          </View>
          <View className="flex-row justify-end">
            <Text
              className={`text-left text-2xl`}
              style={{
                fontFamily: "KodchasanMedium",
                color: "#F5F5F5",
              }}
            >
              Settings
            </Text>
          </View>
        </View>
      </View>
      {/* /Nav */}

      <View className="m-4">
        <View className="mt-4">
          {settingsData.map((segment, indexNum: number) => (
            <View className="mb-12" key={indexNum}>
              <Text
                className="mb-4 mt-2 text-left"
                style={{ color: "#27261F", fontSize: 26, fontWeight: 600 }}
              >
                {segment.title}
              </Text>
              <View className="w-full pl-4 pr-6">
                {segment.items.map((item, indexNum: number) => (
                  <React.Fragment key={indexNum}>
                    <View className="relative">
                      {indexNum !== 0 && (
                        <View className="absolute left-0">
                          <DividerLine
                            width={"95%"}
                            color="#B8B8B8"
                            weight={0.6}
                          />
                        </View>
                      )}
                    </View>
                    <TouchableOpacity
                      className="mr-4 flex-row py-6"
                      key={indexNum}
                      onPress={() => alert("Pressed!")}
                    >
                      <View className="w-full flex-row">
                        <View className="ml-3 w-1/5">{item.icon}</View>
                        <View className="w-4/5 justify-center">
                          <Text className="ml-2" style={{ fontSize: 22 }}>
                            {item.title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </React.Fragment>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default index;

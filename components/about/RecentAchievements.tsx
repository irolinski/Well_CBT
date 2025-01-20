import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import CarouselBadge from "./CarouselBadge";

const RecentAchievements = () => {
  // don't apply styles to selectedIndex; to rest apply -120px * indexNum
  const windowWidth = Dimensions.get("window").width;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const fakeData = [
    { image: require("@/assets/images/about/demo.png") },
    { image: require("@/assets/images/about/demo.png") },
    { image: require("@/assets/images/about/demo.png") },
    { image: require("@/assets/images/about/demo.png") },
    { image: require("@/assets/images/about/demo.png") },
  ];

  //get 5 achievements and loop them
  return (
    <View
      className="overflow-hidden rounded-xl"
      style={{ backgroundColor: "#F5F5F5", height: 430 }}
    >
      {/* top */}
      <View
        className="absolute top-0 w-full flex-row justify-center"
        style={{ height: "50%" }}
      >
        {fakeData.map((datum, indexNum: number) => (
          <CarouselBadge image={datum.image} index={indexNum} key={indexNum} />
        ))}
        {/* <View className="absolute bottom-0 z-20 h-40 w-40 rounded-full">
          <Image
            className="h-full w-full"
            source={require("@/assets/images/about/demo.png")}
          ></Image>
        </View>
        <View
          className="absolute bottom-0 z-20 h-40 w-40 rounded-full"
          style={{
            opacity: 0.5,
            transform: [{ translateX: "100%" }, { scale: 0.66 }],
          }}
        >
          <Image
            className="h-full w-full"
            source={require("@/assets/images/about/demo.png")}
          ></Image>
        </View>
        <View
          className="absolute bottom-0 z-20 h-40 w-40 rounded-full"
          style={{
            opacity: 0.5,
            transform: [{ translateX: "-100%" }, { scale: 0.66 }],
          }}
        >
          <Image
            className="h-full w-full"
            source={require("@/assets/images/about/demo.png")}
          ></Image>
        </View> */}
      </View>
      {/* bottom */}
      <View
        className="w-full items-center justify-center"
        style={{ top: "40%" }}
      >
        <View
          className="absolute rounded-full"
          style={{
            width: 650,
            height: 650,
            backgroundColor: "#8DBED8",
            top: "40%",
          }}
        ></View>
        <View className="absolute top-20 z-20 w-full items-center px-10">
          {/* <View className="flex-row justify-center px-10"> */}
          <Text
            style={{
              fontSize: 26,
              color: "#FFFFFF",
              fontFamily: "Kodchasan",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            As Calm as a Storm
          </Text>
          {/* </View> */}
          {/* <View className="flex-row justify-center px-10"> */}
          <Text
            className="my-2 text-center text-base"
            style={{ color: "#FFFFFF" }}
          >
            You have completed your first 10 Thought Challanges. David Burns
            would be proud! Can you make it to 20?
          </Text>
          {/* </View> */}
        </View>
      </View>
    </View>
  );
};

export default RecentAchievements;

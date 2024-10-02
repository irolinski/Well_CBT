import React from "react";
import { View } from "react-native";
import ToolNav from "@/components/ToolNav";
import Frame from "@/components/Frame";
import { ScrollView } from "react-native";

const Page_finish = () => {
  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={4} numOfAllPages={5} />
        <Frame>
          <View className="py-10"></View>
        </Frame>
      </ScrollView>
    </React.Fragment>
  );
};

export default Page_finish;

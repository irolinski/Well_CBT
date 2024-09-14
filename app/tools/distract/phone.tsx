import { View, Text, Button } from "react-native";
import React from "react";
import BackButton from "@/components/BackButton";
import Frame from "@/components/Frame";
import CustomButton from "@/components/CustomButton";

const Phone = () => {
  return (
    <React.Fragment>
      <BackButton />
      <Frame>
        <View className="my-4 mx-8">
          <Text className="text-2xl font-bold text-center">
            Phone to a trusted person
          </Text>
          <View className="my-16 justify-center mx-8 ">
            {/* <Text className="text-lg font-bold">Header</Text> */}
            {/* <Text className="text-sm my-12">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
              pariatur perferendis inventore porro quasi quidem dignissimos eos
              velit fugiat at quibusdam perspiciatis, dicta qui asperiores
              sapiente deleniti harum, distinctio ea.
            </Text> */}
          </View>
        </View>
      </Frame>
      <CustomButton
        containerStyles="bottom-8 mx-auto"
        title="Start"
        onPress={() => router.navigate("./page_1")}
      />
    </React.Fragment>
  );
};

export default Phone;

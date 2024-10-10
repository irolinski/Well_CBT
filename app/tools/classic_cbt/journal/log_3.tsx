import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import CDATextInput from "@/components/tools/CDATextInput";
import { AppDispatch, RootState } from "@/state/store";
import { setNote } from "@/state/features/tools/journalSlice";
import { Dimensions } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

const Log_3 = () => {
  //   const windowHeight = Dimensions.get("window").height;
  const emotionsState = useSelector(
    (state: RootState) => state.journal.emotions,
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={3} numOfAllPages={6} />
        <Frame>
          <View className="h-full">
            <View className="py-12">
              <ToolHeader noIndent={true}>
                How strong are the emotions you are feeling?
              </ToolHeader>
              <View className="my-6">
                <Text className="text-xs">
                  Use the sliding meters to assess the intensity of the emotions
                  you have chosen.
                </Text>
                <View className="mx-6 mt-2">
                  {emotionsState.map((e, index) => (
                    <View className="mt-8" key={index}>
                      <Text
                        className="mx-4 mb-1.5"
                        style={{ color: "#757575" }}
                      >
                        {e.name}
                      </Text>
                      <Slider
                        animateTransitions
                        trackClickable
                        minimumValue={0} // 0.1 causes a visual glitch
                        maximumValue={0.6}
                        renderThumbComponent={() => (
                          <View
                            style={{
                              width: 18,
                              height: 18,
                              padding: 15,
                              zIndex: 0,
                              justifyContent: "center",
                              backgroundColor: "white",
                              borderRadius: 50,
                            }}
                          >
                            <Text
                              className="absolute z-20 translate-x-2.5 text-center"
                              style={{ color: "#757575" }}
                            >
                              6
                            </Text>
                          </View>
                        )}
                        minimumTrackTintColor={e.color}
                        maximumTrackTintColor="#F5F5F5"
                        thumbTintColor="#F5F5F5"
                        thumbStyle={{
                          // padding: 10,
                          padding: 25,
                          borderRadius: 50,
                          borderColor: "black",
                          borderWidth: 0.5,
                          borderStyle: "solid",
                        }}
                        trackStyle={{
                          paddingTop: 10,
                          // marginLeft: 20,
                          borderRadius: 50,
                          borderColor: "#D9D9D9",
                          borderStyle: "solid",
                          borderWidth: 1,
                        }}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Frame>
        <AdvanceButton
          className="mx-6 my-4 justify-center"
          title="Next"
          onPress={() => router.navigate("./log_4")}
          // style={{ bottom: windowHeight / 20 }}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default Log_3;

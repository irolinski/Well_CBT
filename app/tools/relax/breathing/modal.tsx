import { Dimensions, Modal, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Text from "@/components/global/Text";
import RadioButton from "@/components/RadioButton";
import MethodInfo from "@/components/tools/breathe/MethodInfo";
import {
  mode_4_7_8,
  mode_box_4s,
  setMode,
  setNumOfSets,
  toggleCountdown,
  toggleModal,
} from "@/state/features/tools/breatheSettingsSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";

const BreatheModal = ({ ellapsedTime }: { ellapsedTime: number }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const dispatch = useDispatch<AppDispatch>();
  const breatheSettings = useSelector(
    (state: RootState) => state.breatheSettings,
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={breatheSettings.showModal}
      className="flex-1"
    >
      <ScrollView
        onScroll={(evt) => {
          evt.nativeEvent.contentOffset.y < -175 &&
            dispatch(toggleModal(false));
        }}
      >
        <View
          className={`px-4 ${windowHeight > 850 ? "py-20" : "py-12"}`}
          style={{
            top: 0,
            width: windowWidth,
            backgroundColor: "#FBFBFB",
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(toggleModal(false));
            }}
          >
            <View className="items-center pb-6">
              <View>
                <Feather name="chevron-down" size={24} color="black" />
              </View>
            </View>
          </Pressable>
          <View className="items-center">
            <Text className="text-xl" style={{ color: "#B8B8B8" }}>
              Settings
            </Text>
          </View>
          <View className="my-8">
            <View
              className="border-b pb-4 pt-2"
              style={{ borderColor: "#B8B8B8" }}
            >
              <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                Breathing mode
              </Text>
              <View className="m-4 flex-row justify-around">
                <Pressable
                  onPress={() => {
                    dispatch(setMode(mode_box_4s));
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="-translate-y-2">
                      <RadioButton
                        checkedColor={"#B8B8B8"} //"#8DBED8"
                        isActive={breatheSettings.mode.name === "box"}
                      />
                    </View>
                    <View className="items-center">
                      <View className="m-2 h-16 w-16 rounded-xl border"></View>
                      <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                        Box
                      </Text>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  className="-translate-x-5" // to make the image box centered, not the whole View
                  onPress={() => {
                    dispatch(setMode(mode_4_7_8));
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="-translate-y-2">
                      <RadioButton
                        checkedColor={"#B8B8B8"} //"#8DBED8"
                        isActive={breatheSettings.mode.name === "4-7-8"}
                      />
                    </View>
                    <View className="items-center">
                      <View className="m-2 h-16 w-16 rounded-xl border"></View>
                      <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                        4-7-8
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
              {/* Here add mode settings, if needed */}
            </View>
            <View className="border-b py-3" style={{ borderColor: "#B8B8B8" }}>
              <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                Method
              </Text>
              <View className="mt-4">
                <MethodInfo />
              </View>
            </View>
            <View className="border-b py-3" style={{ borderColor: "#B8B8B8" }}>
              <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                Customize
              </Text>
              <View className="m-4 flex-row py-4">
                <Pressable
                  onPress={() => {
                    dispatch(toggleCountdown());
                  }}
                >
                  <View className="flex-row items-center">
                    <View
                      className="mx-2 h-6 w-6 rounded-lg border"
                      style={{
                        borderColor: "#B8B8B8",
                        backgroundColor: breatheSettings.showCountdown
                          ? "#8DBED8"
                          : "transparent",
                      }}
                    >
                      {breatheSettings.showCountdown && (
                        <View className="mx-auto">
                          <Feather name="check" size={22} color="#F7F7F7" />
                        </View>
                      )}
                    </View>
                    <Text
                      className="text-center text-base"
                      style={{ color: "#757575" }}
                    >
                      Count-in before start
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
            <View className="py-3" style={{ borderColor: "#B8B8B8" }}>
              <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                Duration
              </Text>
              <View className="my-4">
                <View className="mx-10 mt-4">
                  <Slider
                    minimumTrackStyle={{ backgroundColor: "#D9D9D9" }}
                    trackStyle={{
                      backgroundColor: "#D9D9D9",
                      height: 1,
                    }}
                    thumbStyle={{ backgroundColor: "#8DBED8" }}
                    minimumValue={0}
                    maximumValue={0.4}
                    value={(breatheSettings.numOfSets - 1) / 10}
                    onValueChange={(evt) =>
                      dispatch(setNumOfSets(Math.floor(Number(evt) * 10 + 1)))
                    }
                  />
                  <View className="flex-row justify-between">
                    <Text className="text-base" style={{ color: "#B8B8B8" }}>
                      {breatheSettings.numOfSets} sets
                    </Text>
                    <Text className="text-base" style={{ color: "#B8B8B8" }}>
                      ({(ellapsedTime - (ellapsedTime % 60)) / 60}m{" "}
                      {ellapsedTime % 60}
                      s)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default BreatheModal;

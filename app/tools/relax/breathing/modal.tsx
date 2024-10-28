import Text from "@/components/global/Text";
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
import { Dimensions, Modal, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const BreatheModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const breatheSettings = useSelector(
    (state: RootState) => state.breatheSettings,
  );

  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  let ellapsedTime =
    5 *
    breatheSettings.numOfSets *
    (breatheSettings.mode.holdTime +
      breatheSettings.mode.breatheInTime +
      breatheSettings.mode.breatheOutTime);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={breatheSettings.showModal}
    >
      <View
        style={{
          top: windowHeight / 5,
          width: windowWidth,
          height: windowHeight / 1.1,
          backgroundColor: "grey",
          padding: 24,
        }}
      >
        <Pressable
          className="absolute right-0"
          onPress={() => {
            dispatch(toggleModal());

            // setCounterVal(breatheInTime);
          }}
        >
          <View>
            <Feather name="x" size={24} color="black" />
          </View>
        </Pressable>
        <View className="m-8 mx-auto">
          <Text>Settings:</Text>
          <View className="flex-row">
            <View className="mx-6 flex-row">
              <Pressable
                onPress={() => {
                  dispatch(setMode(mode_box_4s));
                }}
              >
                <View
                  className="h-10 w-10 rounded-lg border"
                  style={{ borderColor: "white" }}
                >
                  {breatheSettings.mode.name === "box" && (
                    <View className="mx-auto">
                      <Feather name="check" size={22} color="#F7F7F7" />
                    </View>
                  )}
                </View>
              </Pressable>
              <Text>Box breathing</Text>
            </View>
            <View className="mx-6 flex-row">
              <Pressable
                onPress={() => {
                  dispatch(setMode(mode_4_7_8));
                }}
              >
                <View
                  className="h-10 w-10 rounded-lg border"
                  style={{ borderColor: "white" }}
                >
                  {breatheSettings.mode.name === "4-7-8" && (
                    <View className="mx-auto">
                      <Feather name="check" size={22} color="#F7F7F7" />
                    </View>
                  )}
                </View>
              </Pressable>
              <Text>4-7-8</Text>
            </View>
          </View>
          {breatheSettings.mode.name === "box" && (
            <View className="mx-8 flex-row">
              <Text>Box breath length(s):</Text>
              <Text>FIll in</Text>
            </View>
          )}
        </View>
        <View className="m-8">
          <Text>Light/dark mode:</Text>
        </View>
        <View className="mx-8 flex-row">
          <Pressable
            onPress={() => {
              console.log(breatheSettings.showCountdown);
              dispatch(toggleCountdown());
            }}
          >
            <View
              className="h-10 w-10 rounded-lg border"
              style={{ borderColor: "white" }}
            >
              {breatheSettings.showCountdown && (
                <View className="mx-auto">
                  <Feather name="check" size={22} color="#F7F7F7" />
                </View>
              )}
            </View>
          </Pressable>
          <Text>Show countdown</Text>
        </View>
        <View className="m-8">
          <Text>Method:</Text>
        </View>
        <View className="m-8">
          <Text>Session time:</Text>
          <View>
            <Slider
              minimumValue={0}
              maximumValue={0.4}
              value={(breatheSettings.numOfSets - 1) / 10}
              onValueChange={(evt) =>
                dispatch(setNumOfSets(Math.floor(Number(evt) * 10 + 1)))
              }
            />
            <Text>
              {breatheSettings.numOfSets} sets (
              {(ellapsedTime - (ellapsedTime % 60)) / 60}m {ellapsedTime % 60}s)
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BreatheModal;

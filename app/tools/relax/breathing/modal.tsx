import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Modal, Platform, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RadioButton from "@/components/global/RadioButton";
import Text from "@/components/global/Text";
import MethodInfo from "@/components/tools/breathe/MethodInfo";
import { breathing_tool } from "@/constants/models/tools";
import { Colors } from "@/constants/styles/colorTheme";
import {
  CLOSE_MODAL_OFFSET_TRESHOLD,
  REFERENCE_SMALL_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/constants/styles/values";
import {
  mode_4_7_8,
  mode_box_4s,
  setMode,
  setNumOfSets,
  toggleCountdown,
  toggleModal,
} from "@/state/features/tools/breatheSettingsSlice";
import { AppDispatch, RootState } from "@/state/store";
import { isPolishFew } from "@/utils/locales";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";

const TOOL_NAME = breathing_tool.name;

const BreatheModal = ({ ellapsedTime }: { ellapsedTime: number }) => {
  const { t } = useTranslation(["tools", "common"]);

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
          if (Platform.OS === "ios") {
            evt.nativeEvent.contentOffset.y < CLOSE_MODAL_OFFSET_TRESHOLD &&
              dispatch(toggleModal(false));
          }
        }}
      >
        <View
          style={{
            paddingTop:
              Platform.OS === "ios" &&
              SCREEN_HEIGHT > REFERENCE_SMALL_DEVICE_HEIGHT
                ? 80
                : 48,
            paddingBottom: 48,
            paddingHorizontal: 16,
            top: 0,
            width: SCREEN_WIDTH,
            backgroundColor: Colors.offWhite,
          }}
        >
          <Pressable
            className="top-0"
            onPress={() => {
              dispatch(toggleModal(false));
            }}
          >
            {Platform.OS === "ios" ? (
              <View className="items-center pb-6">
                <View>
                  <Feather
                    name="chevron-down"
                    size={24}
                    color={Colors.blackPearl}
                  />
                </View>
              </View>
            ) : (
              <View className="items-start px-8 pb-6">
                <View>
                  <MaterialCommunityIcons
                    name="window-close"
                    size={24}
                    color={Colors.blackPearl}
                  />
                </View>
              </View>
            )}
          </Pressable>
          <View className="items-center">
            <Text className="text-xl" style={{ color: Colors.mainGray }}>
              {t(`tools.${TOOL_NAME}.exercise.settings.settings`)}
            </Text>
          </View>
          <View className="my-8">
            <View
              className="border-b pb-4 pt-2"
              style={{ borderColor: Colors.mainGray }}
            >
              <Text className="text-lg" style={{ color: Colors.mainGray }}>
                {t(`tools.${TOOL_NAME}.exercise.settings.breathing_mode`)}
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
                        checkedColor={Colors.mainGray}
                        isActive={breatheSettings.mode.name === "box"}
                      />
                    </View>
                    <View className="items-center">
                      <Image
                        className="m-2 h-16 w-16 rounded-xl"
                        source={require("@/assets/images/tools/breathe/mode_1.webp")}
                      />
                      <Text
                        className="text-lg"
                        style={{ color: Colors.mainGray }}
                      >
                        {t(`tools.${TOOL_NAME}.exercise.settings.box`)}
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
                        checkedColor={Colors.mainGray} //colors.mainBlue
                        isActive={breatheSettings.mode.name === "4-7-8"}
                      />
                    </View>
                    <View className="items-center">
                      <Image
                        className="m-2 h-16 w-16 rounded-xl"
                        source={require("@/assets/images/tools/breathe/mode_2.webp")}
                      />
                      <Text
                        className="text-lg"
                        style={{ color: Colors.mainGray }}
                      >
                        {t(`tools.${TOOL_NAME}.exercise.settings.4_7_8`)}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
              {/* Here add mode settings, if needed in the future */}
            </View>
            <View
              className="border-b py-3"
              style={{ borderColor: Colors.mainGray }}
            >
              <Text className="text-lg" style={{ color: Colors.mainGray }}>
                {t(`tools.${TOOL_NAME}.exercise.settings.method`)}
              </Text>
              <View className="mt-4">
                <MethodInfo />
              </View>
            </View>
            <View
              className="border-b py-3"
              style={{ borderColor: Colors.mainGray }}
            >
              <Text className="text-lg" style={{ color: Colors.mainGray }}>
                {t(`tools.${TOOL_NAME}.exercise.settings.customize`)}
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
                        borderColor: Colors.mainGray,
                        backgroundColor: breatheSettings.showCountdown
                          ? Colors.mainBlue
                          : "transparent",
                      }}
                    >
                      {breatheSettings.showCountdown && (
                        <View className="mx-auto">
                          <Feather
                            name="check"
                            size={22}
                            color={Colors.whiteSmoke}
                          />
                        </View>
                      )}
                    </View>
                    <Text
                      className="text-center text-base"
                      style={{ color: Colors.darkGray }}
                    >
                      {t(`tools.${TOOL_NAME}.exercise.settings.count_in`)}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
            <View className="py-3" style={{ borderColor: Colors.mainGray }}>
              <Text className="text-lg" style={{ color: Colors.mainGray }}>
                {t(`tools.${TOOL_NAME}.exercise.settings.duration`)}
              </Text>
              <View className="my-4">
                <View className="mx-10 mt-4">
                  <Slider
                    minimumTrackStyle={{ backgroundColor: Colors.lightGray }}
                    trackStyle={{
                      backgroundColor: Colors.lightGray,
                      height: 1,
                    }}
                    thumbStyle={{ backgroundColor: Colors.mainBlue }}
                    minimumValue={0}
                    maximumValue={0.4}
                    value={(breatheSettings.numOfSets - 1) / 10}
                    onValueChange={(evt) =>
                      dispatch(setNumOfSets(Math.floor(Number(evt) * 10 + 1)))
                    }
                  />
                  <View className="flex-row justify-between">
                    <Text
                      className="text-base"
                      style={{ color: Colors.mainGray }}
                    >
                      {t(`tools.${TOOL_NAME}.exercise.settings.set`, {
                        count: breatheSettings.numOfSets,
                        //fix for i18n pl pluralization bug which omits 'few'
                        context: isPolishFew(breatheSettings.numOfSets)
                          ? "few"
                          : "",
                      })}
                    </Text>
                    <Text
                      className="text-base"
                      style={{ color: Colors.mainGray }}
                    >
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

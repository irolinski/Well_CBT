import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  ColorValue,
  Keyboard,
  NativeSyntheticEvent,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useDispatch, useSelector } from "react-redux";
import { groundYourselfImages } from "@/assets/images/tools/ground_yourself";
import ArrowRightButton from "@/components/global/ArrowRightButton";
import FadeInView from "@/components/global/FadeInView";
import Text from "@/components/global/Text";
import TypewriterText from "@/components/global/TypewriterText";
import EnvironmentAdjectiveModal from "@/components/tools/ground_yourself/EnvironmentAdjectiveModal";
import EnvironmentItemsListElement from "@/components/tools/ground_yourself/EnvironmentItemsListElement";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import {
  defaultEnvironmentItem,
  setEnvironmentItemsArr,
} from "@/state/features/tools/groundYourselfSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, FontAwesome } from "@expo/vector-icons";

const FIRST_SLIDE_TIME_MS = 3000;
const MAX_NUM_OF_ITEMS = 4;

export type GroundEnvironmentItemAdjectiveType = {
  name: string;
  color: ColorValue;
};

export type GroundEnvironmentItem = {
  itemName: string;
  itemAdjectives?: GroundEnvironmentItemAdjectiveType[];
};

export type EnvironmentItemsListElementProps = GroundEnvironmentItem & {
  isAvailable: boolean;
  isCurrentlyEdited: boolean;
  onChangeText: (value: string) => void;
  onPressAdd: () => void;
  onConfirm: () => void;
  indexNum: number;
};

const Ground_Environment_Page_3 = ({
  exerciseName,
  objKey,
  onButtonPress,
  exerciseLength,
}: GroundYourselfSlideProps) => {
  const { t } = useTranslation(["tools", "common"]);

  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [currentInstruction, setCurrentInstruction] = useState<
    "instruction_1" | "instruction_2" | "item_list" | null
  >(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const environmentItemsArr = groundYourselfToolState.environmentItemsArr;

  const [textInputIsActive, setElementIsActive] = useState(false);
  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  const refPagerView = useRef<PagerView>(null);
  const nextSlide = () => {
    refPagerView.current!.setPage(currentSlide + 1);
  };
  const liftInstruction_1AnimY = useRef(new Animated.Value(0)).current;

  const liftInstruction_1Anim = (time: number) => {
    return Animated.timing(liftInstruction_1AnimY, {
      toValue: -140,
      duration: time,
      useNativeDriver: true,
    });
  };

  // run slides
  useEffect(() => {
    if (groundYourselfToolState.currentSlide === objKey) {
      setTimeout(() => {
        nextSlide();
        setCurrentInstruction("instruction_1");
      }, FIRST_SLIDE_TIME_MS);
    }
  }, [groundYourselfToolState.currentSlide]);

  useEffect(() => {
    if (currentInstruction === "item_list") {
      liftInstruction_1Anim(750).start();
    }
  }, [currentInstruction]);

  return (
    <GroundYourselfSlideFrame
      exerciseName={exerciseName}
      slideNum={objKey}
      exerciseLenght={exerciseLength}
    >
      <View key={objKey}>
        <PagerView
          scrollEnabled={false}
          className="h-full w-full"
          initialPage={0}
          ref={refPagerView}
          onPageSelected={(
            evt: NativeSyntheticEvent<
              Readonly<{
                position: Double;
              }>
            >,
          ) => {
            setCurrentSlide(evt.nativeEvent.position);
          }}
        >
          {/* blank slide */}
          <View className="h-full w-full items-center justify-start" key="1">
            <View className="w-full">
              <TypewriterText
                text={t("tools.ground_yourself.environment.page_3.header")}
                className="mt-4"
                size={22}
                cursorColor={Colors.mainGray}
                speed="fast"
                isActive={groundYourselfToolState.currentSlide === objKey}
              />
            </View>
            <View
              className="flex-row items-center justify-center"
              style={{
                marginTop: SCREEN_HEIGHT * 0.1,
                marginBottom: SCREEN_HEIGHT * 0.1,
              }}
            >
              <Image
                contentFit="contain"
                source={groundYourselfImages.lamp}
                style={{
                  height: SCREEN_HEIGHT * 0.12,
                  width: SCREEN_HEIGHT * 0.13,
                }}
              />
              <Image
                contentFit="contain"
                source={groundYourselfImages.chair}
                style={{
                  height: SCREEN_HEIGHT * 0.13,
                  width: SCREEN_HEIGHT * 0.13,
                }}
              />
              <Image
                contentFit="contain"
                source={groundYourselfImages.glass}
                style={{
                  height: SCREEN_HEIGHT * 0.1,
                  width: SCREEN_HEIGHT * 0.13,
                }}
              />
            </View>
          </View>
          {/* second slide */}
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.025 }}
            className="items-center"
            key="2"
          >
            <Animated.View>
              <FadeInView
                inputVal={1}
                outputVal={0}
                duration={500}
                isActive={currentInstruction === "item_list"}
              >
                <TypewriterText
                  text={t(
                    "tools.ground_yourself.environment.page_3.instruction_1",
                  )}
                  size={22}
                  cursorColor={Colors.mainGray}
                  speed="fast"
                  delaySeconds={2.5}
                  isActive={currentInstruction === "instruction_1"}
                  onFinish={() => setCurrentInstruction("instruction_2")}
                />
              </FadeInView>
            </Animated.View>
            {/* legend */}
            <Animated.View
              style={{ transform: [{ translateY: liftInstruction_1AnimY }] }}
            >
              <FadeInView
                className="items-start"
                inputVal={0}
                outputVal={1}
                isActive={currentInstruction === "instruction_2"}
                onFinish={() => {
                  setCurrentInstruction("item_list");
                }}
              >
                <View className="mt-8 w-full flex-row justify-between px-6">
                  <View className="flex-row items-center">
                    <View
                      className="mr-4 h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: Colors.mainBlue,
                      }}
                    >
                      <Feather name="plus" size={16} color={Colors.white} />
                    </View>
                    <Text>
                      {t("tools.ground_yourself.environment.page_3.add_item")}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View
                      className="mr-4 h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: Colors.salmonOrange,
                      }}
                    >
                      <FontAwesome
                        name="paint-brush"
                        size={10}
                        color={Colors.white}
                      />
                    </View>
                    <Text>
                      {t(
                        "tools.ground_yourself.environment.page_3.describe_item",
                      )}
                    </Text>
                  </View>
                </View>
              </FadeInView>
              <FadeInView
                duration={2000}
                className="mt-8 w-full"
                inputVal={0}
                outputVal={1}
                isActive={currentInstruction === "item_list"}
              >
                <View className="mb-4 w-full flex-row">
                  <Text className="justify-start text-xl">
                    <Text>
                      {t(
                        "tools.ground_yourself.environment.page_3.things_around_me",
                      )}
                    </Text>
                  </Text>
                </View>
                <View className="px-4">
                  {environmentItemsArr.map((itemObj, indexNum: number) => (
                    <EnvironmentItemsListElement
                      itemName={itemObj.itemName}
                      itemAdjectives={itemObj.itemAdjectives}
                      isAvailable={!textInputIsActive}
                      isCurrentlyEdited={
                        textInputIsActive && indexNum === currentElementIndex
                      }
                      key={indexNum}
                      indexNum={indexNum}
                      onChangeText={(value: string) => {
                        const prev = [...environmentItemsArr];
                        const updatedArr = prev.map((item, i: number) =>
                          i === indexNum ? { ...item, itemName: value } : item,
                        );
                        dispatch(setEnvironmentItemsArr(updatedArr));
                      }}
                      onPressAdd={function (): void {
                        setElementIsActive(true);
                      }}
                      onConfirm={() => {
                        Keyboard.dismiss();
                        if (environmentItemsArr.length < MAX_NUM_OF_ITEMS) {
                          const prev = [...environmentItemsArr];
                          const updatedArr = [...prev, defaultEnvironmentItem];
                          dispatch(setEnvironmentItemsArr(updatedArr));
                        }
                        setElementIsActive(false);
                        setCurrentElementIndex((prev) => prev + 1);
                      }}
                    />
                  ))}
                  <FadeInView
                    className="w-full flex-row justify-center"
                    style={{ top: SCREEN_HEIGHT * 0.05 }}
                  >
                    <ArrowRightButton onPress={() => onButtonPress()} />
                  </FadeInView>
                </View>
              </FadeInView>
            </Animated.View>
          </View>
        </PagerView>
        <EnvironmentAdjectiveModal />
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Environment_Page_3;

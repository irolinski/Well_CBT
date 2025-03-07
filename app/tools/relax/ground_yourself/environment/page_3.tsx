import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Animated, ColorValue, NativeSyntheticEvent, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useSelector } from "react-redux";
import { groundYourselfImages } from "@/assets/images/tools/ground_yourself/ground_yourself";
import ArrowRightButton from "@/components/ArrowRightButton";
import FadeInView from "@/components/FadeInView";
import Text from "@/components/global/Text";
import EnvironmentItemsListElement from "@/components/tools/ground_yourself/EnvironmentItemsListElement";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import TypewriterText from "@/components/TypewriterText";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";

const FIRST_SLIDE_TIME_MS = 2500;
const MAX_NUM_OF_ITEMS = 4;

export type GroundEnvironmentItemAdjectiveType = {
  name: string;
  color: ColorValue;
};

type EnvironmentItem = {
  itemName: string;
  itemAdjectives?: GroundEnvironmentItemAdjectiveType[];
};

export type EnvironmentItemsListElementProps = EnvironmentItem & {
  isAvailable: boolean;
  isCurrentlyEdited: boolean;
  onChangeText: (value: string) => void;
  onPressAdd: () => void;
  onConfirm: () => void;
};

const blankEnvironmentItem = { itemName: "", itemAdjectives: [] };

const Ground_Environment_Page_3 = ({
  exerciseName,
  objKey,
  onButtonPress,
}: GroundYourselfSlideProps) => {
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const [currentInstruction, setCurrentInstruction] = useState<
    "instruction_1" | null
  >(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsAroundMeArr, setItemsAroundMeArr] = useState<EnvironmentItem[]>([
    blankEnvironmentItem,
  ]);
  const [textInputIsActive, setElementIsActive] = useState(false);
  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  const refPagerView = useRef<PagerView>(null);
  const nextSlide = () => {
    refPagerView.current!.setPage(currentSlide + 1);
  };

  const goToFirstSlide = () => {
    refPagerView.current!.setPage(0);
  };

  const rotation = useRef(new Animated.Value(0)).current;

  // run slides
  useEffect(() => {
    if (groundYourselfToolState.currentSlide === objKey) {
      setTimeout(() => {
        setCurrentInstruction("instruction_1");
        nextSlide();
      }, FIRST_SLIDE_TIME_MS);
    }
  }, [groundYourselfToolState.currentSlide]);

  return (
    <GroundYourselfSlideFrame exerciseName={exerciseName}>
      <View key={objKey} style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <TypewriterText
          text="Notice your surroundings"
          size={20}
          cursorColor={Colors.mainGray}
          speed="fast"
          isActive={groundYourselfToolState.currentSlide === objKey}
        />
        <PagerView
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
            <View>
              <TypewriterText
                text="From the things around you, choose 4 (or less). Then, add them to the list below."
                size={18}
                cursorColor={Colors.mainGray}
                speed="fast"
                isActive={groundYourselfToolState.currentSlide === objKey}
              />

              <Text
                className="mt-4 text-center text-lg"
                style={{ color: Colors.mainGray }}
              >
                (Tap + to add an item, then describe it by tapping /)
              </Text>
            </View>
            <View className="mt-8 w-full">
              <View className="mb-4 w-full flex-row">
                <Text className="justify-start text-xl">Things around me:</Text>
              </View>
              <View className="px-4">
                {itemsAroundMeArr.map((itemObj, indexNum: number) => (
                  <EnvironmentItemsListElement
                    itemName={itemObj.itemName}
                    itemAdjectives={itemObj.itemAdjectives}
                    isAvailable={!textInputIsActive}
                    isCurrentlyEdited={
                      textInputIsActive && indexNum === currentElementIndex
                    }
                    key={indexNum}
                    onChangeText={(value: string) => {
                      setItemsAroundMeArr((prev) =>
                        prev.map((item, i) =>
                          i === indexNum ? { ...item, itemName: value } : item,
                        ),
                      );
                    }}
                    onPressAdd={function (): void {
                      setElementIsActive(true);
                      if (itemsAroundMeArr.length < MAX_NUM_OF_ITEMS) {
                        setItemsAroundMeArr((prev) => [
                          ...prev,
                          blankEnvironmentItem,
                        ]);
                      }
                    }}
                    onConfirm={() => {
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
            </View>
          </View>
        </PagerView>
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Environment_Page_3;

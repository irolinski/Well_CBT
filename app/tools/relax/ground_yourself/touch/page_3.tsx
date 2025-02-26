import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useDispatch, useSelector } from "react-redux";
import ColorPicker, { Panel3 } from "reanimated-color-picker";
import { groundYourselfImages } from "@/assets/images/tools/ground_yourself/ground_yourself";
import Text from "@/components/global/Text";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import OneWordTextInput from "@/components/tools/ground_yourself/OneWordTextInput";
import TypewriterText from "@/components/TypewriterText";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { setTouchData } from "@/state/features/tools/groundYourselfSlice";
import { AppDispatch, RootState } from "@/state/store";
import { isValidName } from "@/utils/inputValidations";
import { AntDesign } from "@expo/vector-icons";

const Ground_Touch_Page_3 = ({
  exerciseName,
  objKey,
  onButtonPress,
}: GroundYourselfSlideProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const [activeInput, setActiveInput] = useState<
    "feel" | "texture" | "color" | null
  >(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchData = groundYourselfToolState.touchData;
  const numOfRepeats = groundYourselfToolState.numOfRepeats;

  const refPagerView = useRef<PagerView>(null);

  const handTouchingTextureAnimX = useRef(new Animated.Value(0)).current;
  const handTouchingTextureAnimY = useRef(new Animated.Value(0)).current;

  const animateHandTouchingTexture = () => {
    return Animated.sequence([
      Animated.timing(handTouchingTextureAnimX, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(handTouchingTextureAnimY, {
        toValue: -75,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(handTouchingTextureAnimX, {
        toValue: 10,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(handTouchingTextureAnimY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);
  };

  const nextSlide = () => {
    refPagerView.current!.setPage(currentSlide + 1);
  };

  const goToFirstSlide = () => {
    refPagerView.current!.setPage(0);
  };

  const showHandTextureAnimationAndGoToNextSlide = () => {
    animateHandTouchingTexture().start(() => {
      setActiveInput("texture");
      nextSlide();
    });
  };

  useEffect(() => {
    if (groundYourselfToolState.currentSlide === objKey) {
      setTimeout(() => {
        showHandTextureAnimationAndGoToNextSlide();
      }, 1000);
    }
  }, [groundYourselfToolState.currentSlide]);

  return (
    <GroundYourselfSlideFrame exerciseName={exerciseName}>
      <View key={objKey} style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <TypewriterText
          text="Focus on the surface you're touching right now."
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
            <View>
              <Animated.View>
                <Image
                  contentFit="fill"
                  style={{
                    marginTop: SCREEN_HEIGHT * 0.2,
                    height: 200,
                    width: 220,
                  }}
                  source={groundYourselfImages.texture_2}
                />
              </Animated.View>
              <Animated.View
                className="absolute z-20"
                style={{
                  transform: [
                    { translateX: handTouchingTextureAnimX },
                    { translateY: handTouchingTextureAnimY },
                  ],
                }}
              >
                <Image
                  contentFit="fill"
                  style={{
                    marginTop: SCREEN_HEIGHT * 0.2,
                    height: 200,
                    width: 150,
                  }}
                  source={groundYourselfImages.hand}
                />
              </Animated.View>
            </View>
          </View>
          {/* texture slide */}
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
            className="items-center"
            key="2"
          >
            <TypewriterText
              text="How would you describe its texture?"
              textColor={Colors.darkGray}
              size={20}
              cursorColor={Colors.mainGray}
              speed="fast"
              isActive={activeInput === "texture"}
              showOverflow={true}
            />
            <TypewriterText
              text="(enter an adjective in the field below)"
              textColor={Colors.mainGray}
              size={12}
              speed="fast"
              isActive={activeInput === "texture"}
              showOverflow={true}
              onFinish={() => {
                setActiveInput("texture");
              }}
            />
            <OneWordTextInput
              value={touchData[numOfRepeats].texture ?? ""}
              editable={activeInput === "texture"}
              autoFocus={activeInput === "texture"}
              onChangeText={(value) => {
                if (isValidName(value)) {
                  const newObj = [...touchData];
                  newObj[numOfRepeats] = {
                    ...newObj[numOfRepeats],
                    texture: value,
                  };
                  dispatch(setTouchData(newObj));
                }
              }}
              onPressButton={() => {
                nextSlide();
                setActiveInput("color");
              }}
              textAlign={"center"}
            />
            <Image
              contentFit="fill"
              style={{
                marginTop: SCREEN_HEIGHT * 0.06,
                height: SCREEN_HEIGHT * 0.1,
                width: SCREEN_HEIGHT * 0.1 * 1.3,
              }}
              source={groundYourselfImages.texture_1}
            />
          </View>
          {/* color slide */}
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
            className="items-center"
            key="3"
          >
            <TypewriterText
              text="Can you tell what color is it?"
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={20}
              speed="fast"
              showOverflow={true}
              isActive={activeInput === "color"}
            />
            <TypewriterText
              text="(pick using the color picker below)"
              textColor={Colors.mainGray}
              size={12}
              speed="fast"
              showOverflow={true}
              isActive={activeInput === "color"}
            />
            <View className="mt-8 w-full flex-row items-center justify-between">
              <ColorPicker
                style={{ width: "60%" }}
                value={touchData[numOfRepeats].color ?? Colors.mainBlue}
                onComplete={({ hex }) => {
                  const newObj = [...touchData];
                  newObj[numOfRepeats] = {
                    ...newObj[numOfRepeats],
                    color: hex,
                  };
                  dispatch(setTouchData(newObj));
                }}
              >
                <Panel3 />
              </ColorPicker>
              <View className="mb-1 items-center">
                <Text
                  style={{ color: Colors.darkGray, fontFamily: "Kodchasan" }}
                >
                  Selected Color:
                </Text>
                <View
                  className="mt-3 h-12 w-12 rounded-full"
                  style={{ borderWidth: 2, borderColor: Colors.mainGray }}
                >
                  <View
                    className="h-full w-full rounded-full"
                    style={{
                      backgroundColor: touchData[numOfRepeats].color,
                      borderColor: Colors.offWhite,
                      borderWidth: 1.5,
                    }}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              className="flex-row justify-center"
              onPress={() => {
                setActiveInput("feel");
                nextSlide();
              }}
              style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
            >
              <AntDesign
                name="checkcircleo"
                size={48}
                color={Colors.darkGray}
              />
            </TouchableOpacity>
          </View>
          {/* feel slide */}
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
            className="items-center"
            key="4"
          >
            <TypewriterText
              text="How does it make you feel?"
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={20}
              speed="fast"
              showOverflow={true}
              isActive={activeInput === "feel"}
            />
            <TypewriterText
              text="(enter a feeling or an adjective)"
              textColor={Colors.mainGray}
              size={12}
              speed="fast"
              showOverflow={true}
              isActive={activeInput === "feel"}
            />
            <OneWordTextInput
              value={touchData[numOfRepeats].feel ?? ""}
              editable={activeInput === "feel"}
              autoFocus={activeInput === "feel"}
              onChangeText={(value) => {
                if (isValidName(value)) {
                  const newObj = [...touchData];
                  newObj[numOfRepeats] = {
                    ...newObj[numOfRepeats],
                    feel: value,
                  };
                  dispatch(setTouchData(newObj));
                }
              }}
              onPressButton={() => {
                console.log(touchData);
                goToFirstSlide();
                onButtonPress();
              }}
              textAlign={"center"}
            />
            <Image
              className="h-28 w-32"
              contentFit="fill"
              style={{ marginTop: SCREEN_HEIGHT * 0.05 }}
              source={groundYourselfImages.flower}
            />
          </View>
        </PagerView>
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Touch_Page_3;

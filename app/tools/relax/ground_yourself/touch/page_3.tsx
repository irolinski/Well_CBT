import React, { useRef, useState } from "react";
import { NativeSyntheticEvent, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useSelector } from "react-redux";
import ColorPicker, { Panel3 } from "reanimated-color-picker";
import Text from "@/components/global/Text";
import OneWordTextInput from "@/components/tools/ground_yourself/OneWordTextInput";
import TypewriterText from "@/components/TypewriterText";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { isValidName } from "@/utils/inputValidations";
import { AntDesign } from "@expo/vector-icons";

const Ground_Touch_Page_3 = ({
  objKey,
  onButtonPress,
}: {
  objKey: number;
  onButtonPress: () => void;
}) => {
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const [activeInput, setActiveInput] = useState<
    "feel" | "texture" | "color" | null
  >(null);
  const [feelInput, setFeelInput] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState(Colors.mainBlue);
  const [textureInput, setTextureInput] = useState<string>("");

  const refPagerView = useRef<PagerView>(null);

  const nextSlide = () => {
    refPagerView.current!.setPage(currentSlide + 1);
  };

  return (
    <View key={objKey} style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
      <TypewriterText
        text="Focus on the surface you're touching right now."
        size={20}
        speed="fast"
        isActive={groundYourselfToolState.currentSlide === objKey - 1}
        onFinish={() => {
          setActiveInput("texture");
          nextSlide();
        }}
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
        <View key="1">
          <Text style={{ fontSize: 24, color: "black" }}>First Slide</Text>
        </View>
        {/* texture slide */}
        <View
          style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
          className="items-center"
          key="2"
        >
          <TypewriterText
            text="How would you describe its texture?"
            color={Colors.darkGray}
            size={20}
            speed="fast"
            isActive={activeInput === "texture"}
            showOverflow={true}
          />
          <TypewriterText
            text="(think of an adjective)"
            color={Colors.mainGray}
            size={12}
            speed="fast"
            isActive={activeInput === "texture"}
            showOverflow={true}
            onFinish={() => {
              setActiveInput("texture");
            }}
          />
          <OneWordTextInput
            value={textureInput}
            editable={activeInput === "texture"}
            autoFocus={activeInput === "texture"}
            onChangeText={(value) => {
              if (isValidName(value)) {
                setTextureInput(value);
              }
            }}
            onPressButton={() => {
              nextSlide();
              setActiveInput("color");
            }}
            textAlign={"center"}
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
            color={Colors.darkGray}
            size={20}
            speed="fast"
            showOverflow={true}
            isActive={activeInput === "color"}
          />
          <TypewriterText
            text="(pick using the color picker below)"
            color={Colors.mainGray}
            size={12}
            speed="fast"
            showOverflow={true}
            isActive={activeInput === "color"}
          />
          <View className="mt-8 w-full flex-row items-center justify-between">
            <ColorPicker
              style={{ width: "60%" }}
              value={selectedColor}
              onChange={({ hex }) => {
                setSelectedColor(hex);
              }}
            >
              <Panel3 />
            </ColorPicker>

            <View className="mb-1 items-center">
              <Text style={{ color: Colors.darkGray, fontFamily: "Kodchasan" }}>
                Selected Color:
              </Text>
              <View
                className="mt-3 h-12 w-12 rounded-full"
                style={{ borderWidth: 2, borderColor: Colors.mainGray }}
              >
                <View
                  className="h-full w-full rounded-full"
                  style={{
                    backgroundColor: selectedColor,
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
            <AntDesign name="checkcircleo" size={48} color={Colors.darkGray} />
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
            color={Colors.darkGray}
            size={20}
            speed="fast"
            showOverflow={true}
            isActive={activeInput === "feel"}
          />
          <TypewriterText
            text="(enter a feeling or an adjective)"
            color={Colors.mainGray}
            size={12}
            speed="fast"
            showOverflow={true}
            isActive={activeInput === "feel"}
            onFinish={() => {
              //   nextSlide();
              setActiveInput("feel");
            }}
          />
          <OneWordTextInput
            value={feelInput}
            editable={activeInput === "feel"}
            autoFocus={activeInput === "feel"}
            onChangeText={(value) => {
              if (isValidName(value)) {
                setFeelInput(value);
              }
            }}
            onPressButton={() => {
              onButtonPress();
            }}
            textAlign={"center"}
          />
        </View>
      </PagerView>
    </View>
  );
};

export default Ground_Touch_Page_3;

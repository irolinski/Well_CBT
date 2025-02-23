import React, { useRef, useState } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useSelector } from "react-redux";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import TypewriterText from "@/components/TypewriterText";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { isValidName } from "@/utils/inputValidations";
import { Feather } from "@expo/vector-icons";

const MAX_TEXT_INPUT_LENGTH = 15;

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
  const [activeInput, setActiveInput] = useState<"feel" | "texture" | null>(
    null,
  );
  const [feelInput, setFeelInput] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState(0);
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
          <View className="mt-8 h-24 w-full items-center">
            <View className="relative h-16 flex-row items-center justify-center">
              <TouchableOpacity
                className="absolute right-0 top-3 z-20 pb-8"
                onPress={() => {
                  nextSlide();
                  setActiveInput("feel");
                }}
              >
                <Feather name="check" size={38} color="black" />
              </TouchableOpacity>
              <TextInput
                className="z-10 h-full w-full text-center text-2xl"
                value={textureInput}
                style={{
                  color: "black",
                  borderColor: Colors.lightGray,
                  backgroundColor: Colors.lightGray,
                  textAlignVertical: "center",
                }}
                selectTextOnFocus={true}
                onChangeText={(value) => {
                  if (isValidName(value)) {
                    setTextureInput(value);
                  }
                }}
                editable={activeInput === "texture"}
                multiline={false}
                maxLength={MAX_TEXT_INPUT_LENGTH}
                autoFocus={activeInput === "texture"}
                returnKeyType="done"
                onKeyPress={(evt) => {
                  if (evt.nativeEvent.key == "Enter") {
                    Keyboard.dismiss();
                  }
                }}
                clearButtonMode="never"
                onBlur={() => {
                  Keyboard.dismiss();
                }}
              />
            </View>
            <View className="mb-4 flex-row justify-center">
              <DividerLine width={SCREEN_WIDTH * 0.5} color={Colors.mainGray} />
            </View>
          </View>
        </View>
        {/* feel slide */}

        <View
          style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
          className="items-center"
          key="3"
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
          <View className="mt-8 h-24 w-full items-center">
            <View className="relative h-16 flex-row items-center justify-center">
              <TouchableOpacity
                className="absolute right-0 top-3 z-10 pb-8 pl-8"
                onPress={() => {}}
              >
                <Feather name="check" size={38} color="black" />
              </TouchableOpacity>
              <TextInput
                className="z-10 h-full w-full text-center text-3xl"
                value={feelInput}
                style={{
                  color: "black",
                  borderColor: Colors.lightGray,
                  backgroundColor: Colors.lightGray,
                  textAlignVertical: "center",
                }}
                selectTextOnFocus={true}
                onChangeText={(value) => {
                  if (isValidName(value)) {
                    setFeelInput(value);
                  }
                }}
                editable={activeInput === "feel"}
                multiline={false}
                maxLength={MAX_TEXT_INPUT_LENGTH}
                autoFocus={activeInput === "feel"}
                returnKeyType="done"
                onKeyPress={(evt) => {
                  if (evt.nativeEvent.key == "Enter") {
                    Keyboard.dismiss();
                  }
                }}
                clearButtonMode="never"
                onBlur={() => {
                  Keyboard.dismiss();
                }}
              />
            </View>
            <View className="mb-4 flex-row justify-center">
              <DividerLine width={SCREEN_WIDTH * 0.5} color={Colors.mainGray} />
            </View>
          </View>
        </View>
      </PagerView>
    </View>
  );
};

export default Ground_Touch_Page_3;

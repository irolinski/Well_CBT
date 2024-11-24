import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { DistortionPillTypes } from "@/constants/models/cda_distortionList";

const DistortionPill = ({
  title,
  onPress,
  onLongPress,
  checked,
  highlighted,
  customColor = "#4391BC",
}: DistortionPillTypes) => {
  function forceUpdateOnHighlight() {
    const [value, setValue] = useState(false);
    useEffect(() => {
      if (highlighted)
        setTimeout(() => {
          setValue(!value);
        }, 5);
      // minimal setTimeout to prevent the flickering bug w/ tooltip animation
    }, []);
  }
  forceUpdateOnHighlight();

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} delayLongPress={500}>
      <View
        className={`mx-1 my-1 w-auto rounded-full border-2 p-2`}
        style={{
          borderColor: customColor,
          backgroundColor: checked ? customColor : "#FBFBFB",
        }}
      >
        <Text
          className="text-center text-[12px]"
          style={{ color: checked ? "#F5F5F5" : "#27261F" }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
export default DistortionPill;

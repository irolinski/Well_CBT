import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

type DistortionPillTypes = {
  title: string;
  onPress?: () => void;
  onLongPress?: () => void;
  checked: boolean;
  highlighted: boolean;
};

const DistortionPill = ({
  title,
  onPress,
  onLongPress,
  checked,
  highlighted,
}: DistortionPillTypes) => {
  function forceUpdateOnHighlight() {
    const [value, setValue] = useState(false);
    useEffect(() => {
      if (highlighted)
        setTimeout(() => {
          setValue(!value);
        }, 5);
      // minimal setTimeout to prevent the flickering bug
    }, []);
  }
  forceUpdateOnHighlight();

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} delayLongPress={500}>
      <View
        className={`mx-1 my-1 w-auto rounded-full border-2 p-2`}
        style={{
          borderColor: "#4391BC",
          backgroundColor: checked ? "#4391BC" : "#FBFBFB",
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

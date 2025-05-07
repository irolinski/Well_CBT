import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { DistortionPillTypes } from '@/constants/models/tools/cda_distortionList';
import { Colors } from '@/constants/styles/colorTheme';

const DistortionPill = ({
  title,
  onPress,
  onLongPress,
  checked,
  highlighted,
  customColor = Colors.darkBlue,
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

  //opacity animation
  const opacity = useRef(new Animated.Value(highlighted ? 0.5 : 1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: highlighted ? 0.5 : 1,
      duration: 300, // Duration in ms
      useNativeDriver: true,
    }).start();
  }, [highlighted]);

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} delayLongPress={500}>
      <Animated.View className="z-40" style={{ opacity }}>
        <View
          className={`mx-1 my-1 w-auto rounded-full border-2 p-2`}
          style={{
            borderColor: customColor,
            backgroundColor: checked ? customColor : Colors.offWhite,
          }}
        >
          <Text
            className="text-center text-[12px]"
            style={{ color: checked ? Colors.white : Colors.offBlack }}
          >
            {title}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};
export default DistortionPill;

import { View, Text, Pressable } from "react-native";

const DistortionTag = ({
  title,
  onPress,
  checked,
}: {
  title: string;
  onPress?: () => void;
  checked: boolean;
}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        className={`mx-1 my-1 w-auto  rounded-full p-2`}
        style={{ backgroundColor: checked ? "#8DBED8" : "#4391BC" }}
      >
        <Text
          className="text-[12px] text-center text-white"
          style={{ color: checked ? "#F5F5F5" : "#F0F5F8" }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
export default DistortionTag;

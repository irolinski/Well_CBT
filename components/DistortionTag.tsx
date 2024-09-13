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
        className={`mx-[1px] my-[2px] w-auto border rounded-lg p-1 ${
          checked && "bg-blue-500"
        }`}
      >
        <Text className="text-[12px] text-center">{title}</Text>
      </View>
    </Pressable>
  );
};
export default DistortionTag;

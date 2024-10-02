import { Pressable, Text, View } from 'react-native';

const DistortionPill = ({
  title,
  onPress,
  onLongPress,
  checked,
}: {
  title: string;
  onPress?: () => void;
  onLongPress?: () => void;
  checked: boolean;
}) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={2000}
    >
      <View
        className={`mx-1 my-1 w-auto  rounded-full p-2 border-2`}
        style={{
          borderColor: "#4391BC",
          backgroundColor: checked ? "#4391BC" : "transparent",
        }}
      >
        <Text
          className="text-[12px] text-center text-white"
          style={{ color: checked ? "#F5F5F5" : "#27261F" }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
export default DistortionPill;

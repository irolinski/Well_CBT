import { Href, router } from 'expo-router';
import { ColorValue, Dimensions, Pressable, TouchableOpacity, View } from 'react-native';
import Text from '@/components/global/Text';
import { Colors } from '@/constants/styles/colorTheme';
import { Feather } from '@expo/vector-icons';

export type LearnCategoryCardTypes = {
  name: string;
  backgroundColor: ColorValue;
  link: string;
};

const LearnCategoryCard = ({
  name,
  backgroundColor,
  link,
}: LearnCategoryCardTypes) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;

  return (
    <Pressable
      className="m-2.5 rounded-xl"
      style={{
        height: 0.4 * SCREEN_WIDTH,
        width: 0.4 * SCREEN_WIDTH,
        backgroundColor: backgroundColor,
      }}
      onPress={() => router.push(`${link}` as Href)}
    >
      <View className="h-1/2 items-center justify-center pt-6">
        <Text style={{ color: Colors.white }}>{name}</Text>
      </View>
      <View className="h-1/2 items-center justify-center">
        <TouchableOpacity
          className="mx-1 items-center justify-center rounded-xl"
          style={{ width: 100, height: 45, backgroundColor: Colors.offWhite }}
          onPress={() => router.push(`${link}` as Href)}
        >
          <View>
            <Feather name="arrow-right" size={24} color={Colors.darkGray} />
          </View>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};
export default LearnCategoryCard;

import { Image } from 'expo-image';
import { Dimensions, Text, View } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';

const SCREEN_WIDTH = Dimensions.get("window").width;

const ArticleImage = ({
  image,
  subtitle,
}: {
  image: Image;
  subtitle: string;
}) => {
  return (
    <View className="my-6 items-center">
      <View style={{ width: SCREEN_WIDTH * 0.8, height: 240 }}>
        <Image
          className="rounded-lg"
          style={{ width: "100%", height: "100%" }}
          source={image}
        />
        <View className="flex-row justify-end">
          <Text className="m-2 italic" style={{ color: Colors.mainGray }}>
            {subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default ArticleImage;

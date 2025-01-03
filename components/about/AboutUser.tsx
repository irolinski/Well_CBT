import { Dimensions, View } from "react-native";
import Text from "../global/Text";
import ProfilePic from "@/components/ProfilePic";

const AboutUser = () => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View
      className="h-40 flex-1 rounded-3xl"
      style={{
        width: windowWidth * 0.9,
        height: windowWidth * 0.9 * 0.94,
        // backgroundColor: "#F5F5F5",
        // borderColor: "#B8B8B8",
      }}
    >
      <View style={{ marginTop: windowWidth * 0.05 }}>
        <ProfilePic pictureURI="" location="about" nonSpinnable />
      </View>
      <View>
        <View className="my-4">
          <View className="flex-row justify-center relative">
            <Text className="text-2xl">Anna Nowak</Text>
          </View>
          <View className="my-4 items-center">
            <Text
              className="text-base"
              style={{ color: "#757575", fontWeight: 500 }}
            >
              Last visit: today
            </Text>
            <Text
              className="my-2 text-center text-base"
              style={{ color: "#757575", width: windowWidth * 0.25 }}
            >
              Completed activities: 56
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AboutUser;

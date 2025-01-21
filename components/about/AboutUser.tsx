import { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "@/components/ProfilePic";
import { fetchUserData, UserType } from "@/db/user";
import { setShowUserSettingsModal } from "@/state/features/menus/userSettingsModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { formatDateToMonthAndDay, returnDaysAgoString } from "@/utils/dates";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "../global/Text";

const AboutUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userSettingsModalState = useSelector(
    (state: RootState) => state.userSettingsModal,
  );
  const windowWidth = Dimensions.get("window").width;
  const [userData, setUserData] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchUserData().then((res) => {
        let fetchedData = res as UserType;
        setUserData(fetchedData);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const name = userData && userData.name.length > 0 ? userData.name : "Hi!";

  const lastVisit =
    userData?.lastVisit &&
    returnDaysAgoString(
      userData.lastVisit,
      14,
      formatDateToMonthAndDay(userData.lastVisit),
    );

  const completedActivities = userData && userData.numOfAllEntries;

  return (
    <View
      className="h-40 flex-1 rounded-3xl"
      style={{
        width: windowWidth * 0.9,
        height: windowWidth * 0.9 * 0.94,
      }}
    >
      <View style={{ marginTop: windowWidth * 0.05 }}>
        <ProfilePic pictureURI="" location="about" nonSpinnable />
      </View>
      <View>
        <View className="mt-4">
          {/* padding top to make edit "button" hitbox larger */}
          <TouchableOpacity
            className="mb-2 flex-row justify-center pt-4"
            onPress={() => {
              dispatch(setShowUserSettingsModal(true));
            }}
          >
            <View className="relative flex-row items-center px-8">
              <Text className="text-center text-2xl">{name}</Text>
              <View className="absolute right-0 top-0 -translate-y-4 flex-row">
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color="#B8B8B8"
                />
              </View>
            </View>
          </TouchableOpacity>

          <View className="my-4 items-center">
            <Text className="text-base" style={{ color: "#757575" }}>
              <Text style={{ fontWeight: 500 }}>Last visit: </Text>
              <Text>{lastVisit && lastVisit}</Text>
            </Text>
            <Text
              className="my-2 text-center text-base"
              style={{ color: "#757575", width: windowWidth * 0.25 }}
            >
              Completed activities: {completedActivities}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AboutUser;

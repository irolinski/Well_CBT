import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { allFaces } from '@/assets/images/global/faces/faces';
import ProfilePic from '@/components/about/ProfilePic';
import { Colors } from '@/constants/styles/colorTheme';
import { fetchUserData, UserType } from '@/db/user';
import { setShowNavigateSettingsModal } from '@/state/features/menus/navigateSettingsModalSlice';
import { AppDispatch, RootState } from '@/state/store';
import { getLastVisitString } from '@/utils/dates';
import { Feather } from '@expo/vector-icons';
import Text from '../global/Text';

const AboutUser = () => {
  const { t } = useTranslation(["about", "common"]);

  const dispatch = useDispatch<AppDispatch>();
  const editProfileModalState = useSelector(
    (state: RootState) => state.editProfileModal,
  );
  const windowWidth = Dimensions.get("window").width;
  const [userData, setUserData] = useState<UserType>();
  const [profilePic, setProfilePic] = useState<Image>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchUserData().then((res) => {
        let fetchedData = res as UserType;
        setUserData(fetchedData);
        const profilePic =
          allFaces.find((el) => el.id === fetchedData.profilePicId)?.image ??
          allFaces[0].image;

        setProfilePic(profilePic);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [editProfileModalState]);

  const userName =
    userData && userData.name.length > 0 ? userData.name : "Your profile";
  const lastVisitString = getLastVisitString(userData?.lastVisit);
  const completedActivities = userData && userData.numOfAllEntries;

  return (
    <View
      className="h-40 flex-1 rounded-3xl"
      style={{
        width: windowWidth * 0.9,
        height: windowWidth * 0.9 * 0.94,
      }}
    >
      <View className="flex-row justify-center">
        <ProfilePic
          image={profilePic ? profilePic : allFaces[0].image}
          handlePress={() => dispatch(setShowNavigateSettingsModal(true))}
          buttonIcon={
            <Feather name="settings" size={24} color={Colors.white} />
          }
        />
      </View>
      <View>
        <View className="mt-4">
          {/* padding top to make edit "button" hitbox larger */}
          <View className="mb-2 flex-row justify-center pt-4">
            <View className="relative flex-row items-center px-8">
              <Text className="text-center text-2xl">{userName}</Text>
            </View>
          </View>

          <View className="my-4 items-center">
            <Text className="text-base" style={{ color: Colors.darkGray }}>
              <Text style={{ fontWeight: 500 }}> {t(`index.last_visit`)}</Text>
              <Text>{lastVisitString && lastVisitString}</Text>
            </Text>
            <Text
              className="my-2 text-center text-base"
              style={{ color: Colors.darkGray, width: windowWidth * 0.25 }}
            >
              {t(`index.completed_activities`)}
              {completedActivities}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AboutUser;

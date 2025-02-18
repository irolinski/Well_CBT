import { Href, router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '@/components/BackButton';
import DividerLine from '@/components/DividerLine';
import Text from '@/components/global/Text';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT } from '@/constants/styles/values';
import { FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const index = () => {
  const preferencesObj = {
    title: "Preferences",
    items: [
      {
        title: "Language Settings",
        icon: <FontAwesome5 name="smile" size={40} color="black" />,
        link: "/about/settings/preferences/language",
      },
      {
        title: "Storage",
        icon: (
          <FontAwesome6
            name="arrows-spin"
            size={40}
            color={Colors.blackPearl}
          />
        ),
        link: "/about/settings/preferences/storage",
      },
    ],
  };

  const moreObj = {
    title: "More",
    items: [
      {
        title: "Report a Bug",
        icon: (
          <FontAwesome6
            name="arrows-spin"
            size={40}
            color={Colors.blackPearl}
          />
        ),
        link: "/about/settings/more/report_a_bug",
      },
    ],
  };

  const settingsData = [preferencesObj, moreObj];

  return (
    <ScrollView>
      {/* Nav */}
      <View
        className={`z-10 w-full border-b`}
        style={{
          borderColor: Colors.lightGray,
          backgroundColor: Colors.mainBlue,
          paddingTop: SCREEN_HEIGHT * 0.065,
          paddingBottom: 16,
        }}
      >
        <View className="z-10 w-full flex-row items-center justify-between px-6">
          <View>
            <BackButton color={Colors.offWhite} />
          </View>
          <View className="flex-row justify-end">
            <Text
              className={`text-left text-2xl`}
              style={{
                fontFamily: "KodchasanMedium",
                color: Colors.whiteSmoke,
              }}
            >
              Settings
            </Text>
          </View>
        </View>
      </View>
      {/* /Nav */}

      <View className="m-4">
        <View className="mt-4">
          {settingsData.map((segment, indexNum: number) => (
            <View className="mb-12" key={indexNum}>
              <Text
                className="mb-4 mt-2 text-left"
                style={{
                  color: Colors.offBlack,
                  fontSize: 26,
                  fontWeight: 600,
                }}
              >
                {segment.title}
              </Text>
              <View className="w-full pl-4 pr-6">
                {segment.items.map((item, indexNum: number) => (
                  <React.Fragment key={indexNum}>
                    <View className="relative">
                      {indexNum !== 0 && (
                        <View className="absolute left-0">
                          <DividerLine
                            width={"95%"}
                            color={Colors.mainGray}
                            weight={0.6}
                          />
                        </View>
                      )}
                    </View>
                    <TouchableOpacity
                      className="mr-4 flex-row py-6"
                      key={indexNum}
                      onPress={() => router.push(`${item.link}` as Href)}
                    >
                      <View className="w-full flex-row">
                        <View className="ml-3 w-1/5">{item.icon}</View>
                        <View className="w-4/5 justify-center">
                          <Text className="ml-2" style={{ fontSize: 22 }}>
                            {item.title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </React.Fragment>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default index;

import * as Device from "expo-device";
import { Href, router } from "expo-router";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Linking, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DividerLine from "@/components/global/DividerLine";
import MenuNav from "@/components/global/MenuNav";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

type SettingsItem = {
  title: string;
  icon: ReactNode;
  link?: string;
  url?: string;
};
type SettingsCategory = { title: string; items: SettingsItem[] };

const reportBugQueryParams = new URLSearchParams({
  brand: Device.brand || "",
  modelName: Device.modelName || "",
  manufacturer: Device.manufacturer || "",
  osName: Device.osName || "",
  osVersion: Device.osVersion || "",
});

const reportBugLink = `https://worryfree.app/report-bug?${reportBugQueryParams.toString()}`;

const index = () => {
  const { t } = useTranslation(["about", "common"]);

  const preferencesObj: SettingsCategory = {
    title: t(`settings.categories.preferences`),
    items: [
      {
        title: t(`settings.storage.title`),
        icon: <MaterialIcons name="save" size={40} color={Colors.offBlack} />,
        link: "/about/settings/preferences/storage",
      },
    ],
  };

  const moreObj: SettingsCategory = {
    title: t(`settings.categories.more`),
    items: [
      {
        title: t("settings.report_a_bug.title"),
        icon: (
          <FontAwesome6
            name="arrows-spin"
            size={40}
            color={Colors.blackPearl}
          />
        ),
        url: reportBugLink,
      },
    ],
  };

  const settingsData = [preferencesObj, moreObj];

  return (
    <ScrollView>
      <MenuNav name={t(`settings.title`)} />
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
                      onPress={() => {
                        item.link
                          ? router.push(`${item.link}` as Href)
                          : item.url && Linking.openURL(item.url);
                      }}
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

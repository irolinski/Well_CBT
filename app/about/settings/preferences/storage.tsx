import { reloadAppAsync } from "expo";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, View } from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import DividerLine from "@/components/DividerLine";
import MenuNav from "@/components/global/MenuNav";
import Text from "@/components/global/Text";
import { SCREEN_WIDTH } from "@/constants/styles/values";
import { deleteAllDBData } from "@/db/service";
import { MaterialIcons } from "@expo/vector-icons";

const SETTING_NAME = "storage";

const StorageSettingsPage = () => {
  const { t } = useTranslation(["about", "common"]);
  const handlePressDeleteAllData = () => {
    Alert.alert(
      t(`settings.${SETTING_NAME}.remove_all_alert.header`),
      t(`settings.${SETTING_NAME}.remove_all_alert.body`),
      [
        {
          text: t(`settings.${SETTING_NAME}.remove_all_alert.yes`),
          onPress: () => {
            deleteAllDBData();
            reloadAppAsync();
          },
        },
        {
          text: t(`settings.${SETTING_NAME}.remove_all_alert.no`),

          onPress: () => {
            router.back();
          },
          style: "cancel",
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <ScrollView scrollEnabled={false}>
      <MenuNav name={t(`settings.${SETTING_NAME}.title`)} />
      <View className="m-4">
        <View className="mt-10">
          <Text className="text-xl">
            {t(`settings.${SETTING_NAME}.remove_all_data`)}
          </Text>
          <View className="mt-4">
            <View className="mx-4 mb-10">
              <Text
                className="mb-2 mt-4 text-center text-xl"
                style={{ color: "#D15C5C" }}
              >
                {t(`alerts.warning`, { ns: "common" })}!
              </Text>
              <Text className="mx-2">
                {t(`settings.${SETTING_NAME}.warning_message`)}
              </Text>
              <View className="mt-10">
                <DividerLine width={0.4 * SCREEN_WIDTH} />
              </View>
            </View>
            <AdvanceButton
              title={t(`settings.${SETTING_NAME}.remove_all_data`)}
              onPress={() => {
                handlePressDeleteAllData();
              }}
              btnStyle={{ backgroundColor: "#D15C5C" }}
              icon={
                <MaterialIcons name="delete-forever" size={24} color="white" />
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StorageSettingsPage;

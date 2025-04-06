import { reloadAppAsync } from "expo";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Switch, View } from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import DividerLine from "@/components/DividerLine";
import MenuNav from "@/components/global/MenuNav";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";
import { deleteAllDBData } from "@/db/service";
import {
  getUserSettingsData,
  handleSetExerciseAutoSaveIsActive,
  UserSettingsDataObj,
} from "@/db/settings";
import { MaterialIcons } from "@expo/vector-icons";

const SETTING_NAME = "storage";

const StorageSettingsPage = () => {
  const { t } = useTranslation(["about", "common"]);

  const [settingsData, setSettingsData] = useState<UserSettingsDataObj>();
  const [enableExerciseAutoSave, setEnableExerciseAutoSave] =
    useState<boolean>(false);

  const handleSaveSettings = async () => {
    await handleSetExerciseAutoSaveIsActive(enableExerciseAutoSave);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: UserSettingsDataObj =
          (await getUserSettingsData()) as UserSettingsDataObj;
        if (res) {
          setSettingsData(res);
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
        Alert.alert(t("alerts.error_db_fetching"));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadSavedSettings = () => {
      if (settingsData) {
        setEnableExerciseAutoSave(
          Boolean(settingsData.exerciseAutoSaveIsActive),
        );
      }
    };
    loadSavedSettings();
  }, [settingsData]);

  return (
    <ScrollView>
      <MenuNav
        name={t(`settings.${SETTING_NAME}.title`)}
        handleBackButtonPress={async () => {
          await handleSaveSettings();
        }}
      />
      <View className="m-4">
        {/* Auto-save exercises */}
        <View className="mb-10 mt-10">
          <Text className="text-xl">
            {t(`settings.${SETTING_NAME}.exercises`)}
          </Text>
          <View className="mx-8 my-2 flex-row items-center justify-center py-4">
            <Text className="mx-2 text-lg">
              {t(`settings.${SETTING_NAME}.auto_save_exercises`)}
            </Text>
            <Switch
              className="mx-2"
              value={enableExerciseAutoSave}
              onValueChange={(val) => setEnableExerciseAutoSave(val)}
              ios_backgroundColor={Colors.lightGray}
              trackColor={{
                false: Colors.lightGray,
                true: Colors.darkBlue,
              }}
            />
          </View>
        </View>
        <DividerLine width={SCREEN_WIDTH * 0.5} />
        {/* Delete all data */}
        <View className="mt-10">
          <Text className="text-xl">
            {t(`settings.${SETTING_NAME}.remove_all_data`)}
          </Text>
          <View className="mt-4">
            <View className="mx-4 mb-10">
              <Text
                className="mb-2 mt-4 text-center text-xl"
                style={{ color: Colors.red }}
              >
                {t(`alerts.warning`, { ns: "common" })}!
              </Text>
              <Text className="mx-2 text-center">
                {t(`settings.${SETTING_NAME}.warning_message`)}
              </Text>
            </View>
            <AdvanceButton
              title={t(`settings.${SETTING_NAME}.remove_all_data`)}
              onPress={() => {
                handlePressDeleteAllData();
              }}
              btnStyle={{ backgroundColor: Colors.red }}
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

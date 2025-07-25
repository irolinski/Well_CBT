import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/global/AdvanceButton";
import DistortionPill from "@/components/global/DistortionPill";
import Frame from "@/components/global/Frame";
import Text from "@/components/global/Text";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import { cda_tool } from "@/constants/models/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { getUserSettingsData, UserSettingsDataObj } from "@/db/settings";
import { handleSaveCDAEntry } from "@/db/tools";
import { cdaResetState, setSave } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import Feather from "@expo/vector-icons/Feather";

const CURRENT_PAGE = 4;
const TOOL_NAME = cda_tool.name;

const Page_4 = () => {
  const { t } = useTranslation(["tools", "common"]);

  const cdaState = useSelector((state: RootState) => state.cda);
  const dispatch = useDispatch<AppDispatch>();
  const [settingsData, setSettingsData] = useState<UserSettingsDataObj>();

  const handleSave = async () => {
    handleSaveCDAEntry(cdaState);
    dispatch(cdaResetState());
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
        Alert.alert(t("alerts.error"), t("alerts.error_db_fetching"));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(setSave(settingsData?.exerciseAutoSaveIsActive));
  }, [settingsData]);

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav
          currentPage={CURRENT_PAGE}
          numOfAllPages={cda_tool.num_of_pages}
        />
        <Frame>
          <View className="py-10">
            <ToolHeader>
              {t(`tools.${TOOL_NAME}.exercise.summary.header`)}
            </ToolHeader>
            <View className="my-8">
              <View>
                <Text>
                  {t(`tools.${TOOL_NAME}.exercise.summary.distorted_thought`)}
                </Text>
                <CDATextBox textContent={cdaState.oldThought} />
              </View>
              <View
                className="my-8 border-b border-t px-2 py-7"
                style={{ borderColor: Colors.lightGray }}
              >
                <Text>
                  {t(
                    `tools.${TOOL_NAME}.exercise.summary.cognitive_distortion`,
                  )}
                </Text>
                <View className="mx-auto mt-4 w-3/4 px-4">
                  <DistortionPill
                    title={t(
                      `tools.${TOOL_NAME}.distortion_list.${cdaState.distortion}.name`,
                    )}
                    checked={true}
                    highlighted={false}
                  />
                </View>
              </View>
              <View className="mt-4">
                <Text>
                  {t(`tools.${TOOL_NAME}.exercise.summary.rational_thought`)}
                </Text>
                <CDATextBox textContent={cdaState.newThought} />
              </View>
              <Pressable onPress={() => dispatch(setSave(!cdaState.save))}>
                <View className="mx-2 mt-10 flex flex-row pt-4">
                  <View
                    className="h-6 w-6 rounded-md border"
                    style={{
                      borderColor: Colors.darkBlue,
                      backgroundColor: cdaState.save
                        ? Colors.mainBlue
                        : "transparent",
                    }}
                  >
                    {cdaState.save ? (
                      <View className="mx-auto">
                        <Feather
                          name="check"
                          size={22}
                          color={Colors.whiteSmoke}
                        />
                      </View>
                    ) : null}
                  </View>
                  <Text
                    className="mx-4 my-1 text-center"
                    style={{ color: Colors.darkBlue }}
                  >
                    {t("buttons.save_to_journal", { ns: "common" })}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title={t("buttons.finish", { ns: "common" })}
            onPress={() => {
              handleSave();
              router.navigate("./page_finish");
            }}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
export default Page_4;

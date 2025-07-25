import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/global/AdvanceButton";
import DistortionPill from "@/components/global/DistortionPill";
import Frame from "@/components/global/Frame";
import Text from "@/components/global/Text";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import ToolTextInput from "@/components/tools/ToolTextInput";
import { cda_tool } from "@/constants/models/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { setNewThought } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";

const CURRENT_PAGE = 3;
const TOOL_NAME = cda_tool.name;

const Page_3 = () => {
  const { t } = useTranslation(["tools", "common"]);

  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);
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
              {t(`tools.${TOOL_NAME}.exercise.page_3.header`)}
            </ToolHeader>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View className="my-8">
                <View>
                  <Text>
                    {t(`tools.${TOOL_NAME}.exercise.page_3.subheader_1`)}
                  </Text>
                  <CDATextBox textContent={cdaState.oldThought} />
                </View>
                <View
                  className="my-8 border-b border-t px-2 py-7"
                  style={{ borderColor: Colors.lightGray }}
                >
                  <Text>
                    {" "}
                    {t(`tools.${TOOL_NAME}.exercise.page_3.subheader_2`)}
                  </Text>
                  <View className="mx-auto mt-4 w-3/4 px-4">
                    {/* title={t(`tools.${TOOL_NAME}.distortion_list.${distortion}.name`)} */}
                    <DistortionPill
                      title={t(
                        `tools.${TOOL_NAME}.distortion_list.${cdaState.distortion}.name`,
                      )}
                      checked={true}
                      highlighted={false}
                    />
                  </View>
                </View>
                <View>
                  <Text>
                    {t(`tools.${TOOL_NAME}.exercise.page_3.instruction_1`)}
                  </Text>
                  <ToolTextInput
                    value={cdaState.newThought}
                    handleChangeText={(evt: string) =>
                      dispatch(setNewThought(evt))
                    }
                    keyboardMargin={true}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title={t("buttons.next", { ns: "common" })}
            onPress={() => router.navigate("./page_4")}
            disabled={!cdaState.newThought}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
export default Page_3;

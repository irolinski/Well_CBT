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
import Frame from "@/components/global/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import ToolTextInput from "@/components/tools/ToolTextInput";
import { cda_tool } from "@/constants/models/tools";
import { setOldThought, setSituation } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";

const CURRENT_PAGE = 1;
const TOOL_NAME = cda_tool.name;

const Page_1 = () => {
  const { t } = useTranslation(["tools", "common"]);

  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  return (
    <React.Fragment>
      <ScrollView className="pb-8">
        <ToolNav
          currentPage={CURRENT_PAGE}
          numOfAllPages={cda_tool.num_of_pages}
        />
        <Frame>
          <View className="py-10">
            <ToolHeader>
              {t(`tools.${TOOL_NAME}.exercise.page_1.header`)}
            </ToolHeader>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss;
              }}
              accessible={false}
            >
              <View className="my-8">
                <View className="mb-2">
                  <Text className="mr-[15%] text-left">
                    {t(`tools.${TOOL_NAME}.exercise.page_1.instruction_1`)}{" "}
                  </Text>
                  <ToolTextInput
                    value={cdaState.situation}
                    handleChangeText={(evt: string) =>
                      dispatch(setSituation(evt))
                    }
                    keyboardMargin={false}
                  />
                </View>
                <View>
                  <Text className="mr-[15%] text-left">
                    {t(`tools.${TOOL_NAME}.exercise.page_1.instruction_2`)}
                  </Text>
                  <ToolTextInput
                    value={cdaState.oldThought}
                    handleChangeText={(evt: string) =>
                      dispatch(setOldThought(evt))
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
            onPress={() => router.navigate(`./page_${CURRENT_PAGE + 1}`)}
            disabled={!cdaState.oldThought || !cdaState.situation}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Page_1;

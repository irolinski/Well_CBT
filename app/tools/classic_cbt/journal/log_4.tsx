import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AdvanceButton from '@/components/AdvanceButton';
import Frame from '@/components/Frame';
import Text from '@/components/global/Text';
import ToolHeader from '@/components/tools/ToolHeader';
import ToolNav from '@/components/tools/ToolNav';
import ToolTextInput from '@/components/tools/ToolTextInput';
import { journal_tool } from '@/constants/models/tools/tools';
import { SCREEN_HEIGHT } from '@/constants/styles/values';
import { setNote } from '@/state/features/tools/journalSlice';
import { AppDispatch, RootState } from '@/state/store';

const TOOL_NAME = journal_tool.name;
const CURRENT_PAGE = 4;

const Log_4 = () => {
  const { t } = useTranslation(["tools", "common"]);

  //tool state
  const dispatch = useDispatch<AppDispatch>();
  const journalState = useSelector((state: RootState) => state.journal);
  return (
    <React.Fragment>
      <ToolNav
        currentPage={CURRENT_PAGE}
        numOfAllPages={journal_tool.num_of_pages}
      />
      <Frame>
        <View className="h-full">
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
            accessible={false}
          >
            <View className="py-12">
              <ToolHeader>
                {t(`tools.${TOOL_NAME}.exercise.page_4.header`)}
              </ToolHeader>
              <View className="my-8">
                <View className="mb-2">
                  <Text className="mr-[15%] text-left">
                    {t(`tools.${TOOL_NAME}.exercise.page_4.instruction_1`)}
                  </Text>
                  <ToolTextInput
                    value={journalState.note}
                    handleChangeText={(evt: string) => dispatch(setNote(evt))}
                    keyboardMargin={false}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Frame>
      <View className="bottom-16 mx-6">
        <AdvanceButton
          title={t("buttons.next", { ns: "common" })}
          onPress={() => router.navigate("./log_5")}
          btnStyle={{ bottom: SCREEN_HEIGHT / 20 }}
        />
      </View>
    </React.Fragment>
  );
};

export default Log_4;

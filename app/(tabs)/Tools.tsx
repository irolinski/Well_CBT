import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import { ToolNames } from "@/constants/models/home/activity_log";
import { allToolCategoriesArr } from "@/constants/models/tools/tools";
import { logStartToolEvent } from "@/services/firebase/firebase";
import ToolCard from "../../components/tools/ToolCard";

const Tools = () => {
  const { t } = useTranslation("tools");

  return (
    <FrameMenu title={t("index.title")}>
      <View>
        {allToolCategoriesArr.map((toolCategory) => (
          <View key={toolCategory.name}>
            <Text className="mb-8 mt-2 text-left text-2xl">
              {t(`categories.${toolCategory.name}`)}
            </Text>
            {toolCategory.tools.map((tool, indexNum: number) => (
              <ToolCard
                name={t(`tools.${tool.name}.title`)}
                image={tool.card_bg}
                link={tool.link}
                key={indexNum}
                onPress={() => logStartToolEvent(tool.name)}
              />
            ))}
          </View>
        ))}
      </View>
    </FrameMenu>
  );
};

export default Tools;

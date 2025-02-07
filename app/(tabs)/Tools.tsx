import React from "react";
import { View } from "react-native";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import { allToolCategoriesArr } from "@/constants/models/tools/tools";
import ToolCard from "../../components/tools/ToolCard";

const Tools = () => {
  return (
    <FrameMenu title="Tools">
      <View>
        {allToolCategoriesArr.map((toolCategory) => (
          <View key={toolCategory.name}>
            <Text className="mb-8 mt-2 text-left text-2xl">
              {toolCategory.name}
            </Text>
            {toolCategory.tools.map((tool, indexNum: number) => (
              <ToolCard
                name={tool.name}
                image={tool.card_bg}
                link={tool.link}
                key={indexNum}
              />
            ))}
          </View>
        ))}
      </View>
    </FrameMenu>
  );
};

export default Tools;

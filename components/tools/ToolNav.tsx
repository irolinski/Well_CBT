import { Trans } from "react-i18next";
import { Platform, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import {
  REFERENCE_SMALL_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
} from "@/constants/styles/values";
import BackButton from "../global/BackButton";
import ProgressBar from "../global/ProgressBar";
import Text from "../global/Text";

const ToolNav = ({
  currentPage,
  numOfAllPages,
  handleBackButtonPress,
  hideBackButton,
}: {
  currentPage: number;
  numOfAllPages: number;
  handleBackButtonPress?: () => void;
  hideBackButton?: Boolean;
}) => {
  return (
    <View className="z-10">
      <View
        className={`absolute z-10 box-border w-full border-b ${SCREEN_HEIGHT > 750 && Platform.OS === "ios" ? "top-20 pb-7" : SCREEN_HEIGHT >= REFERENCE_SMALL_DEVICE_HEIGHT ? "top-14 pb-7" : "top-9 pb-4"}`}
        style={{
          borderColor: Colors.lightGray,
        }}
      >
        <View className="z-10 w-full flex-row items-center justify-center">
          <View className="absolute left-6">
            {!hideBackButton && (
              <BackButton
                handleBackButtonPress={() =>
                  handleBackButtonPress && handleBackButtonPress()
                }
              />
            )}
          </View>
          <View>
            <ProgressBar
              currentPage={currentPage}
              numOfAllPages={numOfAllPages}
            />
          </View>
          <View className="absolute right-6">
            <Text>
              <Trans
                i18nKey="nav_elements.step_count"
                ns="common"
                values={{ current: currentPage, total: numOfAllPages }}
                components={{
                  muted: <Text style={{ color: Colors.mainGray }} />,
                }}
              ></Trans>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ToolNav;

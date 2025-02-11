import { Trans, useTranslation } from "react-i18next";
import { Dimensions, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import BackButton from "../BackButton";
import Text from "../global/Text";
import ProgressBar from "../ProgressBar";

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
  const { t } = useTranslation("common");

  const windowHeight = Dimensions.get("window").height;

  return (
    <View className="z-10">
      <View
        className={`absolute z-10 box-border w-full border-b pb-7 ${windowHeight > 750 ? "top-20" : "top-12"}`}
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
                  muted: <Text style={{ color: "#525252" }} />,
                }}
              >
                {/* <Text className="text-xs">
                  {t("nav_elements.step_count", {
                    current: currentPage,
                    total: numOfAllPages,
                  })}{" "}
                  {currentPage}{" "}
                  <Text style={{ color: "#525252" }}>of {numOfAllPages}</Text>
                </Text> */}
              </Trans>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ToolNav;

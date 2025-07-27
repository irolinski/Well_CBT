import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import {
  ballColors,
  ballSizeParameter,
  statObjectsList,
  StatsObj,
} from "@/constants/models/about";
import { StatsDataObjType } from "@/constants/models/global/models";
import { Colors } from "@/constants/styles/colorTheme";
import { fetchStatsData } from "@/db/about";
import { interpolateNumbers } from "@/utils/algorithms";
import Text from "../global/Text";
import StatRow from "./StatRow";

const MIN_STATS_LENGHT = 1;

const getBallSize = (statNumber: number, minSize: number, maxSize: number) => {
  const ballSize = interpolateNumbers(
    statNumber,
    minSize,
    maxSize,
    ballSizeParameter.min,
    ballSizeParameter.max,
  );
  return ballSize;
};

const AboutStats = () => {
  const { t } = useTranslation("about");

  const [statsData, setStatsData] = useState<StatsObj[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchStatsData().then((res) => {
        const fetchedData = res;
        const updatedStatsObjModels: StatsObj[] = statObjectsList.map(
          (model) => {
            // Find the corresponding key in fetchedData
            const countKey = model.name as keyof StatsDataObjType;
            // Get the value from fetchedData, default to 0 if key not found
            const countValue: number = fetchedData[countKey] ?? 0;
            // Return the updated object with the added count property
            return {
              ...model,
              count: countValue,
            };
          },
        );

        const u = updatedStatsObjModels.filter(
          (obj) => obj.count && obj.count >= obj.ballSize.min,
        );

        setStatsData(u);
      });
    } catch (err) {
      console.error(err);
      Alert.alert(t("alerts.error"), t("alerts.error_db_fetching"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <View className="rounded-xl" style={{ backgroundColor: Colors.whiteSmoke }}>
      <View className="w-full py-8">
        {statsData && statsData.length > MIN_STATS_LENGHT ? (
          <React.Fragment>
            {statsData?.map((statsObj: StatsObj, indexNum: number) => (
              <StatRow
                ballSizeParameter={
                  statsObj.count
                    ? getBallSize(
                        statsObj.count,
                        statsObj.ballSize.min,
                        statsObj.ballSize.max,
                      )
                    : ballSizeParameter.min
                }
                objName={statsObj.name}
                statNumber={statsObj.count ? statsObj.count : 0}
                icon={statsObj.icon}
                ballColor={ballColors[indexNum % statsData.length]}
                indexNum={
                  statsObj.count && statsObj.count >= statsObj.ballSize.min
                    ? indexNum
                    : 0
                }
                key={indexNum}
              />
            ))}
          </React.Fragment>
        ) : (
          <View className="flex-row items-center justify-center">
            <View className="h-64 w-3/4 justify-center">
              <View className="flex-row justify-center">
                <Image
                  source={require("@/assets/images/about/bar-chart.webp")}
                  style={{ width: 100, height: 100 }}
                />
              </View>
              <View className="my-4 flex-row items-center justify-center px-12">
                <Text className="text-center">
                  {t(`stats.placeholder_text`)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default AboutStats;

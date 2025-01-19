import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  ballColors,
  ballSizeParameter,
  statObjectsList,
  StatsObj,
} from "@/constants/models/about";
import { fetchStatsData } from "@/db/about";
import { StatsDataObjType } from "@/db/models";
import { interpolateNumbers } from "@/utils/algorithms";
import StatRow from "./StatRow";

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
        console.log(u);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <View className="rounded-xl" style={{ backgroundColor: "#F5F5F5" }}>
      <View className="w-full py-8">
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
            caption={statsObj.caption}
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
        {
          // if only one stat number, then show a placeholder sign
        }
      </View>
    </View>
  );
};

export default AboutStats;

import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing, NativeSyntheticEvent } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { useDispatch, useSelector } from 'react-redux';
import { GroundYourselfSlidePageComponent } from '@/constants/models/tools/ground_yourself';
import { setCurrentSlide } from '@/state/features/tools/groundYourselfSlice';
import { AppDispatch, RootState } from '@/state/store';
import Ground_Body_Page_1 from './body/page_1';
import Ground_Body_Page_2 from './body/page_2';
import Ground_Body_Page_3 from './body/page_3';
import Ground_Body_Page_4 from './body/page_4';
import Ground_Environment_Page_1 from './environment/page_1';
import Ground_Environment_Page_2 from './environment/page_2';
import Ground_Environment_Page_3 from './environment/page_3';
import Ground_Environment_Page_4 from './environment/page_4';
import Ground_Finish_Page from './FinishPage';
import Ground_Time_Date from './time/Date';
import Ground_Time_Day from './time/Day';
import Ground_Touch_Page_1 from './touch/page_1';
import Ground_Touch_Page_2 from './touch/page_2';
import Ground_Touch_Page_3 from './touch/page_3';
import Ground_Touch_Page_4 from './touch/page_4';

const exercises = [
  {
    name: "body",
    pages: [
      Ground_Body_Page_1,
      Ground_Body_Page_2,
      Ground_Body_Page_3,
      Ground_Body_Page_4,
    ],
  },
  { name: "time.date", pages: [Ground_Time_Date] },
  {
    name: "environment",
    pages: [
      Ground_Environment_Page_1,
      Ground_Environment_Page_2,
      Ground_Environment_Page_3,
      Ground_Environment_Page_4,
    ],
  },
  {
    name: "touch",
    pages: [
      Ground_Touch_Page_1,
      Ground_Touch_Page_2,
      Ground_Touch_Page_3,
      Ground_Touch_Page_4,
    ],
  },
  { name: "time.day", pages: [Ground_Time_Day] },
];

const ALL_PAGES_LENGTH = exercises.flatMap((exercise) => exercise.pages).length;

const GroundYourself = () => {
  const { t } = useTranslation(["tools", "common"]);

  const dispatch = useDispatch<AppDispatch>();
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );

  const refPagerView = useRef<PagerView>(null);
  const instructionTextAnim = useRef(new Animated.Value(0)).current;

  const fadeAnimation = (
    animRef: Animated.Value,
    duration: number,
    outputVal: number,
  ) => {
    Animated.timing(animRef, {
      toValue: outputVal,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const nextSlide = useCallback(() => {
    refPagerView.current?.setPage(groundYourselfToolState.currentSlide + 1);
  }, [groundYourselfToolState.currentSlide]);

  useEffect(() => {
    fadeAnimation(instructionTextAnim, 1500, 1);
  }, []);

  let globalIndex = 0;

  return (
    <PagerView
      scrollEnabled={false}
      className="h-full w-full justify-center"
      initialPage={0}
      ref={refPagerView}
      onPageSelected={(
        evt: NativeSyntheticEvent<
          Readonly<{
            position: Double;
          }>
        >,
      ) => {
        dispatch(setCurrentSlide(evt.nativeEvent.position));
      }}
    >
      {exercises.flatMap((exercise) =>
        exercise.pages.map(
          (PageComponent: GroundYourselfSlidePageComponent) => {
            const pageIndex: number = globalIndex++;
            return (
              <PageComponent
                key={pageIndex}
                objKey={pageIndex}
                exerciseName={t(
                  "tools.ground_yourself." + exercise.name + ".title",
                )}
                onButtonPress={nextSlide}
              />
            );
          },
        ),
      )}
      <Ground_Finish_Page
        exerciseName=""
        objKey={ALL_PAGES_LENGTH}
        onButtonPress={() => router.back()}
      />
    </PagerView>
  );
};

export default GroundYourself;

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ColorValue,
  Keyboard,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GroundEnvironmentItemAdjectiveType } from "@/app/tools/relax/ground_yourself/environment/page_3";
import NavigationModalButton from "@/components/NavigationModalButton";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import {
  defaultEnvironmentItem,
  setEnvironmentAdjectiveModalIsOpen,
  setEnvironmentItemsArr,
} from "@/state/features/tools/groundYourselfSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import EnvironmentAdjectiveListElement from "./EnvironmentAdjectiveListElement";

const MODAL_WIDTH = SCREEN_WIDTH * 0.8;
const MAX_NUM_OF_ADJECTIVES = 3;

const NavigationModal = () => {
  const { t } = useTranslation(["tools", "common"]);
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const dispatch = useDispatch<AppDispatch>();

  const {
    environmentItemsArr,
    environmentItemsModalSelectedIndex,
    environmentAdjectiveModalIsOpen,
  } = groundYourselfToolState;

  const [adjectivesArr, setAdjectivesArr] = useState<
    GroundEnvironmentItemAdjectiveType[]
  >([]);
  const [textInputIsActive, setTextInputIsActive] = useState(false);
  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  useEffect(() => {
    if (environmentItemsArr[environmentItemsModalSelectedIndex]) {
      const currentItem =
        environmentItemsArr[environmentItemsModalSelectedIndex];

      let updatedAdjectivesArr =
        currentItem.itemAdjectives ?? defaultEnvironmentItem.itemAdjectives;

      if (updatedAdjectivesArr.length < MAX_NUM_OF_ADJECTIVES) {
        // if a previous spot on a list is filled, add a next one
        if (updatedAdjectivesArr[updatedAdjectivesArr.length - 1].name) {
          updatedAdjectivesArr = [
            ...updatedAdjectivesArr,
            defaultEnvironmentItem.itemAdjectives[0],
          ];
        }
        setCurrentElementIndex(
          currentItem.itemAdjectives
            ? currentItem.itemAdjectives.length - 1
            : 0,
        );
      }
      setAdjectivesArr(updatedAdjectivesArr);
      setTextInputIsActive(false);
    }
  }, [
    environmentItemsArr,
    environmentItemsModalSelectedIndex,
    environmentAdjectiveModalIsOpen,
  ]);

  return (
    <Modal
      visible={environmentAdjectiveModalIsOpen}
      animationType="slide"
      transparent={true}
    >
      <View
        className="h-full items-center justify-center"
        style={{ backgroundColor: Colors.transparentBlack }}
      >
        {/* Modal body */}
        <View
          className="rounded-xl border bg-white px-8 pt-4"
          style={{
            height: SCREEN_HEIGHT * 0.725,
            width: MODAL_WIDTH,
            borderColor: Colors.mainGray,
          }}
        >
          {/* Header */}
          <View>
            <View className="flex-row justify-end">
              <Pressable
                onPress={() =>
                  dispatch(setEnvironmentAdjectiveModalIsOpen(false))
                }
              >
                <View className="m-1">
                  <MaterialCommunityIcons
                    name="window-close"
                    size={24}
                    color={Colors.mainGray}
                  />
                </View>
              </Pressable>
            </View>
            <View
              className="mx-1 flex-row items-center justify-center border-b pb-3"
              style={{ borderColor: Colors.mainGray, borderBottomWidth: 0.4 }}
            >
              <View className="mx-1.5">
                <Text className="text-lg">
                  <Text>
                    {t(
                      "tools.ground_yourself.environment.page_3.describe_item",
                    )}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          {/* Header */}
          <View className="top-6 my-2 items-center">
            <Text className="mb-4 text-2xl">
              {environmentItemsArr[environmentItemsModalSelectedIndex].itemName}
            </Text>
          </View>
          {/* adjective list element */}
          <View className="h-3/5 items-center justify-center">
            {adjectivesArr.map((adjective, indexNum: number) => (
              <EnvironmentAdjectiveListElement
                value={adjective.name}
                color={adjective.color}
                isAvailable={!textInputIsActive}
                isCurrentlyEdited={
                  textInputIsActive && indexNum === currentElementIndex
                }
                key={indexNum}
                onChangeText={(value: string) => {
                  const prev = [...adjectivesArr];
                  const updatedArr = prev.map((adjective, i: number) =>
                    i === indexNum ? { ...adjective, name: value } : adjective,
                  );
                  setAdjectivesArr(updatedArr);
                }}
                onPressAdd={function (): void {
                  setTextInputIsActive(true);
                }}
                indexNum={0}
                onConfirm={() => {
                  Keyboard.dismiss();
                  if (adjectivesArr.length < MAX_NUM_OF_ADJECTIVES) {
                    const prev = [...adjectivesArr];
                    const updatedArr = [
                      ...prev,
                      defaultEnvironmentItem.itemAdjectives[0],
                    ];
                    setAdjectivesArr(updatedArr);
                  }
                  setTextInputIsActive(false);
                  setCurrentElementIndex((prev) => prev + 1);
                }}
                onPressColor={(colorValue: ColorValue) => {
                  const prev = [...adjectivesArr];
                  const updatedArr = prev.map((adjective, i: number) =>
                    i === indexNum
                      ? { ...adjective, color: colorValue }
                      : adjective,
                  );
                  setAdjectivesArr(updatedArr);
                }}
              />
            ))}
          </View>
          <View
            className="absolute bottom-8 flex-row items-center justify-center"
            style={{ width: MODAL_WIDTH }}
          >
            {/* here is a bug */}
            <NavigationModalButton
              title={t("buttons.done", {
                ns: "common",
              })}
              disabled={textInputIsActive}
              onPress={() => {
                const updatedItemsArr = [...environmentItemsArr];
                let updatedAdjectivesArr = adjectivesArr;
                // filter out empty positions
                updatedAdjectivesArr = updatedAdjectivesArr.filter(
                  (adjectiveObj) => adjectiveObj.name,
                );

                const updatedItem = {
                  ...environmentItemsArr[environmentItemsModalSelectedIndex],
                  itemAdjectives: updatedAdjectivesArr,
                };

                updatedItemsArr[environmentItemsModalSelectedIndex] =
                  updatedItem; // Correct index

                dispatch(setEnvironmentItemsArr(updatedItemsArr));
                dispatch(setEnvironmentAdjectiveModalIsOpen(false));
              }}
              icon={
                <Feather
                  className="mx-2"
                  name="arrow-right"
                  size={28}
                  color={Colors.white}
                />
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NavigationModal;

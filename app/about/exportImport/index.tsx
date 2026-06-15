import React, { ReactNode, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DividerLine from "@/components/global/DividerLine";
import MenuNav from "@/components/global/MenuNav";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import AdvanceButton from "@/components/global/AdvanceButton";
import { SCREEN_WIDTH } from "@/constants/styles/values";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type ExportImportItem = {
  body: string;
  button: ReactNode;
};

type ExportImportCategory = {
  title: string;
  items: ExportImportItem[];
};

const Index = () => {
  const { t } = useTranslation(["about", "common"]);
  const [importModalVisible, setImportModalVisible] = useState(false);

  const exportObj: ExportImportCategory = {
    title: t(`export_import.export.header`),
    items: [
      {
        body: t(`export_import.export.body`),
        button: (
          <AdvanceButton
            title={t(`export_import.export.button`)}
            btnStyle={{
              width: 216,
              height: 45,
              backgroundColor: "#81C784",
              borderRadius: 12,
            }}
            onPress={() => {}}
            icon={<AntDesign name="export" size={24} color="white" />}
          />
        ),
      },
    ],
  };

  const importObj: ExportImportCategory = {
    title: t(`export_import.import.header`),
    items: [
      {
        body: t(`export_import.import.body`),
        button: (
          <AdvanceButton
            title={t(`export_import.import.button`)}
            btnStyle={{
              width: 216,
              height: 45,
              backgroundColor: "#FFD54F",
              borderRadius: 12,
            }}
            onPress={() => setImportModalVisible(true)}
            icon={<AntDesign name="export2" size={24} color="white" />}
          />
        ),
      },
    ],
  };

  const settingsData = [exportObj, importObj];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <MenuNav name={t(`export_import.titleShort`)} />
      <View className="m-4 items-center">
        <Text
          className="mt-4 w-full text-left"
          style={{ fontSize: 24, fontWeight: "500" }}
        >
          {t(`export_import.title`)}
        </Text>
        <Text
          className="mb-8 w-full text-left text-lg"
          style={{ fontSize: 14, fontWeight: 400, color: "#757575" }}
        >
          <Trans
            components={{
              bold: <Text style={{ fontWeight: 700 }} />,
            }}
          >
            {t(`export_import.description`)}
          </Trans>
        </Text>

        <DividerLine width={SCREEN_WIDTH * 0.33} />

        <View className="mt-6 w-full">
          {settingsData.map((segment, indexNum: number) => (
            <View className="mb-12 items-center" key={indexNum}>
              <Text
                className="mt-2 w-full text-left"
                style={{
                  color: Colors.offBlack,
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                <Trans
                  components={{
                    bold: <Text style={{ fontWeight: 700 }} />,
                  }}
                >
                  {segment.title}
                </Trans>
              </Text>

              <View className="w-full">
                {segment.items.map((item, itemIndex: number) => (
                  <React.Fragment key={itemIndex}>
                    <View className="w-full items-center">
                      <Text
                        className="mb-4 w-full text-left"
                        style={{ fontSize: 14, weight: 400 }}
                      >
                        <Trans
                          components={{
                            bold: <Text style={{ fontWeight: 700 }} />,
                          }}
                        >
                          {item.body}
                        </Trans>
                      </Text>

                      <View className="items-center">{item.button}</View>
                    </View>
                  </React.Fragment>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
      <Modal
        visible={importModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setImportModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              width: "80%",
              maxWidth: 340,
              alignSelf: "center",
              backgroundColor: "white",
              borderRadius: 16,
              paddingVertical: 28,
              paddingHorizontal: 20,
            }}
          >
            <Text
              className="mb-2 mt-2 text-center text-xl"
              style={{ fontSize: 20, color: Colors.red, fontWeight: 700 }}
            >
              {t(`export_import.modal.header`)}
            </Text>

            <Text className="mx-2 text-center">
              <Trans
                components={{
                  bold: <Text style={{ fontWeight: 700 }} />,
                }}
              >
                {t(`export_import.modal.body`)}
              </Trans>
            </Text>

            <View className="mt-6 items-center">
              <AdvanceButton
                title={t(`export_import.modal.continue`)}
                onPress={() => {
                  setImportModalVisible(false);
                }}
                btnStyle={{
                  backgroundColor: "#D46A6A",
                  width: 216,
                  height: 45,
                  borderRadius: 12,
                  marginBottom: 16,
                }}
                icon={<MaterialIcons name="save" size={24} color="white" />}
              />

              <AdvanceButton
                title={t(`export_import.modal.back`)}
                onPress={() => {
                  setImportModalVisible(false);
                }}
                btnStyle={{
                  backgroundColor: "#81C784",
                  width: 216,
                  height: 45,
                  borderRadius: 12,
                }}
                icon={<MaterialIcons name="undo" size={24} color="white" />}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Index;

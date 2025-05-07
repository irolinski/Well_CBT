import { Href, router, useFocusEffect } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '@/components/BackButton';
import Text from '@/components/global/Text';
import ContactPic from '@/components/tools/phone/ContactPic';
import ToolHeader from '@/components/tools/ToolHeader';
import { phoneAFriend_tool } from '@/constants/models/tools/tools';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/styles/values';
import { getPhoneData } from '@/db/tools';
import { setShowModal, setSupportContact } from '@/state/features/tools/phoneSlice';
import { AppDispatch, RootState } from '@/state/store';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import { getTranslation } from '@/utils/locales';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ConversationModal from './modal';

const TOOL_NAME = phoneAFriend_tool.name;

const Phone = () => {
  const { t } = useTranslation(["tools", "common"]);

  const dispatch = useDispatch<AppDispatch>();
  const phoneState = useSelector((state: RootState) => state.phone);

  const handleGetPhoneData = async () => {
    const phoneData = await getPhoneData();
    if (phoneData) {
      dispatch(setSupportContact(phoneData[0]));
    }
  };

  useFocusEffect(() => {
    handleGetPhoneData();
  });

  const callContact = async (phoneNum: string) => {
    const num = encodeURIComponent(
      phoneNum.replace(/-/g, "").replace(/\s/g, ""),
    );
    const url = `tel://${num}`;
    const supported = await Linking.canOpenURL(url); // Check if the SMS URL can be opened on the device

    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        getTranslation("alets.error"),
        getTranslation("alerts.error_calling_not_supported"),
      );
    }
  };

  const sendSMS = async (phoneNum: string) => {
    const num = encodeURIComponent(
      phoneNum.replace(/-/g, "").replace(/\s/g, ""),
    );
    const url = `sms:${num}`;
    const supported = await Linking.canOpenURL(url); // Check if the SMS URL can be opened on the device

    if (supported) {
      Linking.openURL(url); // Open the SMS app with the pre-filled phone number
    } else {
      Alert.alert(
        getTranslation("alets.error"),
        getTranslation("alerts.error_sms_not_supported"),
      );
    }
  };

  return (
    <SafeAreaView className="items-center">
      <View
        className="z-10 flex-row justify-between px-6"
        style={{
          width: SCREEN_WIDTH,
          paddingTop: 30,
          top: 0,
          left: 0,
        }}
      >
        <BackButton />
        {phoneState.supportContact && (
          <TouchableOpacity
            onPress={() => router.replace("tools/distract/phone/add" as Href)}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={26}
              color={Colors.black}
            />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: SCREEN_HEIGHT * 0.025,
          justifyContent: "flex-start",
          top: 0,
          left: 0,
        }}
      >
        <View className="mb-8">
          <ToolHeader>{t(`tools.${TOOL_NAME}.title`)}</ToolHeader>
        </View>
        <View
          className="rounded-3xl border"
          style={{ height: SCREEN_HEIGHT / 1.6, borderColor: Colors.mainGray }}
        >
          <View className="mt-4">
            <ContactPic
              pictureURI={
                phoneState.supportContact &&
                phoneState.supportContact.pictureURI &&
                phoneState.supportContact.pictureURI
              }
            />
          </View>
          <View className="mx-4 justify-end" style={{ height: "20%" }}>
            {!phoneState.supportContact ? (
              <View>
                <Text
                  className="text-center text-2xl"
                  style={{ fontWeight: 500 }}
                >
                  {t(`tools.${TOOL_NAME}.main.no_contact`)}
                </Text>
              </View>
            ) : (
              <View>
                <Text className="mb-4 text-center text-2xl font-semibold">
                  {phoneState.supportContact.name}
                </Text>
                <Text className="text-center text-xl">
                  {formatPhoneNumber(phoneState.supportContact.phone)}
                </Text>
              </View>
            )}
          </View>
          <View
            className="mx-4 flex-row items-center justify-center"
            style={{ height: "35%" }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              className="mx-8 items-center justify-center rounded-full"
              style={{
                width: SCREEN_HEIGHT / 10,
                height: SCREEN_HEIGHT / 10,
                backgroundColor: Colors.pastelGreen,
                opacity: !phoneState.supportContact ? 0.5 : 1,
              }}
              onPress={() => callContact(phoneState.supportContact!.phone)}
              disabled={!phoneState.supportContact}
            >
              <AntDesign name="phone" size={24} color={Colors.offWhite} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className="mx-8 items-center justify-center rounded-full"
              style={{
                width: SCREEN_HEIGHT / 10,
                height: SCREEN_HEIGHT / 10,
                backgroundColor: Colors.darkBlue,
                opacity: !phoneState.supportContact ? 0.5 : 1,
              }}
              onPress={() => {
                sendSMS(phoneState.supportContact!.phone);
              }}
              disabled={!phoneState.supportContact}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {phoneState.supportContact ? (
            <TouchableOpacity
              activeOpacity={0.7}
              className="my-4 h-12 flex-row items-center justify-center rounded-xl border"
              style={[
                {
                  borderColor: Colors.mainGray,
                  backgroundColor: Colors.offWhite,
                  opacity: 8,
                },
              ]}
              onPress={() => {
                dispatch(setShowModal(true));
              }}
            >
              <Text className="mx-2" style={{ color: Colors.blackPearl }}>
                {t(`tools.${TOOL_NAME}.main.conversation_topics_button`)}
              </Text>
              <View className="mx-2">
                <MaterialCommunityIcons
                  name="message-reply-text-outline"
                  size={24}
                  color={Colors.blackPearl}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              className="my-4 h-12 flex-row items-center justify-center rounded-xl"
              style={[
                {
                  backgroundColor: Colors.darkBlue,
                  opacity: 8,
                },
              ]}
              onPress={() => router.replace("tools/distract/phone/add" as Href)}
            >
              <Text className="mx-2" style={{ color: Colors.offWhite }}>
                {t(`tools.${TOOL_NAME}.main.add_contact_button`)}
              </Text>
              <View className="mx-2">
                <MaterialIcons
                  name="person-add-alt-1"
                  size={24}
                  color={Colors.offWhite}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ConversationModal />
    </SafeAreaView>
  );
};

export default Phone;

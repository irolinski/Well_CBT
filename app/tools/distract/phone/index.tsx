import { Href, router, useFocusEffect } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Dimensions, Linking, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '@/components/BackButton';
import Text from '@/components/global/Text';
import ContactPic from '@/components/tools/phone/ContactPic';
import ToolHeader from '@/components/tools/ToolHeader';
import { phoneAFriend_tool } from '@/constants/models/tools/tools';
import { Colors } from '@/constants/styles/colorTheme';
import { getPhoneData } from '@/db/tools';
import { setShowModal, setSupportContact } from '@/state/features/tools/phoneSlice';
import { AppDispatch, RootState } from '@/state/store';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ConversationModal from './modal';

const TOOL_NAME = phoneAFriend_tool.name;

const Phone = () => {
  const { t } = useTranslation(["tools", "common"]);

  const windowHeight = Dimensions.get("window").height;

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
      Alert.alert("Error", "Calling not supported on this device");
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
      Alert.alert("Error", "SMS not supported on this device");
    }
  };

  return (
    <React.Fragment>
      <View
        className={`z-10 mx-6 ${windowHeight > 750 ? "top-20" : "top-12"} flex-row justify-between`}
      >
        <BackButton />
        {phoneState.supportContact && (
          <TouchableOpacity
            onPress={() => router.replace("tools/distract/phone/add" as Href)}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={26}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      <View
        className={`mx-6 ${windowHeight > 750 ? "top-24" : "top-16"}`}
        style={{
          height: windowHeight - windowHeight / 5,
        }}
      >
        <View className="mb-8">
          <ToolHeader>{t(`tools.${TOOL_NAME}.title`)}</ToolHeader>
        </View>
        <View
          className="rounded-3xl border"
          style={{ height: windowHeight / 1.6, borderColor: Colors.mainGray }}
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
                <Text className="text-center text-2xl font-semibold">
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
                width: windowHeight / 10,
                height: windowHeight / 10,
                backgroundColor: "#81C784",
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
                width: windowHeight / 10,
                height: windowHeight / 10,
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
    </React.Fragment>
  );
};

export default Phone;

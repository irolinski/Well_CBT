import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allFaces } from "@/assets/images/global/faces/faces";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import NavigationModalButton from "@/components/NavigationModalButton";
import {
  fetchUserData,
  handleSetName,
  handleSetProfilePicId,
  UserType,
} from "@/db/user";
import {
  setName,
  setNameInputIsActive,
  setProfilePicId,
  setShowEditProfileModal,
} from "@/state/features/menus/editProfileModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfileModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const editProfileModalState = useSelector(
    (state: RootState) => state.editProfileModal,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<Image | undefined>();

  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchUserData().then((res) => {
        let fetchedData = res as UserType;
        dispatch(setName(fetchedData.name));
        dispatch(setProfilePicId(fetchedData.profilePicId));
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let selectedImage;
    if (editProfileModalState.selectedFaceId) {
      selectedImage = allFaces.find(
        (el) => el.id === editProfileModalState.selectedFaceId,
      )?.image;
    } else {
      selectedImage = allFaces[0].image;
      dispatch(setProfilePicId(allFaces[0].id));
    }
    setProfilePic(selectedImage);
  }, [editProfileModalState.selectedFaceId]);

  const handleSaveChanges = () => {
    handleSetName(editProfileModalState.name);
    handleSetProfilePicId(editProfileModalState.selectedFaceId);
    dispatch(setShowEditProfileModal(false));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editProfileModalState.showModal}
      className="flex-1"
    >
      <ScrollView
        onScroll={(evt) => {
          evt.nativeEvent.contentOffset.y < -175 &&
            dispatch(setShowEditProfileModal(false));
        }}
        indicatorStyle="black"
        persistentScrollbar={true} // works only on android
      >
        <View
          className={`px-4 ${windowHeight > 850 ? "py-20" : "py-12"}`}
          style={{
            top: 0,
            width: windowWidth,
            // height: windowHeight, //remove if more height needed
            backgroundColor: "#FBFBFB",
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(setShowEditProfileModal(false));
            }}
          >
            <View className="items-center pb-6">
              <View>
                <Feather name="chevron-down" size={24} color="black" />
              </View>
            </View>
          </Pressable>
          <View className="items-center">
            <Text className="text-xl" style={{ color: "#B8B8B8" }}>
              Edit Profile
            </Text>
          </View>
          <View className="mt-8">
            <View>
              <Text className="mb-2 text-lg" style={{ color: "#B8B8B8" }}>
                Your profile
              </Text>
              <View className="justify-center">
                <View className="flex-row justify-center">
                  <Image
                    style={{
                      width: 0.4 * windowWidth,
                      height: 0.4 * windowWidth,
                    }}
                    source={profilePic}
                  ></Image>
                </View>
                <View className="my-3 flex-row justify-center pt-4">
                  <View className="relative h-16 flex-row items-center px-12">
                    <TouchableOpacity
                      className="absolute right-8 top-0 z-10 pb-8 pl-8"
                      onPress={() => {
                        if (!editProfileModalState.nameInputIsActive) {
                          dispatch(setNameInputIsActive(true));
                        } else {
                          dispatch(setNameInputIsActive(false));
                        }
                      }}
                    >
                      <MaterialCommunityIcons
                        name="pencil-outline"
                        size={38}
                        color={
                          editProfileModalState.nameInputIsActive
                            ? "#B8B8B8"
                            : "#212529"
                        }
                      />
                    </TouchableOpacity>
                    <TextInput
                      className="w-64 text-center text-3xl"
                      value={editProfileModalState.name}
                      style={{
                        color: editProfileModalState.nameInputIsActive
                          ? "black"
                          : "#616161",
                        borderColor: "#d9d9d9",
                        backgroundColor: "#FBFBFB",
                        textAlignVertical: "center",
                      }}
                      selectTextOnFocus={true}
                      onChangeText={(evt) => dispatch(setName(evt))}
                      editable={editProfileModalState.nameInputIsActive}
                      multiline={false}
                      maxLength={13}
                      autoFocus={editProfileModalState.nameInputIsActive}
                      returnKeyType="done"
                      onKeyPress={(evt) =>
                        evt.nativeEvent.key == "Enter" && Keyboard.dismiss()
                      }
                      clearButtonMode="never"
                      onBlur={() => {
                        dispatch(setNameInputIsActive(false));
                        Keyboard.dismiss();
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="my-4">
            <DividerLine width={windowWidth * 0.5} />
          </View>
          <View className="my-8" style={{ height: 225 }}>
            <View>
              <Text className="mb-4 text-lg" style={{ color: "#B8B8B8" }}>
                Select profile picture
              </Text>
              <ScrollView
                contentContainerStyle={{
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  paddingTop: 16,
                  paddingBottom: 16,
                }}
                style={{ borderColor: "#B8B8B8" }}
                className="border px-4"
              >
                {allFaces.map(
                  (faceObj: { id: number; image: Image }, indexNum: number) => (
                    <TouchableOpacity
                      className="m-2 rounded-full"
                      key={indexNum}
                      onPress={() => {
                        dispatch(setProfilePicId(faceObj.id));
                      }}
                      style={{
                        borderColor: "#D9D9D9",
                        borderWidth:
                          faceObj.id === editProfileModalState.selectedFaceId
                            ? 6
                            : 0,
                      }}
                    >
                      <Image className="h-24 w-24" source={faceObj.image} />
                    </TouchableOpacity>
                  ),
                )}
              </ScrollView>
            </View>
          </View>
          <View className="flex-row justify-center pb-8 pt-16">
            <NavigationModalButton
              title={"Save changes"}
              disabled={editProfileModalState.nameInputIsActive}
              onPress={() => {
                handleSaveChanges();
              }}
              icon={<Feather name="save" size={24} color="#ffffff" />}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditProfileModal;

import { Alert, Share } from "react-native";

const handleShare = async (message: string) => {
  try {
    const result = await Share.share({
      message: message,
    });
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

export default handleShare;

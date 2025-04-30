import { View, ViewStyle } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import Text from '../../global/Text';

const CDATextBox = ({
  textContent,
  customStyle,
}: {
  textContent: string;
  customStyle?: ViewStyle;
}) => {
  return (
    <View
      className="mt-4 h-28 rounded-lg border bg-gray-200"
      style={[customStyle, { borderColor: Colors.darkBlue }]}
    >
      <Text className="p-4 text-left text-sm">{textContent}</Text>
    </View>
  );
};
export default CDATextBox;

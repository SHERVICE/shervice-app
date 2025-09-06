import PrevIcon from '@/assets/header/prev';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Heading from '../Heading';

export interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigation();

  const { colors } = useTheme();

  const onPressBack = () => {
    navigate.goBack();
  };

  return (
    <View style={styles.headerArea}>
      <View style={styles.iconArea}>
        <TouchableHighlight
          style={styles.buttonHeader}
          onPress={onPressBack}
          underlayColor="transparent"
        >
          <PrevIcon color={colors.text} />
        </TouchableHighlight>
      </View>
      <Heading fontFamily="PoppinsBold" size={16}>
        {title}
      </Heading>
      <View style={styles.iconArea}></View>
    </View>
  );
}

export const styles = StyleSheet.create({
  headerArea: {
    width: '100%',
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconArea: {
    minWidth: 40,
    height: 44,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  buttonHeader: {
    minWidth: 40,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

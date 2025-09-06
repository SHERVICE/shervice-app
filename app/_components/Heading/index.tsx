import { Colors } from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

export enum FontFamily {
  PoppinsRegular = 'PoppinsRegular',
  PoppinsMedium = 'PoppinsMedium',
  PoppinsSemiBold = 'PoppinsSemiBold',
  PoppinsBold = 'PoppinsBold',
  PoppinsLight = 'PoppinsLight',
}

type FontType = keyof typeof FontFamily;

interface HeadingProps {
  fontFamily?: FontType;
  align?: TextStyle['textAlign'];
  size?: number;
  color?: string;
  children?: string[] | string;
  style?: TextStyle;
  numberOfLines?: number;
}

export default function Heading({ children, style, ...rest }: HeadingProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () => getStyles({ ...rest, color: rest?.color ?? colors?.text }),
    [rest, colors],
  );
  return (
    <Text style={[styles.text, style]} numberOfLines={rest.numberOfLines}>
      {children}
    </Text>
  );
}

const getStyles = (style: HeadingProps) =>
  StyleSheet.create({
    text: {
      fontFamily: style.fontFamily ?? 'PoppinsMedium',
      fontSize: style?.size ?? 16,
      color: style?.color ?? Colors?.black,
      textAlign: style.align ?? 'auto',
    },
  });

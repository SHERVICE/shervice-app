import { Colors } from '@/constants/Colors';
import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

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
  size?: number;
  color?: string;
  children?: string;
}

export default function Heading({ children, ...rest }: HeadingProps) {
  const styles = useMemo(() => getStyles({ ...rest }), [rest]);

  return <Text style={styles.text}>{children}</Text>;
}

const getStyles = (style: HeadingProps) =>
  StyleSheet.create({
    text: {
      fontFamily: style.fontFamily ?? 'PoppinsMedium',
      fontSize: style?.size ?? 16,
      color: style.color ?? Colors.black,
    },
  });

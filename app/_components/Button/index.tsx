/* eslint-disable prettier/prettier */
import { Colors } from '@/constants/Colors';
import { Dimensions, DimensionsEnum } from '@/constants/Dimensions';
import { JSX } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableHighlightProps,
    View
} from 'react-native';

interface ButtonProps extends TouchableHighlightProps {
  title?: string
  size?: keyof typeof Dimensions;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  color?: string;
}

function Button({ size = DimensionsEnum.medium, iconLeft, iconRight, title, color = Colors.primary,  ...props }: ButtonProps) {
 
  const styles = getStyles(size, color)

  return (
    <TouchableHighlight style={styles.button} {...props}>
     <View style={styles.buttonContent}>
        {iconLeft && iconLeft}
        {title && <Text style={styles.title}>{title}</Text>}
        {iconLeft && iconRight}
     </View>
    </TouchableHighlight>
  );
}

const getStyles = (size: keyof typeof Dimensions, color: string) =>
  StyleSheet.create({
    button: {
      width: '100%',
      height: Dimensions[size],
      borderRadius: 10,
      backgroundColor: color,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    title: {
        fontFamily: "PoppinsLight",
        color: Colors.white
    }
  });

export default Button;

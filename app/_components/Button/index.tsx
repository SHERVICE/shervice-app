import { Colors } from '@/constants/Colors';
import { Dimensions, DimensionsEnum } from '@/constants/Dimensions';
import { JSX } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';

enum TypeButtonEnum {
  outlined = 'outlined',
}

export type TypeButton = keyof typeof TypeButtonEnum;
interface ButtonProps extends TouchableHighlightProps {
  title?: string;
  size?: keyof typeof Dimensions;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  color?: string;
  type?: TypeButton;
  isLoading?: boolean;
}

function Button({
  size = DimensionsEnum.medium,
  iconLeft,
  iconRight,
  title,
  color = Colors.primary,
  type,
  isLoading = false,
  ...props
}: ButtonProps) {
  const styles = getStyles(size, color, type);

  return (
    <TouchableHighlight
      style={[styles.button, isLoading && { opacity: 0.3 }]}
      {...props}
      underlayColor="transparent"
      disabled={isLoading}
    >
      <View style={styles.buttonContent}>
        {isLoading && <ActivityIndicator />}
        {iconLeft && iconLeft}
        {title && (
          <Text style={styles.title}>{isLoading ? 'Carregando' : title}</Text>
        )}
        {iconLeft && iconRight}
      </View>
    </TouchableHighlight>
  );
}

const getStyles = (
  size: keyof typeof Dimensions,
  color: string,
  buttonType?: TypeButton,
) =>
  StyleSheet.create({
    button: {
      width: '100%',
      height: Dimensions[size],
      borderRadius: 10,
      backgroundColor: color,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',

      ...(buttonType === TypeButtonEnum.outlined && {
        backgroundColor: 'transparent',
        color: 'red',
        borderWidth: 2,
        borderColor: Colors.primary,
      }),
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    title: {
      fontFamily: 'PoppinsLight',
      color: Colors.white,

      ...(buttonType === TypeButtonEnum.outlined && {
        color: Colors.primary,
      }),
    },
  });

export default Button;

import Heading from '@/app/_components/Heading';
import { Colors } from '@/constants/Colors';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';

import AppleIcon from '@/assets/icons/button/apple';
import Google from '@/assets/icons/button/google';
import { useTheme } from '@/context/theme-provider';

enum Social {
  APPLE = 'Apple',
  GOOGLE = 'Google',
}

interface ButtonSocialProps extends TouchableHighlightProps {
  type: keyof typeof Social;
  title?: string;
}

export default function LoginButtonSocial({
  title,
  type,
  ...rest
}: ButtonSocialProps) {
  const social = Social[type];

  const { isDark } = useTheme();
  return (
    <TouchableHighlight
      style={styles.button}
      {...rest}
      underlayColor="transparent"
    >
      <View style={styles.content}>
        {social === Social.GOOGLE && <Google width={20} height={20} />}
        {social === Social.APPLE && (
          <AppleIcon
            width={20}
            height={20}
            color={isDark ? Colors.white : undefined}
          />
        )}
        <Heading fontFamily="PoppinsRegular" size={16}>
          {title}
        </Heading>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    width: '100%',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray.gray20,
    borderRadius: 10,
  },
  content: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  heading: {},
});

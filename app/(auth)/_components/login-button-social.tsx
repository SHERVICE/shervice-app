import Heading from '@/app/_components/Heading';
import { Colors } from '@/constants/Colors';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';

import AppleIcon from '@/assets/icons/button/apple.svg';
import Google from '@/assets/icons/button/google.svg';

enum Social {
  APPLE = 'Apple',
  GOOGLE = 'Google',
}

interface ButtonSocialProps extends TouchableHighlightProps {
  type: keyof typeof Social;
}

export default function LoginButtonSocial({
  type,
  ...rest
}: ButtonSocialProps) {
  const social = Social[type];
  return (
    <TouchableHighlight
      style={styles.button}
      {...rest}
      underlayColor="transparent"
    >
      <View style={styles.content}>
        {social === Social.GOOGLE && <Google width={20} height={20} />}
        {social === Social.APPLE && <AppleIcon width={20} height={20} />}
        <Heading fontFamily="PoppinsRegular" color={Colors.black} size={16}>
          Entrar com {social}
        </Heading>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    width: '100%',
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

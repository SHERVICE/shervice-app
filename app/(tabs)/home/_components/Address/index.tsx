import Heading from '@/app/_components/Heading';
import ArrowDown from '@/assets/icons/home/arrow-down.svg';
import { UserResponse } from '@/store/session/useSignup';
import { useAuthTokens } from '@/utils/getToken';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';

export default function AddressView() {
  const { accessToken } = useAuthTokens();
  const [account] = useMMKVObject<UserResponse>('account');

  return (
    <Flex vertical gap={5}>
      <Heading size={12} fontFamily="PoppinsLight">
        {accessToken ? 'Meu endereço' : 'Bem-vindo'}
      </Heading>
      <Flex gap={5} pr={5}>
        <Flex>
          <Heading size={14} fontFamily="PoppinsLight" numberOfLines={1}>
            {accessToken
              ? `${account?.address.city} - ${account?.address.street}`
              : 'Crie sua conta para começar'}
          </Heading>
        </Flex>
        <ArrowDown />
      </Flex>
    </Flex>
  );
}

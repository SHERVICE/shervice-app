import Heading from '@/app/_components/Heading';
import ArrowDown from '@/assets/icons/home/arrow-down.svg';
import { UserResponse } from '@/store/session/useSignup';
import { Flex } from 'react-native-flex';
import { useMMKVObject } from 'react-native-mmkv';

export default function AddressView() {
  const [account] = useMMKVObject<UserResponse>('account');

  return (
    <Flex vertical gap={5} className="h-[50px]">
      <Heading size={16} fontFamily="PoppinsMedium">
        {account ? `Olá, ${account.name}!` : 'Bem-vindo'}
      </Heading>
      <Flex gap={5} pr={5}>
        <Flex>
          <Heading size={14} fontFamily="PoppinsLight" numberOfLines={1}>
            {account
              ? `Como podemos te ajudar hoje?`
              : 'Crie sua conta para começar'}
          </Heading>
        </Flex>
        <Flex narrow>
          <ArrowDown />
        </Flex>
      </Flex>
    </Flex>
  );
}

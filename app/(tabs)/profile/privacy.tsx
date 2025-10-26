import Heading from '@/app/_components/Heading';
import SafeAreaContainer from '@/app/_components/SafeAreaContainer';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native';
import { Flex } from 'react-native-flex';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function PrivacyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaContainer edges={['bottom', 'top']}>
      <ScrollView style={{ marginTop: insets.top }}>
        <Flex p={[0, 20]} vertical gap={16} mb={90}>
          <Heading
            size={20}
            fontFamily="PoppinsSemiBold"
            color={Colors.primary}
          >
            Política de Privacidade
          </Heading>

          <Heading size={14} fontFamily="PoppinsRegular">
            Última atualização: 25/10/2025
          </Heading>

          <Heading size={14} fontFamily="PoppinsRegular">
            Nós respeitamos a sua privacidade e queremos que você saiba como
            suas informações são usadas no nosso app de prestação de serviços.
          </Heading>

          <Heading
            size={16}
            fontFamily="PoppinsSemiBold"
            color={Colors.primary}
          >
            1. Informações que coletamos
          </Heading>
          <Heading size={14} fontFamily="PoppinsRegular">
            - Nome, e-mail, telefone e endereço{'\n'}- Dados de login e perfil
            {'\n'}- Localização quando você utiliza recursos que precisam disso
            {'\n'}- Como você usa o app (buscas, categorias acessadas, tempo de
            uso)
          </Heading>

          <Heading
            size={16}
            fontFamily="PoppinsSemiBold"
            color={Colors.primary}
          >
            2. Como usamos suas informações
          </Heading>
          <Heading size={14} fontFamily="PoppinsRegular">
            - Criar e gerenciar sua conta{'\n'}- Conectar clientes e prestadores
            de serviços{'\n'}- Melhorar o app e personalizar sua experiência
            {'\n'}- Enviar avisos importantes ou notificações{'\n'}- Cumprir
            regras legais
          </Heading>

          <Heading
            size={16}
            fontFamily="PoppinsSemiBold"
            color={Colors.primary}
          >
            3. Compartilhamento
          </Heading>
          <Heading size={14} fontFamily="PoppinsRegular">
            - Seus dados não são vendidos{'\n'}- Podemos compartilhar com
            prestadores ou fornecedores do app{'\n'}- Podemos divulgar se
            exigido por lei ou autoridades
          </Heading>

          <Heading
            size={16}
            fontFamily="PoppinsSemiBold"
            color={Colors.primary}
          >
            4. Segurança
          </Heading>
          <Heading size={14} fontFamily="PoppinsRegular">
            - Usamos medidas de segurança para proteger seus dados{'\n'}- Nenhum
            sistema é 100% seguro, mas fazemos o possível para proteger suas
            informações
          </Heading>

          <Heading
            size={16}
            fontFamily="PoppinsSemiBold"
            color={Colors.primary}
          >
            5. Seus direitos
          </Heading>
          <Heading size={14} fontFamily="PoppinsRegular">
            - Acessar e corrigir seus dados{'\n'}- Solicitar exclusão da conta e
            informações{'\n'}- Optar por não receber notificações promocionais
            {'\n'}- Contato: seu-email@dominio.com
          </Heading>

          <Heading
            size={16}
            fontFamily="PoppinsSemiBold"
            color={Colors.primary}
          >
            6. Alterações
          </Heading>
          <Heading size={14} fontFamily="PoppinsRegular">
            Podemos atualizar esta política de tempos em tempos. Verifique a
            data da última atualização para a versão mais recente.
          </Heading>
        </Flex>
      </ScrollView>
    </SafeAreaContainer>
  );
}

export default PrivacyScreen;

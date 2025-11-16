// app/index.tsx
import { Colors } from '@/constants/Colors';
import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function IndexPage() {
  return (
    <View style={styles.container}>
      {/* Loading temporário */}
      <ActivityIndicator size="large" color={Colors.primary} />

      {/* Redirecionamento imediato */}
      <Redirect href="/(tabs)/home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

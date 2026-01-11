import Heading from '@/app/_components/Heading';
import { useTheme } from '@/context/theme-provider';
import { BlurView } from 'expo-blur';
import { StyleSheet, Text, View } from 'react-native';

export default function TopStats() {
  const { isDark } = useTheme();

  const overlayColor = isDark
    ? 'rgba(0,0,0,0.35)' // overlay mais escuro no dark
    : 'rgba(255,255,255,0.35)'; // overlay mais claro no light

  return (
    <BlurView
      intensity={20}
      style={styles.blurContainer}
      tint={isDark ? 'dark' : 'light'}
    >
      <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
      <View style={styles.row}>
        <View style={styles.item}>
          <Heading>3 anos</Heading>
          <Text style={styles.label}>Experiência</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.item}>
          <Heading>248+</Heading>
          <Text style={styles.label}>Serviços</Text>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: -30, // opcional se for sobrepor um banner
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  label: {
    marginTop: 4,
    fontSize: 13,
    color: '#555',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginHorizontal: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

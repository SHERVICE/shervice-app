import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Signup() {
  return (
    <View className="flex-1 bg-red-300 justify-center items-center">
      <Link href="/(auth)/signin">Para signin</Link>
    </View>
  );
}

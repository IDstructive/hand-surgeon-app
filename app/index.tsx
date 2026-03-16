import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { WoundCard } from '@/components/wound-card';

import { Wounds } from '@/data/Wounds';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-3xl font-light text-green-400 text-center mt-5 mb-6">
        Wound analyzer
      </Text>

      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-24 gap-3">
      </ScrollView>

      <View className="absolute bottom-10 left-0 right-0 items-center">
      </View>
    </SafeAreaView>
  );
}

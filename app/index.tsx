import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hand, CircleCheck, CircleX, CircleHelp } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { WoundCard } from '@/components/wound-card';

import { Wounds } from '@/data/Wounds';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-3xl font-light text-green-400 text-center mt-5 mb-6">
        Wound analyzer
      </Text>

      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-24 gap-3">
        <WoundCard wound={Wounds[0]} />
      </ScrollView>

      <View className="absolute bottom-10 left-0 right-0 items-center">
        <TouchableOpacity
          className="flex-row items-center bg-green-200 px-6 py-4 rounded-full gap-2"
          activeOpacity={0.8}
        >
          <Text className="text-xl">✊</Text>
          <Text className="text-lg font-semibold text-gray-800">Analyze a wound</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

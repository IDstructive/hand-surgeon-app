import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hand, CircleCheck, CircleX, CircleHelp } from 'lucide-react-native';
import { Button } from '@/components/ui/button';

import { Wound, Recommendation } from '@/data/wound';

const mockWounds: Partial<Wound>[] = [
  {
    id: '1',
    conclusion: 'Ring finger cut on the back',
    patientSeen: new Date(),
    gender: 'male',
    birthDate: new Date(1984, 0, 1),
    hand: 'right',
    recommendation: 'fixInER',
  },
  {
    id: '2',
    conclusion: 'Palm 3rd degree burn',
    patientSeen: new Date(),
    gender: 'male',
    birthDate: new Date(1984, 0, 1),
    hand: 'right',
    recommendation: 'fixInSpecializedHospital',
  },
  {
    id: '3',
    conclusion: 'Thumb cut',
    patientSeen: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    gender: 'male',
    birthDate: new Date(2024, 0, 1),
    hand: 'left',
    recommendation: 'notSure',
  },
];

function getAge(birthDate: Date | undefined): number | undefined {
  if (!birthDate) return undefined;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function formatDate(date: Date | undefined): string {
  if (!date) return '';
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Today, at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: undefined, hour12: true }).toLowerCase()}`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 14) {
    return '1 week ago';
  } else {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  }
}

function getRecommendationInfo(recommendation: Recommendation | undefined) {
  switch (recommendation) {
    case 'fixInER':
      return {
        label: 'Can be fixed in ER',
        icon: CircleCheck,
        color: '#22c55e',
        textClass: 'text-green-500',
      };
    case 'fixInSpecializedHospital':
      return {
        label: 'Needs specialized hospital',
        icon: CircleX,
        color: '#ef4444',
        textClass: 'text-red-500',
      };
    case 'notSure':
    default:
      return {
        label: "Can't tell",
        icon: CircleHelp,
        color: '#eab308',
        textClass: 'text-yellow-500',
      };
  }
}

interface WoundCardProps {
  wound: Partial<Wound>;
}

function WoundCard({ wound }: WoundCardProps) {
  const age = getAge(wound.birthDate);
  const dateStr = formatDate(wound.patientSeen);
  const recInfo = getRecommendationInfo(wound.recommendation);
  const RecIcon = recInfo.icon;

  return (
    <View className="flex-row bg-gray-100 rounded-xl p-3 items-center">
      <View className="w-20 h-20 bg-gray-300 rounded-lg justify-center items-center">
        <Hand size={40} color="#9ca3af" />
      </View>
      <View className="flex-1 ml-3 mr-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-white flex-1" numberOfLines={1}>
            {wound.conclusion}
          </Text>
          {wound.recommendation === 'notSure' && (
            <Text className="text-xs text-gray-400 ml-2">Can't tell</Text>
          )}
        </View>
        <Text className="text-sm text-gray-400 mt-0.5">{dateStr}</Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-sm text-gray-400">
            {wound.gender === 'male' ? '♂' : '♀'} {age}yo {'  '}
            {wound.hand === 'right' ? 'Right' : 'Left'} hand
          </Text>
        </View>
        {wound.recommendation !== 'notSure' && (
          <Text className={`text-sm mt-1 ${recInfo.textClass}`}>{recInfo.label}</Text>
        )}
      </View>
      <View className="ml-auto">
        <RecIcon size={32} color={recInfo.color} fill={recInfo.color} strokeWidth={0} />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#151718]">
      <Text className="text-3xl font-light text-green-400 text-center mt-5 mb-6">
        Wound analyzer
      </Text>

      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-24 gap-3">
        {mockWounds.map((wound) => (
          <WoundCard key={wound.id} wound={wound} />
        ))}
        <Button>
          <Text>Analyze a wound</Text>
        </Button>
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

import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hand, CircleCheck, CircleX, CircleHelp } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
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
      };
    case 'fixInSpecializedHospital':
      return {
        label: 'Needs specialized hospital',
        icon: CircleX,
        color: '#ef4444',
      };
    case 'notSure':
    default:
      return {
        label: "Can't tell",
        icon: CircleHelp,
        color: '#eab308',
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
    <View style={styles.card}>
      <View style={styles.cardImageContainer}>
        <Hand size={40} color="#9ca3af" />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.cardTitle} numberOfLines={1}>
            {wound.conclusion}
          </ThemedText>
          {wound.recommendation === 'notSure' && (
            <ThemedText style={styles.cantTellLabel}>Can't tell</ThemedText>
          )}
        </View>
        <ThemedText style={styles.cardDate}>{dateStr}</ThemedText>
        <View style={styles.cardMeta}>
          <ThemedText style={styles.cardMetaText}>
            {wound.gender === 'male' ? '♂' : '♀'} {age}yo {'  '}
            {wound.hand === 'right' ? 'Right' : 'Left'} hand
          </ThemedText>
        </View>
        {wound.recommendation !== 'notSure' && (
          <ThemedText style={[styles.recommendationLabel, { color: recInfo.color }]}>
            {recInfo.label}
          </ThemedText>
        )}
      </View>
      <View style={styles.cardIcon}>
        <RecIcon size={32} color={recInfo.color} fill={recInfo.color} strokeWidth={0} />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>Wound analyzer</ThemedText>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {mockWounds.map((wound) => (
          <WoundCard key={wound.id} wound={wound} />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.analyzeButton} activeOpacity={0.8}>
          <ThemedText style={styles.buttonIcon}>✊</ThemedText>
          <ThemedText style={styles.buttonText}>Analyze a wound</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.rounded,
    fontWeight: '300',
    color: '#4ade80',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  cardImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#d1d5db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  cantTellLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 8,
  },
  cardDate: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardMetaText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  recommendationLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  cardIcon: {
    marginLeft: 'auto',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bbf7d0',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 32,
    gap: 8,
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
});

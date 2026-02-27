export type Gender = 'male' | 'female';
export type Hand = 'right' | 'left';
export type ImpactLevel = 'noImpact' | 'smallImpact' | 'bigImpact';
export type Recommendation = 'fixInER' | 'notSure' | 'fixInSpecializedHospital';

export interface ContextOfInjury {
  cut: boolean;
  crush: boolean;
  burn: boolean;
  bite: boolean;
  puncture: boolean;
  abrasion: boolean;
}

export interface MedicalCondition {
  diabetes: boolean;
  hypertension: boolean;
  bloodThinner: boolean;
  immunocompromised: boolean;
  smoking: boolean;
}

export interface BoneImpact {
  thumb: ImpactLevel;
  indexFinger: ImpactLevel;
  middleFinger: ImpactLevel;
  ringFinger: ImpactLevel;
  pinkyFinger: ImpactLevel;
  metacarpals: ImpactLevel;
  carpals: ImpactLevel;
}

export interface Impact {
  bones: Partial<BoneImpact>;
}

export interface Wound {
  id: string;
  pictures: string[];
  gender: Gender | undefined;
  birthDate: Date | undefined;
  hand: Hand | undefined;
  patientSeen: Date | undefined;
  woundHappened: Date | undefined;
  contextOfInjury: Partial<ContextOfInjury>;
  medicalCondition: Partial<MedicalCondition>;
  additionalInfo: string;
  impact: Impact;
  conclusion: string;
  recommendation: Recommendation | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export const createEmptyWound = (): Wound => ({
  id: crypto.randomUUID(),
  pictures: [],
  gender: undefined,
  birthDate: undefined,
  hand: undefined,
  patientSeen: undefined,
  woundHappened: undefined,
  contextOfInjury: {},
  medicalCondition: {},
  additionalInfo: '',
  impact: {
    bones: {},
  },
  conclusion: '',
  recommendation: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
});

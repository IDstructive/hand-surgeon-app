import { Wound } from './wound';


export const Wounds: Wound[] = [
    {
        id: '1',
        pictures: [],
        woundHappened: new Date(),
        contextOfInjury: {
            cut: true,
            crush: false,
            burn: false,
            bite: false,
            puncture: false,
            abrasion: false,
        },
        medicalCondition: {
            diabetes: false,
            hypertension: false,
            bloodThinner: false,
            immunocompromised: false,
            smoking: false,
        },
        additionalInfo: '',
        impact: {
            bones: {
                thumb: 'noImpact',
                indexFinger: 'noImpact',
                middleFinger: 'noImpact',
                ringFinger: 'noImpact',
                pinkyFinger: 'noImpact',
                metacarpals: 'noImpact',
                carpals: 'noImpact',
            },
        },
        conclusion: 'Ring finger cut on the back',
        patientSeen: new Date(),
        gender: 'male',
        birthDate: new Date(1984, 0, 1),
        hand: 'right',
        shortDescription: 'Ring finger cut on the back',
        recommendation: 'fixInER',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
];
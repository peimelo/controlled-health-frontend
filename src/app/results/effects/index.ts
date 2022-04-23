import { AllExamsEffects } from './all-exams.effects';
import { ExamsResultsEffects } from './exams-results.effects';
import { ResultsEffects } from './results.effects';

export const effects: any[] = [
  AllExamsEffects,
  ExamsResultsEffects,
  ResultsEffects,
];

export * from './all-exams.effects';
export * from './exams-results.effects';
export * from './results.effects';

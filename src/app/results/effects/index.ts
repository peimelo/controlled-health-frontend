import { ExamsResultsEffects } from './exams-results.effects';
import { ExamsEffects } from './exams.effects';
import { ResultsEffects } from './results.effects';

export const effects: any[] = [
  ExamsEffects,
  ExamsResultsEffects,
  ResultsEffects,
];

export * from './exams-results.effects';
export * from './exams.effects';
export * from './results.effects';

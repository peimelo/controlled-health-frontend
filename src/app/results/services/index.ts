import { ExamsResultsFacadeService } from './exams-results-facade.service';
import { ExamsResultsService } from './exams-results.service';
import { ResultsFacadeService } from './results-facade.service';
import { ResultsService } from './results.service';

export const services: any[] = [
  ExamsResultsFacadeService,
  ExamsResultsService,
  ResultsFacadeService,
  ResultsService,
];

export * from './exams-results-facade.service';
export * from './exams-results.service';
export * from './results-facade.service';
export * from './results.service';

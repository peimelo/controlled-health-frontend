import { AllExamsFacadeService } from './all-exams-facade.service';
import { ExamGraphicsService } from './exam-graphics.service';
import { ExamsResultsFacadeService } from './exams-results-facade.service';
import { ExamsResultsService } from './exams-results.service';
import { ResultsFacadeService } from './results-facade.service';
import { ResultsService } from './results.service';

export const services: any[] = [
  AllExamsFacadeService,
  ExamGraphicsService,
  ExamsResultsFacadeService,
  ExamsResultsService,
  ResultsFacadeService,
  ResultsService,
];

export * from './all-exams-facade.service';
export * from './exam-graphics.service';
export * from './exams-results-facade.service';
export * from './exams-results.service';
export * from './results-facade.service';
export * from './results.service';

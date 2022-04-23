import { ExamGraphicsService } from './exam-graphics.service';
import { ExamsFacadeService } from './exams-facade.service';
import { ExamsResultsFacadeService } from './exams-results-facade.service';
import { ExamsResultsService } from './exams-results.service';
import { ResultsFacadeService } from './results-facade.service';
import { ResultsService } from './results.service';

export const services: any[] = [
  ExamGraphicsService,
  ExamsFacadeService,
  ExamsResultsFacadeService,
  ExamsResultsService,
  ResultsFacadeService,
  ResultsService,
];

export * from './exam-graphics.service';
export * from './exams-facade.service';
export * from './exams-results-facade.service';
export * from './exams-results.service';
export * from './results-facade.service';
export * from './results.service';

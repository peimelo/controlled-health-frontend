import { Exam } from './exam.model';

export interface ExamResult {
  id: number;
  value: number;
  exam: Exam;
}

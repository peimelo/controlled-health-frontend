import { Exam } from '../../core/models';

export interface ExamResult {
  id: number;
  value: number;
  exam: Exam;
}

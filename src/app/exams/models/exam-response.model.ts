import { Exam, Pagination } from '../../core/models';

export interface ExamResponse {
  meta: Pagination;
  exams: Exam[];
}
